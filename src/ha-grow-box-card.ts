import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant, LovelaceCard, LovelaceCardConfig, LovelaceCardEditor } from 'custom-card-helpers';
import { GrowBoxCardConfig, PlantConfig, VentConfig, VPDConfig } from './types';

declare global {
  interface HTMLElementTagNameMap {
    'ha-grow-box-card': HaGrowBoxCard;
    'ha-grow-box-card-editor': any;
  }
}


@customElement('ha-grow-box-card')
export class HaGrowBoxCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private config!: GrowBoxCardConfig;
  @state() private plantInfoCache: Map<string, any> = new Map();
  @state() private plantDataCache: Map<string, any> = new Map();

  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    await import('./editor');
    return document.createElement('ha-grow-box-card-editor');
  }

  public static getStubConfig(): GrowBoxCardConfig {
    return {
      type: 'custom:ha-grow-box-card',
      name: 'Grow Box',
      vpd: {
        enabled: true,
        show_phases: true
      },
      plants: [
        { name: 'Plant 1', position: 1 },
        { name: 'Plant 2', position: 2 },
        { name: 'Plant 3', position: 3 },
        { name: 'Plant 4', position: 4 }
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
            const plantData = {
              moisture: await this.getPlantSensorValue(plantEntity, 'moisture', plant),
              light: await this.getPlantSensorValue(plantEntity, 'illuminance', plant),
              temp: await this.getPlantSensorValue(plantEntity, 'temperature', plant),
              ec: await this.getPlantSensorValue(plantEntity, 'conductivity', plant),
              health: healthData.health,
              status: healthData.status,
              healthColor: healthData.color
            };
            
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

  private getLightSliderWidth(): number {
    if (!this.config.light_entity || !this.hass) {
      return 0;
    }
    
    const state = this.hass.states[this.config.light_entity];
    if (!state || state.state === 'off') return 0;
    
    const brightness = state.attributes?.brightness;
    if (brightness !== undefined) {
      return (brightness / 255) * 150; // 150 is the max width
    }
    
    return state.state === 'on' ? 150 : 0;
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
      'moisture': ['soil_moisture', 'moisture_level', 'humidity', 'moisture'],
      'illuminance': ['light_intensity', 'light', 'brightness', 'illuminance'],
      'temperature': ['temp', 'temperature'],
      'conductivity': ['electrical_conductivity', 'ec', 'conductivity', 'fertility']
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
      'moisture': ['soil_moisture', 'moisture_level', 'humidity', 'moisture'],
      'illuminance': ['light_intensity', 'light', 'brightness', 'illuminance'],
      'temperature': ['temp', 'temperature'],
      'conductivity': ['electrical_conductivity', 'ec', 'conductivity', 'fertility']
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

  private getSensorValue(entityId?: string): string {
    if (!entityId) return 'N/A';
    return this.hass.states[entityId]?.state || 'N/A';
  }

  private getPlantName(): string {
    const plants = this.config.plants || [];
    return plants[0]?.name || 'Plant 1';
  }

  private getPlantMoisture(): string {
    const plants = this.config.plants || [];
    const plant = plants[0];
    if (plant?.entity) {
      const cachedData = this.plantDataCache.get(plant.entity);
      if (cachedData) {
        return cachedData.moisture;
      }
    }
    return '23.0';
  }

  private getPlantTemp(): string {
    const plants = this.config.plants || [];
    const plant = plants[0];
    if (plant?.entity) {
      const cachedData = this.plantDataCache.get(plant.entity);
      if (cachedData) {
        return cachedData.temp;
      }
    }
    return '16.7';
  }

  private getPlantLight(): string {
    const plants = this.config.plants || [];
    const plant = plants[0];
    if (plant?.entity) {
      const cachedData = this.plantDataCache.get(plant.entity);
      if (cachedData) {
        return cachedData.light;
      }
    }
    return 'OK';
  }

  private getPlantEC(): string {
    const plants = this.config.plants || [];
    const plant = plants[0];
    if (plant?.entity) {
      const cachedData = this.plantDataCache.get(plant.entity);
      if (cachedData) {
        return cachedData.ec;
      }
    }
    return 'OK';
  }

  private renderPlant(index: number, x: number, y: number) {
    const plants = this.config.plants || [];
    const plant = plants[index];
    
    if (!plant) {
      return html`<!-- No plant configured for position ${index + 1} -->`;
    }

    // Get cached data if available
    let plantData = {
      moisture: '23.0',
      light: 'OK', 
      temp: '16.7',
      ec: 'OK',
      health: 30,
      status: 'Problem',
      healthColor: '#f44336'
    };

    if (plant.entity) {
      const cachedData = this.plantDataCache.get(plant.entity);
      if (cachedData) {
        plantData = cachedData;
        console.log(`Rendering plant ${plant.entity} with data:`, plantData);
      }
    }

    const healthBarWidth = Math.max(0, Math.min(130, (plantData.health / 100) * 130));
    const color = '#4CAF50';
    const icon = '🌿';

    return html`
      <g id="plant${index + 1}">
        <rect x="${x}" y="${y}" width="150" height="130" fill="#2d2d2d" rx="8" stroke="${color}" stroke-width="1"/>
        <text x="${x + 75}" y="${y + 20}" font-family="Arial" font-size="20" text-anchor="middle">${icon}</text>
        <text x="${x + 75}" y="${y + 45}" font-family="Arial" font-size="12" fill="${color}" text-anchor="middle">${plant.name}</text>
        <g transform="translate(${x + 10}, ${y + 55})">
          <text x="0" y="0" font-family="Arial" font-size="10" fill="#888">💧 ${plantData.moisture}%</text>
          <text x="60" y="0" font-family="Arial" font-size="10" fill="#888">☀️ ${plantData.light}</text>
          <text x="0" y="15" font-family="Arial" font-size="10" fill="#888">🌡️ ${plantData.temp}°C</text>
          <text x="60" y="15" font-family="Arial" font-size="10" fill="#888">🧪 ${plantData.ec}</text>
          <rect x="0" y="25" width="130" height="6" fill="#444" rx="3"/>
          <rect x="0" y="25" width="${healthBarWidth}" height="6" fill="${plantData.healthColor}" rx="3"/>
          <text x="65" y="45" font-family="Arial" font-size="9" fill="${plantData.healthColor}" text-anchor="middle">${plantData.status} - ${Math.round(plantData.health)}%</text>
        </g>
      </g>
    `;
  }

  private renderPlantsGrid() {
    const plants = this.config.plants || [];
    const positions = [0, 1, 2, 3]; // For 4 plant positions

    return positions.map(index => {
      const plant = plants[index];
      if (!plant) {
        return html`
          <div class="plant-card empty">
            <div class="plant-icon">🌱</div>
            <div class="plant-name">Leer</div>
          </div>
        `;
      }

      // Get cached data
      let plantData = {
        moisture: '23.0',
        temp: '16.7',
        light: 'OK',
        ec: 'OK',
        health: 30,
        status: 'Problem'
      };

      if (plant.entity) {
        const cachedData = this.plantDataCache.get(plant.entity);
        if (cachedData) {
          plantData = cachedData;
        }
      }

      return html`
        <div class="plant-card">
          <div class="plant-icon">🌿</div>
          <div class="plant-name">${plant.name}</div>
          <div class="plant-sensors">
            <div class="sensor">💧 ${plantData.moisture}%</div>
            <div class="sensor">🌡️ ${plantData.temp}°C</div>
            <div class="sensor">☀️ ${plantData.light}</div>
            <div class="sensor">🧪 ${plantData.ec}</div>
          </div>
          <div class="plant-health">
            <div class="health-bar">
              <div class="health-fill" style="width: ${plantData.health}%; background: #f44336;"></div>
            </div>
            <div class="health-text">${plantData.status} - ${plantData.health}%</div>
          </div>
        </div>
      `;
    });
  }

  private renderPlantGrid() {
    const plants = this.config.plants || [];
    const plantColors = ['#4CAF50', '#8BC34A', '#CDDC39', '#FFC107'];
    const plantIcons = ['🌿', '🌱', '🌿', '🌱'];
    const positions = [
      { x: 40, y: 300 },   // Plant 1 (Top Left)
      { x: 210, y: 300 },  // Plant 2 (Top Right)
      { x: 40, y: 440 },   // Plant 3 (Bottom Left)
      { x: 210, y: 440 }   // Plant 4 (Bottom Right)
    ];

    // Create array of plant elements and convert to HTML
    const plantElements = [];
    
    for (let index = 0; index < positions.length; index++) {
      const pos = positions[index];
      const plant = plants[index];
      const color = plantColors[index];
      const icon = plantIcons[index];
      const plantNum = index + 1;
      
      let plantData = {
        moisture: 'N/A',
        light: 'N/A', 
        temp: 'N/A',
        ec: 'N/A',
        health: 50,
        status: 'Leer',
        healthColor: '#666'
      };

      if (plant?.entity) {
        const plantEntity = this.hass.states[plant.entity];
        if (plantEntity) {
          // Use cached data if available, otherwise use fallback
          const cachedData = this.plantDataCache.get(plant.entity);
          if (cachedData) {
            plantData = cachedData;
            console.log(`Using cached data for plant ${plant.entity}:`, plantData);
          } else {
            // Fallback to synchronous data extraction
            console.log(`Plant ${plant.entity} found (using fallback):`, plantEntity);
            console.log(`Plant attributes:`, plantEntity.attributes);
            console.log('All plant attribute keys:', Object.keys(plantEntity.attributes));
            console.log('Full plant attributes object:', JSON.stringify(plantEntity.attributes, null, 2));
            
            // Help find related sensor entities
            this.findPotentialSensorEntities(plant.entity);
            
            // Use synchronous fallback for plant data
            plantData = {
              moisture: this.getPlantSensorValueSync(plantEntity, 'moisture', plant),
              light: this.getPlantSensorValueSync(plantEntity, 'illuminance', plant),
              temp: this.getPlantSensorValueSync(plantEntity, 'temperature', plant),
              ec: this.getPlantSensorValueSync(plantEntity, 'conductivity', plant),
              health: plantEntity.state === 'ok' ? 85 : plantEntity.state === 'problem' ? 30 : 50,
              status: plantEntity.state === 'ok' ? 'Gesund' : plantEntity.state === 'problem' ? 'Problem' : 'Unbekannt',
              healthColor: plantEntity.state === 'ok' ? '#4caf50' : plantEntity.state === 'problem' ? '#f44336' : '#666'
            };
            
            console.log(`Plant ${plant.entity} sensor values (fallback):`, plantData);
          }
        } else {
          // Entity exists but not found in states
          console.log(`Plant entity ${plant.entity} not found in Home Assistant states`);
          plantData = {
            moisture: 'Entity not found',
            light: 'Entity not found',
            temp: 'Entity not found',
            ec: 'Entity not found',
            health: 0,
            status: 'Check console & setup guide',
            healthColor: '#f44336'
          };
        }
      } else if (plant?.name) {
        // Plant configured but no entity - check for individual sensors
        const hasIndividualSensors = plant.moisture_sensor || plant.temperature_sensor || 
                                   plant.illuminance_sensor || plant.conductivity_sensor;
        
        if (hasIndividualSensors) {
          // Use individual sensors without plant entity
          plantData = {
            moisture: plant.moisture_sensor ? (this.hass.states[plant.moisture_sensor]?.state || 'N/A') : 'N/A',
            light: plant.illuminance_sensor ? (this.hass.states[plant.illuminance_sensor]?.state || 'N/A') : 'N/A',
            temp: plant.temperature_sensor ? (this.hass.states[plant.temperature_sensor]?.state || 'N/A') : 'N/A',
            ec: plant.conductivity_sensor ? (this.hass.states[plant.conductivity_sensor]?.state || 'N/A') : 'N/A',
            health: 70, // Default good health for individual sensors
            status: 'Individual sensors',
            healthColor: '#4caf50'
          };
          console.log(`Using individual sensors for plant ${plant.name}:`, plantData);
        } else {
          // No entity and no individual sensors
          plantData = {
            moisture: 'No sensors',
            light: 'No sensors', 
            temp: 'No sensors',
            ec: 'No sensors',
            health: 50,
            status: 'No sensors configured',
            healthColor: '#ff9800'
          };
        }
      }

      const healthBarWidth = Math.max(0, Math.min(130, (plantData.health / 100) * 130));
      const displayName = plant?.name || (plant?.entity ? this.hass.states[plant.entity]?.attributes?.friendly_name : null) || `Pflanze ${plantNum}`;

      plantElements.push(html`
        <g id="plant${plantNum}">
          <rect x="${pos.x}" y="${pos.y}" width="150" height="130" fill="#2d2d2d" rx="8" stroke="${color}" stroke-width="1"/>
          <text x="${pos.x + 75}" y="${pos.y + 20}" font-family="Arial" font-size="20" text-anchor="middle">${icon}</text>
          <text x="${pos.x + 75}" y="${pos.y + 45}" font-family="Arial" font-size="12" fill="${color}" text-anchor="middle">${displayName}</text>
          <g transform="translate(${pos.x + 10}, ${pos.y + 55})">
            <text x="0" y="0" font-family="Arial" font-size="10" fill="#888">💧 ${plantData.moisture}${plantData.moisture !== 'N/A' ? '%' : ''}</text>
            <text x="60" y="0" font-family="Arial" font-size="10" fill="#888">☀️ ${plantData.light}${plantData.light !== 'N/A' ? ' lx' : ''}</text>
            <text x="0" y="15" font-family="Arial" font-size="10" fill="#888">🌡️ ${plantData.temp}${plantData.temp !== 'N/A' ? '°C' : ''}</text>
            <text x="60" y="15" font-family="Arial" font-size="10" fill="#888">🧪 ${plantData.ec}${plantData.ec !== 'N/A' ? ' µS' : ''}</text>
            <rect x="0" y="25" width="130" height="6" fill="#444" rx="3"/>
            <rect x="0" y="25" width="${healthBarWidth}" height="6" fill="${plantData.healthColor}" rx="3"/>
            <text x="65" y="45" font-family="Arial" font-size="9" fill="${plantData.healthColor}" text-anchor="middle">${plantData.status} - ${Math.round(plantData.health)}%</text>
          </g>
        </g>
      `);
    }
    
    // Return all plant elements in a single template
    return html`${plantElements}`;
  }

  protected render() {
    if (!this.config || !this.hass) {
      return html``;
    }

    const vpdData = this.calculateVPD();

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
        
        <!-- Environmental Sensors -->
        <div class="sensors-grid">
          <div class="sensor-card">
            <div class="sensor-icon temp">🌡️</div>
            <div class="sensor-info">
              <div class="sensor-label">Innentemperatur</div>
              <div class="sensor-value">
                ${this.config.inner_temp_entity ? (this.hass.states[this.config.inner_temp_entity]?.state || 'N/A') : 'N/A'}°C
              </div>
            </div>
          </div>
          
          <div class="sensor-card">
            <div class="sensor-icon humidity">💧</div>
            <div class="sensor-info">
              <div class="sensor-label">Innenfeuchtigkeit</div>
              <div class="sensor-value">
                ${this.config.inner_humidity_entity ? (this.hass.states[this.config.inner_humidity_entity]?.state || 'N/A') : 'N/A'}%
              </div>
            </div>
          </div>
          
          <div class="sensor-card">
            <div class="sensor-icon temp">🌡️</div>
            <div class="sensor-info">
              <div class="sensor-label">Außentemperatur</div>
              <div class="sensor-value">
                ${this.config.outer_temp_entity ? (this.hass.states[this.config.outer_temp_entity]?.state || 'N/A') : 'N/A'}°C
              </div>
            </div>
          </div>
          
          <div class="sensor-card">
            <div class="sensor-icon humidity">💧</div>
            <div class="sensor-info">
              <div class="sensor-label">Außenfeuchtigkeit</div>
              <div class="sensor-value">
                ${this.config.outer_humidity_entity ? (this.hass.states[this.config.outer_humidity_entity]?.state || 'N/A') : 'N/A'}%
              </div>
            </div>
          </div>
        </div>
        
        <!-- Controls -->
        <div class="controls-grid">
          <div class="control-card light">
            <div class="control-icon">💡</div>
            <div class="control-info">
              <div class="control-label">Beleuchtung</div>
              <div class="control-value">${this.config.light_entity ? this.getLightBrightness() : 'N/A'}</div>
              <div class="control-status">${this.renderStatusIndicator(this.config.light_entity)}</div>
            </div>
          </div>
          
          <div class="control-card ventilation">
            <div class="control-icon">🌀</div>
            <div class="control-info">
              <div class="control-label">Belüftung</div>
              <div class="control-value">${this.config.ventilation_entity ? this.getDeviceStatus(this.config.ventilation_entity) : 'N/A'}</div>
              <div class="control-status">${this.renderStatusIndicator(this.config.ventilation_entity)}</div>
            </div>
          </div>
          
          <div class="control-card heating">
            <div class="control-icon">🔥</div>
            <div class="control-info">
              <div class="control-label">Heizung</div>
              <div class="control-value">${this.config.heating_entity ? this.getDeviceStatus(this.config.heating_entity) : 'N/A'}</div>
              <div class="control-status">${this.renderStatusIndicator(this.config.heating_entity)}</div>
            </div>
          </div>
        </div>
        
        <!-- Grow Box Visualization -->
        <div class="growbox-container">
          <div class="growbox-frame">
            <div class="frame-label">Growbox</div>
            <div class="plants-grid">
              ${this.renderPlantsGrid()}
            </div>
          </div>
        </div>
        
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
        border-radius: 50%;
      }

      .sensor-icon.temp {
        background: linear-gradient(135deg, #FF5722, #FF9800);
      }

      .sensor-icon.humidity {
        background: linear-gradient(135deg, #2196F3, #03A9F4);
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

      .controls-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        gap: 12px;
        margin-bottom: 16px;
      }

      .control-card {
        background: var(--card-background-color, #2d2d2d);
        border-radius: 8px;
        padding: 12px;
        text-align: center;
        transition: all 0.3s ease;
      }

      .control-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      }

      .control-icon {
        font-size: 32px;
        margin-bottom: 8px;
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

      .growbox-container {
        margin-bottom: 16px;
      }

      .growbox-frame {
        background: var(--card-background-color, #2d2d2d);
        border: 2px solid var(--primary-color, #4CAF50);
        border-radius: 12px;
        padding: 16px;
        position: relative;
      }

      .frame-label {
        position: absolute;
        top: -10px;
        left: 16px;
        background: var(--ha-card-background, #1a1a1a);
        padding: 0 8px;
        font-size: 12px;
        color: var(--primary-color, #4CAF50);
        font-weight: bold;
      }

      .plants-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
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

      .plant-card:hover {
        border-color: var(--primary-color, #4CAF50);
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(76, 175, 80, 0.2);
      }

      .plant-card.empty {
        border-style: dashed;
        border-color: #555;
        opacity: 0.6;
      }

      .plant-icon {
        font-size: 32px;
        text-align: center;
        margin-bottom: 8px;
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