import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant, LovelaceCard, LovelaceCardConfig, LovelaceCardEditor } from 'custom-card-helpers';
import { GrowBoxCardConfig, PlantConfig, VentConfig, VPDConfig } from './types';



@customElement('ha-grow-box-card')
export class HaGrowBoxCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private config!: GrowBoxCardConfig;
  @state() private plantInfoCache: Map<string, any> = new Map();
  @state() private plantDataCache: Map<string, any> = new Map();
  @state() private sliderValues: Map<string, number> = new Map();

  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    await import('./editor');
    return document.createElement('ha-grow-box-card-editor');
  }

  public static getStubConfig(): GrowBoxCardConfig {
    return {
      type: 'custom:ha-grow-box-card',
      name: 'Grow Box',
      vpd_calculation: {
        enabled: true
      },
      plants: [
        { 
          entity: 'plant.my_plant',
          show_bars: ['moisture', 'illuminance', 'temperature', 'conductivity']
        }
      ]
    };
  }

  public setConfig(config: GrowBoxCardConfig): void {
    if (!config) {
      throw new Error('Invalid configuration');
    }
    this.config = config;
    // Clear caches when config changes
    this.plantInfoCache.clear();
    this.plantDataCache.clear();
  }

  protected async updated(changedProperties: Map<string | number | symbol, unknown>): Promise<void> {
    super.updated(changedProperties);
    
    if (changedProperties.has('hass') || changedProperties.has('config')) {
      await this.preloadPlantData();
    }
  }

  private async preloadPlantData(): Promise<void> {
    if (!this.config?.plants || !this.hass) return;

    for (const plant of this.config.plants) {
      if (plant.entity && !this.plantDataCache.has(plant.entity)) {
        const plantEntity = this.hass.states[plant.entity];
        if (plantEntity) {
          try {
            const healthData = await this.calculatePlantHealth(plantEntity, plant);
            
            // Load all possible sensor types (not just show_bars) for health calculation
            const allSensorTypes = ['moisture', 'illuminance', 'temperature', 'conductivity', 'humidity', 'dli'];
            const plantData: any = {
              health: healthData.health,
              status: healthData.status,
              healthColor: healthData.color
            };

            // Load sensor data for all types
            for (const sensorType of allSensorTypes) {
              plantData[sensorType] = await this.getPlantSensorValue(plantEntity, sensorType, plant);
            }
            
            this.plantDataCache.set(plant.entity, plantData);
            this.requestUpdate(); // Trigger re-render with new data
          } catch (error) {
            console.error(`Error preloading data for plant ${plant.entity}:`, error);
          }
        }
      }
    }
  }

  public getCardSize(): number {
    return 8;
  }

  private calculateVPD(): { vpd: number; phase: string; color: string } {
    if (!this.config.inner_temp_entity || !this.config.inner_humidity_entity || !this.config.leaf_temp_entity) {
      return { vpd: 0, phase: 'Unknown', color: '#666' };
    }

    const tempState = this.hass.states[this.config.inner_temp_entity];
    const humidityState = this.hass.states[this.config.inner_humidity_entity];
    const leafTempState = this.hass.states[this.config.leaf_temp_entity];

    if (!tempState || !humidityState || !leafTempState) {
      return { vpd: 0, phase: 'Unknown', color: '#666' };
    }

    const temp = parseFloat(tempState.state);
    const humidity = parseFloat(humidityState.state);
    const leafTemp = parseFloat(leafTempState.state);

    // VPD calculation
    const satVaporPressure = 610.7 * Math.exp(17.27 * temp / (temp + 237.3)) / 1000;
    const actualVaporPressure = satVaporPressure * (humidity / 100);
    const leafSatVaporPressure = 610.7 * Math.exp(17.27 * leafTemp / (leafTemp + 237.3)) / 1000;
    const vpd = leafSatVaporPressure - actualVaporPressure;

    // Determine growth phase based on VPD
    let phase = 'Unknown';
    let color = '#666';

    if (vpd < 0.4) {
      phase = 'Too Low';
      color = '#f44336';
    } else if (vpd <= 0.8) {
      phase = 'Seedling';
      color = '#4caf50';
    } else if (vpd <= 1.0) {
      phase = 'Vegetative';
      color = '#2196f3';
    } else if (vpd <= 1.3) {
      phase = 'Flowering';
      color = '#9c27b0';
    } else {
      phase = 'Too High';
      color = '#f44336';
    }

    return { vpd, phase, color };
  }

  private renderStatusIndicator(entityId?: string): TemplateResult {
    if (!entityId || !this.hass) {
      return html`<span class="status-indicator unknown">?</span>`;
    }

    const state = this.hass.states[entityId];
    if (!state) {
      return html`<span class="status-indicator unknown">?</span>`;
    }

    const isOn = state.state === 'on' || state.state === 'heat' || state.state === 'cool' || parseFloat(state.state) > 0;
    const className = isOn ? 'on' : 'off';
    const icon = isOn ? '●' : '○';

    return html`<span class="status-indicator ${className}">${icon}</span>`;
  }

  private getLightBrightness(): string {
    if (!this.config.light_entity || !this.hass) {
      return 'N/A';
    }
    
    const state = this.hass.states[this.config.light_entity];
    if (!state) return 'N/A';
    
    if (state.state === 'off') return '0%';
    
    const brightness = state.attributes?.brightness;
    if (brightness !== undefined) {
      return `${Math.round((brightness / 255) * 100)}%`;
    }
    
    return state.state === 'on' ? '100%' : '0%';
  }

  private getFanSpeed(entityId: string): string {
    if (!this.hass) return 'N/A';
    
    const state = this.hass.states[entityId];
    if (!state) return 'N/A';
    
    if (state.state === 'off') return '0%';
    
    const percentage = state.attributes?.percentage;
    if (percentage !== undefined) {
      return `${Math.round(percentage)}%`;
    }
    
    const speed = state.attributes?.speed || state.attributes?.preset_mode;
    if (speed) {
      // Convert named speeds to percentages
      const speedMap: { [key: string]: number } = {
        'low': 33,
        'medium': 66,
        'high': 100,
        'off': 0
      };
      return `${speedMap[speed.toLowerCase()] || 50}%`;
    }
    
    return state.state === 'on' ? '100%' : '0%';
  }


  private getDeviceStatus(entityId: string): string {
    if (!this.hass) return 'N/A';
    
    const state = this.hass.states[entityId];
    if (!state) return 'N/A';
    
    const stateValue = state.state.toLowerCase();
    if (stateValue === 'on' || stateValue === 'heat' || stateValue === 'cool') {
      return 'AN';
    } else if (stateValue === 'off') {
      return 'AUS';
    } else if (parseFloat(state.state) > 0) {
      return 'AN';
    }
    
    return 'AUS';
  }

  private findPotentialSensorEntities(plantEntityId: string): void {
    if (!this.hass) return;
    
    console.log(`\n=== Looking for sensor entities related to ${plantEntityId} ===`);
    
    // Get plant name/species for matching
    const plantEntity = this.hass.states[plantEntityId];
    const species = plantEntity?.attributes?.species?.toLowerCase() || '';
    const plantName = plantEntityId.replace('plant.', '').toLowerCase();
    
    // Search for related sensors
    const relatedSensors = Object.keys(this.hass.states).filter(entityId => {
      if (!entityId.startsWith('sensor.')) return false;
      
      const entity = this.hass.states[entityId];
      const entityLower = entityId.toLowerCase();
      const friendlyName = entity.attributes?.friendly_name?.toLowerCase() || '';
      
      // Check if sensor might be related to this plant
      return (
        entityLower.includes(plantName) ||
        entityLower.includes('purple') ||
        entityLower.includes('lemonade') ||
        entityLower.includes('cannabis') ||
        friendlyName.includes(plantName) ||
        friendlyName.includes('purple') ||
        friendlyName.includes('lemonade') ||
        // Common plant sensor types
        (entityLower.includes('moisture') || entityLower.includes('humidity')) ||
        (entityLower.includes('conductivity') || entityLower.includes('ec')) ||
        (entityLower.includes('light') || entityLower.includes('illuminance')) ||
        (entityLower.includes('temperature') && !entityLower.includes('cpu'))
      );
    });
    
    console.log('Potential related sensor entities:');
    relatedSensors.forEach(sensorId => {
      const sensor = this.hass.states[sensorId];
      console.log(`  ${sensorId}: ${sensor.state} ${sensor.attributes?.unit_of_measurement || ''} (${sensor.attributes?.friendly_name || 'No friendly name'})`);
    });
    
    if (relatedSensors.length > 0) {
      console.log('\n💡 To use these sensors with your plant, add this to your configuration.yaml:');
      console.log(`plant:\n  ${plantEntityId.replace('plant.', '')}:`);
      console.log('    sensors:');
      
      relatedSensors.forEach(sensorId => {
        const entityLower = sensorId.toLowerCase();
        const friendlyName = this.hass.states[sensorId].attributes?.friendly_name?.toLowerCase() || '';
        
        if (entityLower.includes('moisture') || entityLower.includes('humidity')) {
          console.log(`      moisture: ${sensorId}`);
        } else if (entityLower.includes('conductivity') || entityLower.includes('ec')) {
          console.log(`      conductivity: ${sensorId}`);
        } else if (entityLower.includes('light') || entityLower.includes('illuminance')) {
          console.log(`      illuminance: ${sensorId}`);
        } else if (entityLower.includes('temperature')) {
          console.log(`      temperature: ${sensorId}`);
        }
      });
      
      console.log('    min_moisture: 15');
      console.log('    max_moisture: 60');
      console.log('    # Add other min/max values as needed');
    } else {
      console.log('❌ No related sensor entities found. You may need to:');
      console.log('  1. Set up plant sensors (MiFlora, ESPHome, etc.)');
      console.log('  2. Check if sensors have different naming patterns');
    }
    
    console.log('===============================================\n');
  }

  private async getPlantInfo(entityId: string): Promise<any> {
    if (this.plantInfoCache.has(entityId)) {
      return this.plantInfoCache.get(entityId);
    }

    try {
      const plantInfo = await this.hass.callWS({
        type: "plant/get_info",
        entity_id: entityId,
      });
      
      console.log(`🌱 Plant info for ${entityId}:`, plantInfo);
      this.plantInfoCache.set(entityId, plantInfo);
      return plantInfo;
    } catch (err) {
      console.error(`Failed to get plant info for ${entityId}:`, err);
      this.plantInfoCache.set(entityId, { result: {} });
      return { result: {} };
    }
  }

  private async getPlantSensorValue(plantEntity: any, sensorType: string, plantConfig?: any): Promise<string> {
    if (!plantEntity || !plantEntity.attributes) return 'N/A';
    
    // PRIORITY 1: Check for individual sensor entities in config (like lovelace flower card)
    if (plantConfig) {
      const sensorKey = `${sensorType}_sensor`;
      const individualSensorId = plantConfig[sensorKey];
      if (individualSensorId && this.hass.states[individualSensorId]) {
        console.log(`Using individual ${sensorType} sensor: ${individualSensorId} = ${this.hass.states[individualSensorId].state}`);
        return this.hass.states[individualSensorId].state;
      }
    }
    
    // PRIORITY 2: Try to get plant info with sensor entity references
    const plantInfo = await this.getPlantInfo(plantEntity.entity_id);
    if (plantInfo?.result?.sensors) {
      const sensorEntityId = plantInfo.result.sensors[sensorType];
      if (sensorEntityId && this.hass.states[sensorEntityId]) {
        console.log(`Found ${sensorType} sensor: ${sensorEntityId} = ${this.hass.states[sensorEntityId].state}`);
        return this.hass.states[sensorEntityId].state;
      }
    }
    
    // Check for direct sensor entity references in plant attributes (fallback)
    const sensorEntityId = plantEntity.attributes.sensors?.[sensorType];
    if (sensorEntityId && this.hass.states[sensorEntityId]) {
      return this.hass.states[sensorEntityId].state;
    }
    
    // Check for direct attribute values (common in Home Assistant plant entities)
    const directValue = plantEntity.attributes[sensorType];
    if (directValue !== undefined && directValue !== null) {
      return directValue.toString();
    }
    
    // Check for sensor data in different attribute names
    const alternativeNames: { [key: string]: string[] } = {
      'moisture': ['soil_moisture', 'moisture_level', 'moisture'],
      'illuminance': ['light_intensity', 'light', 'brightness', 'illuminance'],
      'temperature': ['temp', 'temperature'],
      'conductivity': ['electrical_conductivity', 'ec', 'conductivity', 'fertility'],
      'humidity': ['humidity', 'relative_humidity', 'rh'],
      'dli': ['dli', 'daily_light_integral', 'light_integral']
    };
    
    const alternatives = alternativeNames[sensorType] || [];
    for (const altName of alternatives) {
      const altValue = plantEntity.attributes[altName];
      if (altValue !== undefined && altValue !== null) {
        return altValue.toString();
      }
    }
    
    // Check if this plant has sensor entities defined but we need to fetch their values
    // Look for sensor IDs in plant attributes like sensor.moisture_sensor_id
    const possibleSensorKeys = Object.keys(plantEntity.attributes).filter(key => 
      key.includes(sensorType) || 
      key.includes('sensor') ||
      (sensorType === 'illuminance' && (key.includes('light') || key.includes('brightness'))) ||
      (sensorType === 'conductivity' && (key.includes('ec') || key.includes('fertility')))
    );
    
    for (const key of possibleSensorKeys) {
      const sensorId = plantEntity.attributes[key];
      if (typeof sensorId === 'string' && sensorId.startsWith('sensor.') && this.hass.states[sensorId]) {
        console.log(`Found sensor ${sensorId} for ${sensorType} via key ${key}`);
        return this.hass.states[sensorId].state;
      }
    }
    
    // If plant has status but no values, show the status
    const statusKey = `${sensorType}_status`;
    const status = plantEntity.attributes[statusKey];
    if (status) {
      console.log(`Using status for ${sensorType}: ${status}`);
      return status === 'ok' ? 'OK' : status;
    }
    
    console.log(`No data found for ${sensorType} in plant ${plantEntity.entity_id}`);
    return 'N/A';
  }

  private getPlantSensorValueSync(plantEntity: any, sensorType: string, plantConfig?: any): string {
    if (!plantEntity || !plantEntity.attributes) return 'N/A';
    
    // PRIORITY 1: Check for individual sensor entities in config (like lovelace flower card)
    if (plantConfig) {
      const sensorKey = `${sensorType}_sensor`;
      const individualSensorId = plantConfig[sensorKey];
      if (individualSensorId && this.hass.states[individualSensorId]) {
        console.log(`Using individual ${sensorType} sensor: ${individualSensorId} = ${this.hass.states[individualSensorId].state}`);
        return this.hass.states[individualSensorId].state;
      }
    }
    
    // PRIORITY 2: Check for direct sensor entity references in plant attributes
    const sensorEntityId = plantEntity.attributes.sensors?.[sensorType];
    if (sensorEntityId && this.hass.states[sensorEntityId]) {
      return this.hass.states[sensorEntityId].state;
    }
    
    // Check for direct attribute values (common in Home Assistant plant entities)
    const directValue = plantEntity.attributes[sensorType];
    if (directValue !== undefined && directValue !== null) {
      return directValue.toString();
    }
    
    // Check for sensor data in different attribute names
    const alternativeNames: { [key: string]: string[] } = {
      'moisture': ['soil_moisture', 'moisture_level', 'moisture'],
      'illuminance': ['light_intensity', 'light', 'brightness', 'illuminance'],
      'temperature': ['temp', 'temperature'],
      'conductivity': ['electrical_conductivity', 'ec', 'conductivity', 'fertility'],
      'humidity': ['humidity', 'relative_humidity', 'rh'],
      'dli': ['dli', 'daily_light_integral', 'light_integral']
    };
    
    const alternatives = alternativeNames[sensorType] || [];
    for (const altName of alternatives) {
      const altValue = plantEntity.attributes[altName];
      if (altValue !== undefined && altValue !== null) {
        return altValue.toString();
      }
    }
    
    // If plant has status but no values, show the status
    const statusKey = `${sensorType}_status`;
    const status = plantEntity.attributes[statusKey];
    if (status) {
      return status === 'ok' ? 'OK' : status;
    }
    
    return 'N/A';
  }

  private async calculatePlantHealth(plantEntity: any, plantConfig?: any): Promise<{ health: number; status: string; color: string }> {
    if (!plantEntity) {
      return { health: 0, status: 'Unbekannt', color: '#666' };
    }

    const state = plantEntity.state;
    
    // Check overall plant state first
    if (state === 'problem') {
      return { health: 30, status: 'Problem', color: '#f44336' };
    } else if (state === 'ok') {
      return { health: 85, status: 'Gesund', color: '#4caf50' };
    }

    // Calculate health based on individual sensor readings
    let healthScore = 100;
    let problemCount = 0;
    
    const sensors = ['moisture', 'conductivity', 'illuminance', 'temperature'];
    for (const sensor of sensors) {
      const valueStr = await this.getPlantSensorValue(plantEntity, sensor, plantConfig);
      const value = parseFloat(valueStr);
      const min = plantEntity.attributes[`min_${sensor}`];
      const max = plantEntity.attributes[`max_${sensor}`];
      
      if (!isNaN(value) && min !== undefined && max !== undefined) {
        if (value < min || value > max) {
          problemCount++;
          healthScore -= 20;
        }
      }
    }

    // Determine status and color based on health score
    if (healthScore >= 80) {
      return { health: healthScore, status: 'Gesund', color: '#4caf50' };
    } else if (healthScore >= 60) {
      return { health: healthScore, status: 'Gut', color: '#8bc34a' };
    } else if (healthScore >= 40) {
      return { health: healthScore, status: 'Achtung', color: '#ff9800' };
    } else {
      return { health: healthScore, status: 'Problem', color: '#f44336' };
    }
  }


  private handleControlClick(entityId: string): void {
    if (!this.hass || !entityId) return;

    const entity = this.hass.states[entityId];
    if (!entity) return;

    // Determine service based on entity domain
    const domain = entityId.split('.')[0];
    const isOn = entity.state === 'on' || entity.state === 'heat' || entity.state === 'cool' || parseFloat(entity.state) > 0;
    
    let service: string;
    let serviceData: any = { entity_id: entityId };

    switch (domain) {
      case 'light':
        service = isOn ? 'light.turn_off' : 'light.turn_on';
        break;
      case 'switch':
        service = isOn ? 'switch.turn_off' : 'switch.turn_on';
        break;
      case 'fan':
        service = isOn ? 'fan.turn_off' : 'fan.turn_on';
        break;
      case 'climate':
        // For climate entities, toggle between off and heat/cool
        if (entity.state === 'off') {
          service = 'climate.set_hvac_mode';
          serviceData.hvac_mode = 'heat'; // Default to heat mode
        } else {
          service = 'climate.set_hvac_mode';
          serviceData.hvac_mode = 'off';
        }
        break;
      case 'cover':
        // For covers/vents, toggle open/close
        service = entity.state === 'open' ? 'cover.close_cover' : 'cover.open_cover';
        break;
      default:
        // Generic toggle for other entities
        service = `${domain}.toggle`;
        break;
    }

    console.log(`Calling service: ${service} with data:`, serviceData);
    
    this.hass.callService(service.split('.')[0], service.split('.')[1], serviceData).catch(error => {
      console.error('Error calling service:', error);
    });
  }

  private handleSliderInput(entityId: string, value: number): void {
    // Update local slider state immediately for smooth UI
    this.sliderValues.set(entityId, value);
    this.requestUpdate();
  }

  private handleSliderChange(entityId: string, value: number, type: 'light' | 'fan'): void {
    if (!this.hass || !entityId) return;

    // Update local state
    this.sliderValues.set(entityId, value);

    let service: string;
    let serviceData: any = { entity_id: entityId };

    if (type === 'light') {
      if (value === 0) {
        service = 'light.turn_off';
      } else {
        service = 'light.turn_on';
        serviceData.brightness_pct = value;
      }
    } else if (type === 'fan') {
      if (value === 0) {
        service = 'fan.turn_off';
      } else {
        service = 'fan.set_percentage';
        serviceData.percentage = value;
      }
    } else {
      return; // Unknown type
    }

    this.hass.callService(service.split('.')[0], service.split('.')[1], serviceData).then(() => {
      // Clear local state after successful service call to use actual entity state
      setTimeout(() => {
        this.sliderValues.delete(entityId);
        this.requestUpdate();
      }, 1000); // Wait 1 second for state to propagate
    }).catch(error => {
      console.error('Error calling service:', error);
      // Clear local state on error too
      this.sliderValues.delete(entityId);
      this.requestUpdate();
    });
  }

  private getSliderValue(entityId: string, type: 'light' | 'fan'): number {
    // Return local slider value if being actively adjusted, otherwise use entity state
    if (this.sliderValues.has(entityId)) {
      return this.sliderValues.get(entityId)!;
    }

    if (type === 'light') {
      const currentBrightness = this.getLightBrightness();
      return parseInt(currentBrightness.replace('%', '')) || 0;
    } else if (type === 'fan') {
      const currentSpeed = this.getFanSpeed(entityId);
      return parseInt(currentSpeed.replace('%', '')) || 0;
    }

    return 0;
  }


  private renderOptionalSensors() {
    const sensors = [];
    
    // Add environmental sensors only if configured
    if (this.config.inner_temp_entity) {
      const entity = this.hass.states[this.config.inner_temp_entity];
      const friendlyName = entity?.attributes?.friendly_name || this.config.inner_temp_entity;
      const icon = this.config.inner_temp_icon || 'mdi:thermometer';
      sensors.push(html`
        <div class="sensor-card">
          <div class="sensor-icon">
            ${icon.startsWith('mdi:') ? html`<ha-icon icon="${icon}"></ha-icon>` : icon}
          </div>
          <div class="sensor-info">
            <div class="sensor-label">${friendlyName}</div>
            <div class="sensor-value">
              ${entity?.state || 'N/A'}°C
            </div>
          </div>
        </div>
      `);
    }
    
    if (this.config.inner_humidity_entity) {
      const entity = this.hass.states[this.config.inner_humidity_entity];
      const friendlyName = entity?.attributes?.friendly_name || this.config.inner_humidity_entity;
      const icon = this.config.inner_humidity_icon || 'mdi:water-percent';
      sensors.push(html`
        <div class="sensor-card">
          <div class="sensor-icon">
            ${icon.startsWith('mdi:') ? html`<ha-icon icon="${icon}"></ha-icon>` : icon}
          </div>
          <div class="sensor-info">
            <div class="sensor-label">${friendlyName}</div>
            <div class="sensor-value">
              ${entity?.state || 'N/A'}%
            </div>
          </div>
        </div>
      `);
    }
    
    if (this.config.outer_temp_entity) {
      const entity = this.hass.states[this.config.outer_temp_entity];
      const friendlyName = entity?.attributes?.friendly_name || this.config.outer_temp_entity;
      const icon = this.config.outer_temp_icon || 'mdi:thermometer-minus';
      sensors.push(html`
        <div class="sensor-card">
          <div class="sensor-icon">
            ${icon.startsWith('mdi:') ? html`<ha-icon icon="${icon}"></ha-icon>` : icon}
          </div>
          <div class="sensor-info">
            <div class="sensor-label">${friendlyName}</div>
            <div class="sensor-value">
              ${entity?.state || 'N/A'}°C
            </div>
          </div>
        </div>
      `);
    }
    
    if (this.config.outer_humidity_entity) {
      const entity = this.hass.states[this.config.outer_humidity_entity];
      const friendlyName = entity?.attributes?.friendly_name || this.config.outer_humidity_entity;
      const icon = this.config.outer_humidity_icon || 'mdi:water-percent';
      sensors.push(html`
        <div class="sensor-card">
          <div class="sensor-icon">
            ${icon.startsWith('mdi:') ? html`<ha-icon icon="${icon}"></ha-icon>` : icon}
          </div>
          <div class="sensor-info">
            <div class="sensor-label">${friendlyName}</div>
            <div class="sensor-value">
              ${entity?.state || 'N/A'}%
            </div>
          </div>
        </div>
      `);
    }
    
    if (this.config.leaf_temp_entity) {
      const entity = this.hass.states[this.config.leaf_temp_entity];
      const friendlyName = entity?.attributes?.friendly_name || this.config.leaf_temp_entity;
      const icon = this.config.leaf_temp_icon || 'mdi:leaf';
      sensors.push(html`
        <div class="sensor-card">
          <div class="sensor-icon">
            ${icon.startsWith('mdi:') ? html`<ha-icon icon="${icon}"></ha-icon>` : icon}
          </div>
          <div class="sensor-info">
            <div class="sensor-label">${friendlyName}</div>
            <div class="sensor-value">
              ${entity?.state || 'N/A'}°C
            </div>
          </div>
        </div>
      `);
    }
    
    return sensors;
  }

  private renderOptionalControls() {
    const controls = [];
    
    // Add controls only if configured
    if (this.config.light_entity) {
      const entity = this.hass.states[this.config.light_entity];
      const friendlyName = entity?.attributes?.friendly_name || this.config.light_entity;
      const icon = this.config.light_icon || 'mdi:lightbulb';
      const brightnessValue = this.getSliderValue(this.config.light_entity, 'light');
      const currentBrightness = this.sliderValues.has(this.config.light_entity) 
        ? `${brightnessValue}%` 
        : this.getLightBrightness();
      
      controls.push(html`
        <div class="control-card light">
          <div class="control-icon" @click="${() => this.handleControlClick(this.config.light_entity!)}">
            ${icon.startsWith('mdi:') ? html`<ha-icon icon="${icon}"></ha-icon>` : icon}
          </div>
          <div class="control-info">
            <div class="control-label">${friendlyName}</div>
            <div class="control-value">${currentBrightness}</div>
            <div class="control-status">${this.renderStatusIndicator(this.config.light_entity)}</div>
            <div class="control-slider">
              <input 
                type="range" 
                min="0" 
                max="100" 
                value="${brightnessValue}"
                @input="${(e: Event) => {
                  const target = e.target as HTMLInputElement;
                  this.handleSliderInput(this.config.light_entity!, parseInt(target.value));
                }}"
                @change="${(e: Event) => {
                  const target = e.target as HTMLInputElement;
                  this.handleSliderChange(this.config.light_entity!, parseInt(target.value), 'light');
                }}"
                class="brightness-slider"
              />
            </div>
          </div>
        </div>
      `);
    }
    
    if (this.config.ventilation_entity) {
      const entity = this.hass.states[this.config.ventilation_entity];
      const friendlyName = entity?.attributes?.friendly_name || this.config.ventilation_entity;
      const icon = this.config.ventilation_icon || 'mdi:fan';
      const speedValue = this.getSliderValue(this.config.ventilation_entity, 'fan');
      const currentSpeed = this.sliderValues.has(this.config.ventilation_entity) 
        ? `${speedValue}%` 
        : this.getFanSpeed(this.config.ventilation_entity);
      
      controls.push(html`
        <div class="control-card ventilation">
          <div class="control-icon" @click="${() => this.handleControlClick(this.config.ventilation_entity!)}">
            ${icon.startsWith('mdi:') ? html`<ha-icon icon="${icon}"></ha-icon>` : icon}
          </div>
          <div class="control-info">
            <div class="control-label">${friendlyName}</div>
            <div class="control-value">${currentSpeed}</div>
            <div class="control-status">${this.renderStatusIndicator(this.config.ventilation_entity)}</div>
            <div class="control-slider">
              <input 
                type="range" 
                min="0" 
                max="100" 
                value="${speedValue}"
                @input="${(e: Event) => {
                  const target = e.target as HTMLInputElement;
                  this.handleSliderInput(this.config.ventilation_entity!, parseInt(target.value));
                }}"
                @change="${(e: Event) => {
                  const target = e.target as HTMLInputElement;
                  this.handleSliderChange(this.config.ventilation_entity!, parseInt(target.value), 'fan');
                }}"
                class="speed-slider"
              />
            </div>
          </div>
        </div>
      `);
    }
    
    if (this.config.heating_entity) {
      const entity = this.hass.states[this.config.heating_entity];
      const friendlyName = entity?.attributes?.friendly_name || this.config.heating_entity;
      const icon = this.config.heating_icon || 'mdi:radiator';
      controls.push(html`
        <div class="control-card heating" @click="${() => this.handleControlClick(this.config.heating_entity!)}">
          <div class="control-icon">
            ${icon.startsWith('mdi:') ? html`<ha-icon icon="${icon}"></ha-icon>` : icon}
          </div>
          <div class="control-info">
            <div class="control-label">${friendlyName}</div>
            <div class="control-value">${this.getDeviceStatus(this.config.heating_entity)}</div>
            <div class="control-status">${this.renderStatusIndicator(this.config.heating_entity)}</div>
          </div>
        </div>
      `);
    }
    
    // Add vents if configured
    if (this.config.vents && this.config.vents.length > 0) {
      this.config.vents.forEach(vent => {
        if (!vent.entity) {
          console.warn('Vent configuration missing entity:', vent);
          return;
        }
        
        const entity = this.hass.states[vent.entity];
        const friendlyName = entity?.attributes?.friendly_name || vent.name || vent.entity;
        const icon = vent.icon || 'mdi:air-filter';
        const domain = vent.entity.split('.')[0];
        
        if (domain === 'fan') {
          // Fan vent with speed control
          const speedValue = this.getSliderValue(vent.entity, 'fan');
          const currentSpeed = this.sliderValues.has(vent.entity) 
            ? `${speedValue}%` 
            : this.getFanSpeed(vent.entity);
          
          controls.push(html`
            <div class="control-card vent">
              <div class="control-icon" @click="${() => this.handleControlClick(vent.entity)}">
                ${icon.startsWith('mdi:') ? html`<ha-icon icon="${icon}"></ha-icon>` : icon}
              </div>
              <div class="control-info">
                <div class="control-label">${friendlyName}</div>
                <div class="control-value">${currentSpeed}</div>
                <div class="control-status">${this.renderStatusIndicator(vent.entity)}</div>
                <div class="control-slider">
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value="${speedValue}"
                    @input="${(e: Event) => {
                      const target = e.target as HTMLInputElement;
                      this.handleSliderInput(vent.entity, parseInt(target.value));
                    }}"
                    @change="${(e: Event) => {
                      const target = e.target as HTMLInputElement;
                      this.handleSliderChange(vent.entity, parseInt(target.value), 'fan');
                    }}"
                    class="speed-slider"
                  />
                </div>
              </div>
            </div>
          `);
        } else {
          // Regular on/off vent
          controls.push(html`
            <div class="control-card vent" @click="${() => this.handleControlClick(vent.entity)}">
              <div class="control-icon">
                ${icon.startsWith('mdi:') ? html`<ha-icon icon="${icon}"></ha-icon>` : icon}
              </div>
              <div class="control-info">
                <div class="control-label">${friendlyName}</div>
                <div class="control-value">${this.getDeviceStatus(vent.entity)}</div>
                <div class="control-status">${this.renderStatusIndicator(vent.entity)}</div>
              </div>
            </div>
          `);
        }
      });
    }
    
    return controls;
  }

  private getSensorIcon(sensorType: string): string {
    const iconMap: { [key: string]: string } = {
      'moisture': 'mdi:water-percent',
      'illuminance': 'mdi:white-balance-sunny',
      'temperature': 'mdi:thermometer',
      'conductivity': 'mdi:flash',
      'humidity': 'mdi:air-humidifier',
      'dli': 'mdi:white-balance-sunny'
    };
    return iconMap[sensorType] || 'mdi:chart-line';
  }

  private renderFlowerCardAttribute(sensorType: string, plantEntity: any, plantConfig: any): TemplateResult {
    const icon = this.getSensorIcon(sensorType);
    
    // Get current value and limits from plant entity
    const current = parseFloat(this.getPlantSensorValueSync(plantEntity, sensorType, plantConfig));
    const min = plantEntity.attributes[`min_${sensorType}`] || 0;
    const max = plantEntity.attributes[`max_${sensorType}`] || 100;
    
    // Format display value
    const displayValue = isNaN(current) ? 'N/A' : current.toString();
    const hasValue = !isNaN(current);
    
    // Calculate percentage for bar
    const percentage = hasValue ? 
      100 * Math.max(0, Math.min(1, (current - min) / (max - min))) : 0;
    
    // Determine status (good/bad/unavailable)
    const status = !hasValue ? 'unavailable' : 
      (current < min || current > max) ? 'bad' : 'good';
    
    // Get unit
    const unitMap: { [key: string]: string } = {
      'moisture': '%',
      'illuminance': 'lx',
      'temperature': '°C', 
      'conductivity': 'µS/cm',
      'humidity': '%',
      'dli': 'mol/m²/d'
    };
    const unit = unitMap[sensorType] || '';

    return html`
      <div class="flower-attribute">
        <ha-icon .icon="${icon}"></ha-icon>
        <div class="flower-meter">
          <span class="${status}" style="width: ${hasValue ? percentage : 0}%;"></span>
        </div>
        <div class="flower-header">
          <span class="flower-value">${displayValue}</span>
          <span class="flower-unit">${unit}</span>
        </div>
      </div>
    `;
  }

  private renderPlantsGrid() {
    const plants = this.config.plants || [];
    
    // Only render configured plants, no empty placeholders
    return plants.map(plant => {
      if (!plant.entity) {
        console.warn('Plant configuration missing entity:', plant);
        return html``;
      }

      const plantEntity = this.hass.states[plant.entity];
      if (!plantEntity) {
        return html`
          <div class="plant-card error">
            <div class="plant-icon">⚠️</div>
            <div class="plant-name">${plant.name || plant.entity}</div>
            <div class="error-text">Entity not found: ${plant.entity}</div>
          </div>
        `;
      }

      // Use show_bars configuration (defaults to common sensors if not specified)
      const showBars = plant.show_bars || ['moisture', 'illuminance', 'temperature', 'conductivity'];
      
      // Render attributes using Flower Card style
      const attributeChunks: TemplateResult[] = [];
      const attributesPerRow = 2; // Show 2 attributes per row
      
      for (let i = 0; i < showBars.length; i += attributesPerRow) {
        const chunk = showBars.slice(i, i + attributesPerRow);
        attributeChunks.push(html`
          <div class="flower-attributes">
            ${chunk.map(sensorType => 
              this.renderFlowerCardAttribute(sensorType, plantEntity, plant)
            )}
          </div>
        `);
      }

      const plantIcon = plant.icon || 'mdi:cannabis';
      const plantName = plant.name || plantEntity.attributes?.friendly_name || plant.entity;
      const species = plantEntity.attributes?.species || '';
      const image = plantEntity.attributes?.entity_picture;
      
      return html`
        <div class="plant-card flower-card">
          <div class="flower-header" @click="${() => this.handlePlantClick(plant.entity)}">
            ${image ? html`<img src="${image}" alt="${plantName}">` : html`
              <div class="flower-icon">
                ${plantIcon.startsWith('mdi:') ? html`<ha-icon icon="${plantIcon}"></ha-icon>` : plantIcon}
              </div>
            `}
            <span class="flower-name">${plantName}</span>
            ${species ? html`<span class="flower-species">${species}</span>` : ''}
          </div>
          <div class="flower-divider"></div>
          ${attributeChunks}
        </div>
      `;
    });
  }

  private handlePlantClick(entityId: string): void {
    const event = new Event('hass-more-info', {
      bubbles: true,
      composed: true,
    });
    (event as any).detail = { entityId };
    this.dispatchEvent(event);
  }


  protected render() {
    if (!this.config || !this.hass) {
      return html``;
    }

    const vpdData = this.calculateVPD();
    const optionalSensors = this.renderOptionalSensors();
    const optionalControls = this.renderOptionalControls();

    return html`
      <ha-card>
        <div class="card-header">
          <h2 class="card-title">🌱 ${this.config.name || 'Growbox'}</h2>
          ${this.config.vpd_calculation?.enabled ? html`
            <div class="vpd-indicator" style="background-color: ${vpdData.color}">
              VPD: ${vpdData.vpd.toFixed(2)} - ${vpdData.phase}
            </div>
          ` : ''}
        </div>
        
        <!-- Environmental Sensors (only show configured ones) -->
        ${optionalSensors.length > 0 ? html`
          <div class="sensors-grid">
            ${optionalSensors}
          </div>
        ` : ''}
        
        <!-- Controls Section (only show configured ones) -->
        ${optionalControls.length > 0 ? html`
          <div class="controls-container">
            <div class="controls-frame" style="background: #2d2d2d; border: 2px solid #4CAF50; border-radius: 12px; padding: 16px; position: relative; margin-bottom: 16px;">
              <div class="frame-label" style="position: absolute; top: -10px; left: 16px; background: #1a1a1a; padding: 0 8px; font-size: 12px; color: #4CAF50; font-weight: bold; z-index: 1;">Controls</div>
              <div class="controls-grid">
                ${optionalControls}
              </div>
            </div>
          </div>
        ` : ''}
        
        <!-- Plants Section (only show if plants are configured) -->
        ${this.config.plants && this.config.plants.length > 0 ? html`
          <div class="plants-container">
            <div class="plants-frame">
              <div class="frame-label">Plants</div>
              <div class="plants-grid">
                ${this.renderPlantsGrid()}
              </div>
            </div>
          </div>
        ` : ''}
        
        ${this.config.camera_entity ? html`
          <div class="camera-section">
            <div class="camera-header">📹 Kamera</div>
            <div class="camera-container">
              <img src="/api/camera_proxy/${this.config.camera_entity}" alt="Grow Box Camera" />
            </div>
          </div>
        ` : ''}
      </ha-card>
    `;
  }

  static get styles() {
    return css`
      :host {
        display: block;
        font-family: var(--ha-card-font-family, inherit);
      }

      ha-card {
        background: var(--ha-card-background, #1a1a1a);
        border: 1px solid var(--divider-color, #2d2d2d);
        border-radius: 12px;
        padding: 16px;
        color: var(--primary-text-color, #ffffff);
      }

      /* Global ha-icon color override */
      ha-icon {
        color: inherit !important;
      }

      .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
        padding-bottom: 12px;
        border-bottom: 1px solid var(--divider-color, #2d2d2d);
      }

      .card-title {
        margin: 0;
        font-size: 24px;
        font-weight: bold;
        color: var(--primary-color, #4CAF50);
      }

      .vpd-indicator {
        padding: 4px 12px;
        border-radius: 16px;
        font-size: 12px;
        font-weight: bold;
        color: white;
      }

      .sensors-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        gap: 12px;
        margin-bottom: 16px;
      }

      .sensor-card {
        background: var(--card-background-color, #2d2d2d);
        border-radius: 8px;
        padding: 12px;
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .sensor-icon {
        font-size: 24px;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--gray800, #ffffff);
      }

      .sensor-icon ha-icon {
        --mdc-icon-size: 24px;
        color: var(--gray800, #ffffff) !important;
        --mdc-icon-color: var(--gray800, #ffffff);
        --ha-icon-color: var(--gray800, #ffffff);
        --iron-icon-fill-color: var(--gray800, #ffffff);
      }

      .sensor-info {
        flex: 1;
      }

      .sensor-label {
        font-size: 12px;
        color: var(--secondary-text-color, #888);
        margin-bottom: 4px;
      }

      .sensor-value {
        font-size: 18px;
        font-weight: bold;
        color: var(--primary-text-color, #ffffff);
      }

      :host .controls-container {
        margin-bottom: 16px !important;
        display: block !important;
      }

      :host .controls-frame {
        background: var(--card-background-color, #2d2d2d) !important;
        border: 2px solid var(--primary-color, #4CAF50) !important;
        border-radius: 12px !important;
        padding: 16px !important;
        position: relative !important;
        box-sizing: border-box !important;
        display: block !important;
        width: 100% !important;
      }

      .controls-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        gap: 12px;
        margin-top: 8px;
      }

      .control-card {
        background: var(--card-background-color, #2d2d2d);
        border-radius: 8px;
        padding: 12px;
        text-align: center;
        transition: all 0.3s ease;
        cursor: pointer;
      }

      .control-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      }

      .control-icon {
        font-size: 32px;
        margin-bottom: 8px;
        color: var(--gray800, #ffffff);
      }

      .control-icon ha-icon {
        --mdc-icon-size: 32px;
        color: var(--gray800, #ffffff) !important;
        --mdc-icon-color: var(--gray800, #ffffff);
        --ha-icon-color: var(--gray800, #ffffff);
        --iron-icon-fill-color: var(--gray800, #ffffff);
      }

      .control-label {
        font-size: 12px;
        color: var(--secondary-text-color, #888);
        margin-bottom: 4px;
      }

      .control-value {
        font-size: 14px;
        font-weight: bold;
        color: var(--primary-text-color, #ffffff);
        margin-bottom: 4px;
      }

      .control-status {
        font-size: 12px;
      }

      .status-indicator {
        display: inline-block;
        font-weight: bold;
      }

      .status-indicator.on {
        color: #4CAF50;
      }

      .status-indicator.off {
        color: #f44336;
      }

      .status-indicator.unknown {
        color: #888;
      }

      .plants-container {
        margin-bottom: 16px;
      }

      .plants-frame {
        background: var(--card-background-color, #2d2d2d);
        border: 2px solid var(--primary-color, #4CAF50);
        border-radius: 12px;
        padding: 16px;
        position: relative;
      }

      .controls-frame .frame-label,
      .plants-frame .frame-label {
        position: absolute !important;
        top: -10px !important;
        left: 16px !important;
        background: var(--ha-card-background, #1a1a1a) !important;
        padding: 0 8px !important;
        font-size: 12px !important;
        color: var(--primary-color, #4CAF50) !important;
        font-weight: bold !important;
        z-index: 1 !important;
      }

      .plants-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 12px;
        margin-top: 8px;
      }

      .plant-card {
        background: var(--card-background-color, #2d2d2d);
        border-radius: 8px;
        padding: 12px;
        border: 1px solid rgba(76, 175, 80, 0.3);
        transition: all 0.3s ease;
        min-height: 140px;
      }

      .plant-card.error {
        border-color: #f44336;
        background: rgba(244, 67, 54, 0.1);
      }

      .error-text {
        font-size: 10px;
        color: #f44336;
        text-align: center;
        margin-top: 8px;
      }

      /* Flower Card styles */
      .flower-card {
        background: var(--card-background-color, #2d2d2d);
        border-radius: 8px;
        border: 1px solid rgba(76, 175, 80, 0.3);
        overflow: hidden;
      }

      .flower-header {
        padding: 16px;
        display: flex;
        align-items: center;
        gap: 12px;
        cursor: pointer;
        background: var(--card-background-color, #2d2d2d);
      }

      .flower-header img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
      }

      .flower-icon {
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(76, 175, 80, 0.2);
        border-radius: 50%;
        color: var(--primary-color, #4CAF50);
      }

      .flower-icon ha-icon {
        --mdc-icon-size: 24px;
      }

      .flower-name {
        font-weight: bold;
        color: var(--primary-text-color, #ffffff);
        flex: 1;
      }

      .flower-species {
        font-size: 12px;
        color: var(--secondary-text-color, #888);
      }

      .flower-divider {
        height: 1px;
        background: rgba(76, 175, 80, 0.3);
        margin: 0 16px;
      }

      .flower-attributes {
        display: flex;
        padding: 8px 16px;
      }

      .flower-attribute {
        display: flex;
        align-items: center;
        width: 50%;
        gap: 8px;
        cursor: pointer;
      }

      .flower-attribute ha-icon {
        color: var(--secondary-text-color, #888);
        --mdc-icon-size: 16px;
      }

      .flower-meter {
        height: 8px;
        background-color: var(--primary-background-color, #444);
        border-radius: 2px;
        display: inline-grid;
        overflow: hidden;
        flex: 1;
        margin: 0 8px;
      }

      .flower-meter > span {
        grid-row: 1;
        grid-column: 1;
        height: 100%;
        border-radius: 2px;
      }

      .flower-meter > .good {
        background-color: rgba(43, 194, 83, 1);
      }

      .flower-meter > .bad {
        background-color: rgba(240, 163, 163, 1);
      }

      .flower-meter > .unavailable {
        background-color: rgba(158, 158, 158, 1);
      }

      .flower-attribute .flower-header {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        white-space: nowrap;
      }

      .flower-value {
        font-weight: bold;
        color: var(--primary-text-color, #ffffff);
        font-size: 12px;
      }

      .flower-unit {
        font-size: 10px;
        color: var(--secondary-text-color, #888);
      }

      .plant-card:hover {
        border-color: var(--primary-color, #4CAF50);
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(76, 175, 80, 0.2);
      }

      .control-slider {
        margin-top: 8px;
        width: 100%;
      }

      .brightness-slider,
      .speed-slider {
        width: 100%;
        height: 4px;
        border-radius: 2px;
        background: #444;
        outline: none;
        -webkit-appearance: none;
        appearance: none;
      }

      .brightness-slider::-webkit-slider-thumb,
      .speed-slider::-webkit-slider-thumb {
        appearance: none;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: var(--primary-color, #4CAF50);
        cursor: pointer;
        border: 2px solid #fff;
        box-shadow: 0 0 4px rgba(0,0,0,0.3);
      }

      .brightness-slider::-moz-range-thumb,
      .speed-slider::-moz-range-thumb {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: var(--primary-color, #4CAF50);
        cursor: pointer;
        border: 2px solid #fff;
        box-shadow: 0 0 4px rgba(0,0,0,0.3);
      }

      .plant-icon {
        font-size: 32px;
        text-align: center;
        margin-bottom: 8px;
        color: var(--gray800, #ffffff);
      }

      .plant-icon ha-icon {
        --mdc-icon-size: 32px;
        color: var(--gray800, #ffffff) !important;
        --mdc-icon-color: var(--gray800, #ffffff);
        --ha-icon-color: var(--gray800, #ffffff);
        --iron-icon-fill-color: var(--gray800, #ffffff);
      }

      .plant-name {
        font-size: 14px;
        font-weight: bold;
        color: var(--primary-color, #4CAF50);
        text-align: center;
        margin-bottom: 12px;
      }

      .plant-sensors {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 4px;
        margin-bottom: 12px;
      }

      .sensor {
        font-size: 10px;
        color: var(--secondary-text-color, #888);
        white-space: nowrap;
      }

      .plant-health {
        margin-top: auto;
      }

      .health-bar {
        background: #444;
        border-radius: 3px;
        height: 6px;
        margin-bottom: 4px;
        overflow: hidden;
      }

      .health-fill {
        height: 100%;
        border-radius: 3px;
        transition: width 0.3s ease;
      }

      .health-text {
        font-size: 9px;
        text-align: center;
        font-weight: bold;
      }

      .camera-section {
        margin-top: 16px;
      }

      .camera-header {
        font-size: 14px;
        font-weight: bold;
        color: var(--primary-color, #4CAF50);
        margin-bottom: 8px;
      }

      .camera-container {
        border-radius: 8px;
        overflow: hidden;
        background: #000;
      }

      .camera-container img {
        width: 100%;
        height: auto;
        display: block;
      }

      /* Responsive design */
      @media (max-width: 600px) {
        .sensors-grid {
          grid-template-columns: repeat(2, 1fr);
        }
        
        .controls-grid {
          grid-template-columns: repeat(2, 1fr);
        }
        
        .plants-grid {
          grid-template-columns: 1fr;
        }
        
        .control-card {
          min-width: 140px;
        }
      }
    `;
  }
}

(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: 'ha-grow-box-card',
  name: 'Grow Box Card',
  description: 'A comprehensive card for monitoring cannabis grow tent systems'
});