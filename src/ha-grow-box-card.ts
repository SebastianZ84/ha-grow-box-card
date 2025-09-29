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

  private renderPlantsSimple(): TemplateResult {
    if (!this.config.plants) {
      return html``;
    }

    return html`
      <div class="plant-positions">
        ${this.config.plants.map((plant, index) => {
          const position = (index + 1).toString();
          
          if (!plant.entity) {
            return html`
              <div class="plant-pot empty" 
                   style="--position: ${position};" 
                   title="Empty position ${position}">
                <div class="plant-icon">🌱</div>
                <span>${position}</span>
              </div>
            `;
          }
          
          const state = this.hass.states[plant.entity];
          const isHealthy = state && state.state === 'ok';
          
          return html`
            <div class="plant-pot ${isHealthy ? 'healthy' : 'attention'}" 
                 style="--position: ${position};" 
                 title="${plant.name}">
              <div class="plant-icon">🌱</div>
              <span>${position}</span>
            </div>
          `;
        })}
      </div>
    `;
  }

  protected render() {
    if (!this.config || !this.hass) {
      return html``;
    }

    return html`
      <ha-card .header=${this.config.name || 'Grow Box'}>
        <div class="card-content">
          <div class="grow-tent-schema">
            <!-- Main Tent Structure -->
            <div class="tent-container">
              <div class="tent-frame">
                <!-- Background tent visualization -->
                <div class="tent-background"></div>
                
                <!-- Plants area -->
                <div class="plants-area">
                  ${this.renderPlantsSimple()}
                </div>

                <!-- Camera overlay if configured -->
                ${this.config.camera_entity ? html`
                  <div class="camera-overlay">
                    <div class="camera-feed">
                      <ha-camera-stream
                        .hass=${this.hass}
                        .stateObj=${this.hass.states[this.config.camera_entity]}
                        allow-exoplayer
                      ></ha-camera-stream>
                    </div>
                  </div>
                ` : ''}
              </div>
              
              <!-- Components Row underneath tent -->
              <div class="components-row">
                <div class="component extractor-pos" title="Extractor">
                  <div class="component-circle red">
                    <div class="component-number">1</div>
                    <div class="component-icon">🌪️</div>
                  </div>
                </div>

                <div class="component filter-pos" title="Carbon Filter">
                  <div class="component-circle gray">
                    <div class="component-number">2</div>
                    <div class="component-icon">🔰</div>
                  </div>
                </div>

                <div class="component thermo-pos" title="Temperature/Humidity">
                  <div class="component-circle blue">
                    <div class="component-number">9</div>
                    <div class="component-icon">🌡️</div>
                  </div>
                </div>

                <div class="component ballast-pos" title="Ballast">
                  <div class="component-circle green">
                    <div class="component-number">5</div>
                    <div class="component-icon">⚡</div>
                  </div>
                </div>

                <div class="component intake-pos" title="Intake">
                  <div class="component-circle blue">
                    <div class="component-number">6</div>
                    <div class="component-icon">🌬️</div>
                  </div>
                </div>

                <div class="component ventilator-pos" title="Ventilator">
                  <div class="component-circle gray">
                    <div class="component-number">7</div>
                    <div class="component-icon">🌀</div>
                  </div>
                </div>

                <div class="component thermostat-pos" title="Thermostat">
                  <div class="component-circle gray">
                    <div class="component-number">8</div>
                    <div class="component-icon">🎛️</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Legend Panel -->
            <div class="legend-panel">
              <h3>Components</h3>
              <div class="legend-items">
                <div class="legend-item">
                  <span class="legend-number">1</span>
                  <span class="legend-text">Extractor</span>
                  ${this.renderStatusIndicator(this.config.ventilation_entity)}
                </div>
                <div class="legend-item">
                  <span class="legend-number">2</span>
                  <span class="legend-text">Carbon Filter</span>
                  <span class="status-indicator passive">-</span>
                </div>
                <div class="legend-item">
                  <span class="legend-number">5</span>
                  <span class="legend-text">Ballast</span>
                  ${this.renderStatusIndicator(this.config.ballast_entity)}
                </div>
                <div class="legend-item">
                  <span class="legend-number">6</span>
                  <span class="legend-text">Intake</span>
                  <span class="status-indicator passive">-</span>
                </div>
                <div class="legend-item">
                  <span class="legend-number">7</span>
                  <span class="legend-text">Ventilator</span>
                  <span class="status-indicator passive">-</span>
                </div>
                <div class="legend-item">
                  <span class="legend-number">8</span>
                  <span class="legend-text">Thermostat</span>
                  <span class="status-indicator passive">-</span>
                </div>
                <div class="legend-item">
                  <span class="legend-number">9</span>
                  <span class="legend-text">Temp/Humidity</span>
                  ${this.renderStatusIndicator(this.config.inner_temp_entity)}
                </div>
              </div>
            </div>

            <!-- Sensor Data Panel -->
            <div class="sensor-panel">
              <h3>Environmental Data</h3>
              <div class="sensor-row">
                <div class="sensor-item">
                  <span class="sensor-label">Inside Temp</span>
                  <span class="sensor-value">${this.config.inner_temp_entity ? (this.hass.states[this.config.inner_temp_entity]?.state || 'N/A') : 'N/A'}°C</span>
                </div>
                <div class="sensor-item">
                  <span class="sensor-label">Inside Humidity</span>
                  <span class="sensor-value">${this.config.inner_humidity_entity ? (this.hass.states[this.config.inner_humidity_entity]?.state || 'N/A') : 'N/A'}%</span>
                </div>
              </div>
              <div class="sensor-row">
                <div class="sensor-item">
                  <span class="sensor-label">Outside Temp</span>
                  <span class="sensor-value">${this.config.outer_temp_entity ? (this.hass.states[this.config.outer_temp_entity]?.state || 'N/A') : 'N/A'}°C</span>
                </div>
                <div class="sensor-item">
                  <span class="sensor-label">Outside Humidity</span>
                  <span class="sensor-value">${this.config.outer_humidity_entity ? (this.hass.states[this.config.outer_humidity_entity]?.state || 'N/A') : 'N/A'}%</span>
                </div>
              </div>
              ${this.config.vpd?.enabled ? (() => {
                const vpdData = this.calculateVPD();
                return html`
                  <div class="vpd-section">
                    <h4>VPD Status</h4>
                    <div class="vpd-indicator" style="background: ${vpdData.color}">
                      <span class="vpd-value">${vpdData.vpd.toFixed(2)} kPa</span>
                      <span class="vpd-phase">${vpdData.phase}</span>
                    </div>
                  </div>
                `;
              })() : ''}
            </div>
          </div>
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

      .card-content {
        padding: 16px;
      }

      .grow-tent-schema {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }

      /* Main Tent Container */
      .tent-container {
        background: linear-gradient(145deg, #ffffff 0%, #f1f3f4 100%);
        border-radius: 12px;
        padding: 20px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        position: relative;
        overflow: visible;
      }

      .tent-frame {
        position: relative;
        width: 100%;
        height: 450px;
        border: 4px solid #333;
        border-radius: 8px;
        overflow: visible;
        background: #f0f0f0;
      }

      .tent-background {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, #e8f5e8 0%, #f0f8f0 50%, #e8f5e8 100%);
        border-radius: 4px;
        opacity: 0.8;
      }

      /* Component Styling */
      .component {
        position: absolute;
        z-index: 10;
      }

      .component-circle {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border: 2px solid #333;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        position: relative;
      }

      .component-circle:hover {
        transform: scale(1.1);
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      }

      .component-circle.red { background: linear-gradient(145deg, #f44336, #d32f2f); color: white; }
      .component-circle.green { background: linear-gradient(145deg, #4caf50, #45a049); color: white; }
      .component-circle.blue { background: linear-gradient(145deg, #2196f3, #1976d2); color: white; }
      .component-circle.gray { background: linear-gradient(145deg, #9e9e9e, #757575); color: white; }

      .component-number {
        position: absolute;
        top: -8px;
        right: -8px;
        width: 20px;
        height: 20px;
        background: #007acc;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        font-weight: bold;
        border: 2px solid white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
      }

      .component-icon {
        font-size: 18px;
        margin-bottom: 2px;
      }

      /* Components Row Layout */
      .components-row {
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-top: 20px;
        padding: 15px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 8px;
        flex-wrap: wrap;
        gap: 10px;
      }

      /* Reset component positioning for row layout */
      .extractor-pos, .filter-pos, .thermo-pos, .ballast-pos, 
      .intake-pos, .ventilator-pos, .thermostat-pos {
        position: static;
        transform: none;
      }

      /* Plants Area */
      .plants-area {
        position: absolute;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 3;
      }

      .plant-positions {
        display: flex;
        gap: 20px;
        align-items: end;
      }

      .plant-pot {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 35px;
        height: 40px;
        background: linear-gradient(145deg, #8d6e63, #6d4c41);
        border-radius: 0 0 18px 18px;
        border: 2px solid #5d4037;
        position: relative;
        cursor: pointer;
        transition: all 0.3s ease;
        justify-content: center;
      }

      .plant-pot:hover {
        transform: translateY(-3px);
      }

      .plant-pot.empty {
        background: linear-gradient(145deg, #bdbdbd, #9e9e9e);
        border-color: #757575;
      }

      .plant-pot.healthy {
        border-color: #4caf50;
        box-shadow: 0 0 10px rgba(76, 175, 80, 0.3);
      }

      .plant-pot.attention {
        border-color: #ff9800;
        box-shadow: 0 0 10px rgba(255, 152, 0, 0.3);
      }

      .plant-icon {
        font-size: 16px;
        margin-bottom: 2px;
      }

      .plant-pot span {
        color: white;
        font-size: 10px;
        font-weight: bold;
      }

      /* Camera Overlay */
      .camera-overlay {
        position: absolute;
        top: 10px;
        right: 10px;
        width: 120px;
        height: 90px;
        border-radius: 8px;
        overflow: hidden;
        border: 2px solid #333;
        z-index: 8;
      }

      .camera-feed {
        width: 100%;
        height: 100%;
      }

      .camera-feed ha-camera-stream {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      /* Legend Panel */
      .legend-panel {
        background: var(--ha-card-background, var(--card-background-color, white));
        border-radius: 8px;
        padding: 16px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      }

      .legend-panel h3 {
        margin: 0 0 12px 0;
        color: var(--primary-text-color);
        font-size: 16px;
        font-weight: 500;
      }

      .legend-items {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 8px;
      }

      .legend-item {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 4px;
      }

      .legend-number {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 20px;
        height: 20px;
        background: #007acc;
        color: white;
        border-radius: 50%;
        font-size: 12px;
        font-weight: bold;
        flex-shrink: 0;
      }

      .legend-text {
        flex: 1;
        font-size: 14px;
        color: var(--primary-text-color);
      }

      .status-indicator {
        font-size: 12px;
        font-weight: bold;
        padding: 2px 6px;
        border-radius: 10px;
        min-width: 16px;
        text-align: center;
        flex-shrink: 0;
      }

      .status-indicator.on {
        background: #4caf50;
        color: white;
      }

      .status-indicator.off {
        background: #f44336;
        color: white;
      }

      .status-indicator.unknown {
        background: #9e9e9e;
        color: white;
      }

      .status-indicator.passive {
        background: #e0e0e0;
        color: #666;
      }

      /* Sensor Panel */
      .sensor-panel {
        background: var(--ha-card-background, var(--card-background-color, white));
        border-radius: 8px;
        padding: 16px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      }

      .sensor-panel h3 {
        margin: 0 0 12px 0;
        color: var(--primary-text-color);
        font-size: 16px;
        font-weight: 500;
      }

      .sensor-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
        margin-bottom: 8px;
      }

      .sensor-item {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }

      .sensor-label {
        font-size: 12px;
        color: var(--secondary-text-color);
        font-weight: 500;
      }

      .sensor-value {
        font-size: 18px;
        font-weight: 600;
        color: var(--primary-text-color);
      }

      /* VPD Section */
      .vpd-section {
        margin-top: 16px;
        padding-top: 16px;
        border-top: 1px solid var(--divider-color);
      }

      .vpd-section h4 {
        margin: 0 0 8px 0;
        color: var(--primary-text-color);
        font-size: 14px;
        font-weight: 500;
      }

      .vpd-indicator {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 12px;
        border-radius: 8px;
        color: white;
        text-align: center;
      }

      .vpd-value {
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 4px;
      }

      .vpd-phase {
        font-size: 14px;
        font-weight: 500;
        opacity: 0.9;
      }

      /* Responsive Design */
      @media (max-width: 600px) {
        .legend-items {
          grid-template-columns: 1fr;
        }

        .sensor-row {
          grid-template-columns: 1fr;
        }

        .tent-frame {
          height: 300px;
        }

        .components-row {
          flex-direction: column;
          gap: 8px;
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