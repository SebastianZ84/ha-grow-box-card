import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant, LovelaceCard, LovelaceCardConfig, LovelaceCardEditor } from 'custom-card-helpers';

declare global {
  interface HTMLElementTagNameMap {
    'ha-grow-box-card': HaGrowBoxCard;
    'ha-grow-box-card-editor': HaGrowBoxCardEditor;
  }
}

interface GrowBoxCardConfig extends LovelaceCardConfig {
  type: string;
  name?: string;
  inner_temp_entity?: string;
  inner_humidity_entity?: string;
  outer_temp_entity?: string;
  outer_humidity_entity?: string;
  leaf_temp_entity?: string;
  light_entity?: string;
  heating_entity?: string;
  ventilation_entity?: string;
  ballast_entity?: string;
  vents?: VentConfig[];
  plants?: PlantConfig[];
  vpd?: VPDConfig;
  camera_entity?: string;
}

interface VentConfig {
  name: string;
  entity: string;
  icon?: string;
}

interface PlantConfig {
  name: string;
  entity?: string;
  position: number;
}

interface VPDConfig {
  enabled: boolean;
  show_phases: boolean;
}

@customElement('ha-grow-box-card')
export class HaGrowBoxCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private config!: GrowBoxCardConfig;

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

  private getPlantSensorValue(plantEntity: any, sensorType: string): string {
    if (!plantEntity || !plantEntity.attributes) return 'N/A';
    
    // Check for direct sensor entity references in plant attributes
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
    const alternativeNames = {
      'moisture': ['soil_moisture', 'moisture_level', 'humidity'],
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
    
    return 'N/A';
  }

  private calculatePlantHealth(plantEntity: any): { health: number; status: string; color: string } {
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
    sensors.forEach(sensor => {
      const value = parseFloat(this.getPlantSensorValue(plantEntity, sensor));
      const min = plantEntity.attributes[`min_${sensor}`];
      const max = plantEntity.attributes[`max_${sensor}`];
      
      if (!isNaN(value) && min !== undefined && max !== undefined) {
        if (value < min || value > max) {
          problemCount++;
          healthScore -= 20;
        }
      }
    });

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

  private renderPlantGrid(): any {
    const plants = this.config.plants || [];
    const plantColors = ['#4CAF50', '#8BC34A', '#CDDC39', '#FFC107'];
    const plantIcons = ['🌿', '🌱', '🌿', '🌱'];
    const positions = [
      { x: 40, y: 300 },   // Plant 1 (Top Left)
      { x: 210, y: 300 },  // Plant 2 (Top Right)
      { x: 40, y: 440 },   // Plant 3 (Bottom Left)
      { x: 210, y: 440 }   // Plant 4 (Bottom Right)
    ];

    return positions.map((pos, index) => {
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
          // Debug: Log plant entity data to console
          console.log(`Plant ${plant.entity} found:`, plantEntity);
          console.log(`Plant attributes:`, plantEntity.attributes);
          
          const healthData = this.calculatePlantHealth(plantEntity);
          
          plantData = {
            moisture: this.getPlantSensorValue(plantEntity, 'moisture'),
            light: this.getPlantSensorValue(plantEntity, 'illuminance'),
            temp: this.getPlantSensorValue(plantEntity, 'temperature'),
            ec: this.getPlantSensorValue(plantEntity, 'conductivity'),
            health: healthData.health,
            status: healthData.status,
            healthColor: healthData.color
          };
          
          // Debug: Log retrieved values
          console.log(`Plant ${plant.entity} sensor values:`, plantData);
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
        // Plant configured but no entity
        plantData = {
          moisture: 'No entity',
          light: 'No entity',
          temp: 'No entity',
          ec: 'No entity',
          health: 50,
          status: 'No entity configured',
          healthColor: '#ff9800'
        };
      }

      const healthBarWidth = Math.max(0, Math.min(130, (plantData.health / 100) * 130));
      const displayName = plant?.name || (plant?.entity ? this.hass.states[plant.entity]?.attributes?.friendly_name : null) || `Pflanze ${plantNum}`;

      return html`
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
      `;
    });
  }

  protected render() {
    if (!this.config || !this.hass) {
      return html``;
    }

    return html`
      <ha-card>
        <div class="growbox-svg">
          <svg viewBox="0 0 400 600" xmlns="http://www.w3.org/2000/svg">
            <!-- Card Background -->
            <rect width="400" height="600" fill="#1a1a1a" rx="12"/>
            
            <!-- Header -->
            <rect width="400" height="60" fill="#2d2d2d" rx="12"/>
            <text x="20" y="38" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#4CAF50">
              🌱 ${this.config.name || 'Growbox'}
            </text>
            
            <!-- Temperature & Humidity Display -->
            <g id="climate-inner">
              <rect x="20" y="75" width="170" height="70" fill="#2d2d2d" rx="8"/>
              <text x="30" y="95" font-family="Arial" font-size="12" fill="#888">Innen</text>
              <text x="30" y="120" font-family="Arial" font-size="20" font-weight="bold" fill="#4CAF50">
                ${this.config.inner_temp_entity ? (this.hass.states[this.config.inner_temp_entity]?.state || 'N/A') : 'N/A'}°C
              </text>
              <text x="110" y="120" font-family="Arial" font-size="20" font-weight="bold" fill="#2196F3">
                ${this.config.inner_humidity_entity ? (this.hass.states[this.config.inner_humidity_entity]?.state || 'N/A') : 'N/A'}%
              </text>
              <text x="30" y="138" font-family="Arial" font-size="10" fill="#666">Temperatur</text>
              <text x="110" y="138" font-family="Arial" font-size="10" fill="#666">Feuchtigkeit</text>
            </g>
            
            <g id="climate-outer">
              <rect x="210" y="75" width="170" height="70" fill="#2d2d2d" rx="8"/>
              <text x="220" y="95" font-family="Arial" font-size="12" fill="#888">Außen</text>
              <text x="220" y="120" font-family="Arial" font-size="20" font-weight="bold" fill="#FF9800">
                ${this.config.outer_temp_entity ? (this.hass.states[this.config.outer_temp_entity]?.state || 'N/A') : 'N/A'}°C
              </text>
              <text x="300" y="120" font-family="Arial" font-size="20" font-weight="bold" fill="#03A9F4">
                ${this.config.outer_humidity_entity ? (this.hass.states[this.config.outer_humidity_entity]?.state || 'N/A') : 'N/A'}%
              </text>
              <text x="220" y="138" font-family="Arial" font-size="10" fill="#666">Temperatur</text>
              <text x="300" y="138" font-family="Arial" font-size="10" fill="#666">Feuchtigkeit</text>
            </g>
            
            <!-- Control Section -->
            <g id="controls">
              <!-- Lampe (Light with Dimmer) -->
              <rect x="20" y="160" width="170" height="90" fill="#2d2d2d" rx="8"/>
              <circle cx="60" cy="190" r="18" fill="#FFC107" opacity="0.9"/>
              <text x="60" y="195" font-family="Arial" font-size="20" text-anchor="middle">💡</text>
              <text x="90" y="185" font-family="Arial" font-size="14" fill="#fff">Lampe</text>
              <text x="90" y="203" font-family="Arial" font-size="12" fill="#888">
                ${this.config.light_entity ? this.getLightBrightness() : 'N/A'}
              </text>
              <!-- Dimmer Slider -->
              <rect x="30" y="220" width="150" height="4" fill="#444" rx="2"/>
              <rect x="30" y="220" width="${this.getLightSliderWidth()}" height="4" fill="#FFC107" rx="2"/>
              <circle cx="${30 + this.getLightSliderWidth()}" cy="222" r="8" fill="#FFC107"/>
            </g>
            
            <g id="ventilation">
              <!-- Abluft (Exhaust) -->
              <rect x="210" y="160" width="80" height="90" fill="#2d2d2d" rx="8"/>
              <circle cx="250" cy="190" r="18" fill="#00BCD4" opacity="0.8"/>
              <text x="250" y="197" font-family="Arial" font-size="22" text-anchor="middle">🌀</text>
              <text x="250" y="218" font-family="Arial" font-size="11" fill="#fff" text-anchor="middle">Abluft</text>
              <text x="250" y="235" font-family="Arial" font-size="13" fill="#00BCD4" text-anchor="middle">
                ${this.config.ventilation_entity ? this.getDeviceStatus(this.config.ventilation_entity) : 'N/A'}
              </text>
              
              <!-- Vents -->
              <rect x="300" y="160" width="80" height="90" fill="#2d2d2d" rx="8"/>
              <circle cx="340" cy="190" r="18" fill="#9C27B0" opacity="0.8"/>
              <text x="340" y="197" font-family="Arial" font-size="22" text-anchor="middle">💨</text>
              <text x="340" y="218" font-family="Arial" font-size="11" fill="#fff" text-anchor="middle">Vents</text>
              <text x="340" y="235" font-family="Arial" font-size="13" fill="#9C27B0" text-anchor="middle">AN</text>
            </g>
            
            <!-- Growbox Schema -->
            <rect x="20" y="265" width="360" height="315" fill="#1a1a1a" stroke="#4CAF50" stroke-width="2" rx="8"/>
            <text x="200" y="285" font-family="Arial" font-size="14" fill="#4CAF50" text-anchor="middle">Growbox (2x2)</text>
            
            ${this.renderPlantGrid()}
          </svg>
        </div>
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
        background: transparent;
        box-shadow: none;
        border: none;
        overflow: hidden;
      }

      .growbox-svg {
        width: 100%;
        height: auto;
        max-width: 400px;
        margin: 0 auto;
      }

      .growbox-svg svg {
        width: 100%;
        height: auto;
        display: block;
      }

      /* Make SVG responsive */
      @media (max-width: 600px) {
        .growbox-svg {
          max-width: 100%;
        }
      }
    `;
  }
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: 'ha-grow-box-card',
  name: 'Grow Box Card',
  description: 'A comprehensive card for monitoring cannabis grow tent systems'
});