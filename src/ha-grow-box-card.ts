import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant, hasConfigOrEntityChanged, LovelaceCardEditor } from 'custom-card-helpers';

import { GrowBoxCardConfig } from './types';
import { VPDCalculator, VPDResult } from './utils/vpd-calculator';

@customElement('ha-grow-box-card')
export class GrowBoxCard extends LitElement {
  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    await import('./editor');
    return document.createElement('ha-grow-box-card-editor');
  }

  public static getStubConfig(): GrowBoxCardConfig {
    return {
      type: 'custom:ha-grow-box-card',
      name: 'Grow Tent',
      inner_temp_entity: 'sensor.grow_tent_temperature',
      inner_humidity_entity: 'sensor.grow_tent_humidity',
      outer_temp_entity: 'sensor.room_temperature',
      outer_humidity_entity: 'sensor.room_humidity',
      leaf_temp_entity: 'sensor.leaf_temperature',
      light_entity: 'light.grow_light',
      heating_entity: 'switch.grow_tent_heater',
      ventilation_entity: 'fan.grow_tent_exhaust',
      camera_entity: 'camera.grow_tent_cam',
      vents: [
        { name: 'Top Vent', entity: 'cover.top_vent', position: 'top' },
        { name: 'Side Vent', entity: 'cover.side_vent', position: 'side' }
      ],
      plants: [
        { name: 'Plant 1', entity: 'plant.cannabis_1', position: 1 },
        { name: 'Plant 2', entity: 'plant.cannabis_2', position: 2 }
      ],
      vpd_calculation: { enabled: true }
    };
  }

  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private config!: GrowBoxCardConfig;
  @state() private vpdResult?: VPDResult;

  public setConfig(config: GrowBoxCardConfig): void {
    if (!config) {
      throw new Error('Invalid configuration');
    }
    this.config = config;
  }

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    if (!this.config) {
      return false;
    }

    return hasConfigOrEntityChanged(this, changedProps, false);
  }

  protected willUpdate(changedProps: PropertyValues) {
    if (!this.hass || !this.config) return;

    // Calculate VPD if enabled and entities are available
    if (this.config.vpd_calculation?.enabled !== false) {
      this.updateVPD();
    }
  }

  private updateVPD() {
    const leafTempEntity = this.config.leaf_temp_entity;
    const innerTempEntity = this.config.inner_temp_entity;
    const innerHumidityEntity = this.config.inner_humidity_entity;

    if (!leafTempEntity || !innerTempEntity || !innerHumidityEntity) return;

    const leafTemp = parseFloat(this.hass.states[leafTempEntity]?.state);
    const airTemp = parseFloat(this.hass.states[innerTempEntity]?.state);
    const humidity = parseFloat(this.hass.states[innerHumidityEntity]?.state);

    if (isNaN(leafTemp) || isNaN(airTemp) || isNaN(humidity)) return;

    const vpd = VPDCalculator.calculateVPD(leafTemp, airTemp, humidity);
    this.vpdResult = VPDCalculator.getVPDPhase(vpd, this.config.vpd_calculation?.phases);
  }

  private renderEnvironmentalSensors() {
    return html`
      <div class="environmental-sensors">
        <div class="sensor-group">
          <h3>Inner Environment</h3>
          <div class="sensors">
            ${this.renderSensor(this.config.inner_temp_entity, '°C', 'temperature')}
            ${this.renderSensor(this.config.inner_humidity_entity, '%', 'humidity')}
            ${this.renderSensor(this.config.leaf_temp_entity, '°C', 'leaf-temperature')}
          </div>
        </div>
        <div class="sensor-group">
          <h3>Outer Environment</h3>
          <div class="sensors">
            ${this.renderSensor(this.config.outer_temp_entity, '°C', 'temperature')}
            ${this.renderSensor(this.config.outer_humidity_entity, '%', 'humidity')}
          </div>
        </div>
      </div>
    `;
  }

  private renderSensor(entityId?: string, unit?: string, type?: string) {
    if (!entityId || !this.hass.states[entityId]) {
      return html`<div class="sensor unavailable">N/A</div>`;
    }

    const state = this.hass.states[entityId];
    const value = parseFloat(state.state);
    const displayValue = isNaN(value) ? state.state : value.toFixed(1);

    return html`
      <div class="sensor ${type}">
        <span class="value">${displayValue}</span>
        <span class="unit">${unit}</span>
        <span class="name">${state.attributes.friendly_name || entityId}</span>
      </div>
    `;
  }

  private renderVPD() {
    if (!this.vpdResult || this.config.vpd_calculation?.enabled === false) {
      return html``;
    }

    return html`
      <div class="vpd-display" style="--vpd-color: ${this.vpdResult.color}">
        <h3>VPD Status</h3>
        <div class="vpd-value">${VPDCalculator.formatVPD(this.vpdResult.vpd)}</div>
        <div class="vpd-phase">${this.vpdResult.phase}</div>
      </div>
    `;
  }

  private renderControls() {
    return html`
      <div class="controls">
        <h3>Controls</h3>
        <div class="control-grid">
          ${this.renderControl(this.config.light_entity, 'Light', 'lightbulb')}
          ${this.renderControl(this.config.heating_entity, 'Heating', 'radiator')}
          ${this.renderControl(this.config.ventilation_entity, 'Ventilation', 'fan')}
        </div>
        ${this.renderVents()}
      </div>
    `;
  }

  private renderControl(entityId?: string, name?: string, icon?: string) {
    if (!entityId || !this.hass.states[entityId]) {
      return html`<div class="control unavailable">${name}: N/A</div>`;
    }

    const state = this.hass.states[entityId];
    const isOn = ['on', 'open', 'home'].includes(state.state.toLowerCase());

    return html`
      <div class="control ${isOn ? 'on' : 'off'}" @click=${() => this.toggleEntity(entityId)}>
        <div class="control-icon ${icon}"></div>
        <div class="control-name">${name}</div>
        <div class="control-state">${state.state}</div>
      </div>
    `;
  }

  private renderVents() {
    if (!this.config.vents?.length) return html``;

    return html`
      <div class="vents">
        <h4>Vents</h4>
        <div class="vent-controls">
          ${this.config.vents.map(vent => this.renderVentControl(vent))}
        </div>
      </div>
    `;
  }

  private renderVentControl(vent: any) {
    const state = this.hass.states[vent.entity];
    if (!state) return html`<div class="vent unavailable">${vent.name}: N/A</div>`;

    const isOpen = state.state === 'open';
    return html`
      <div class="vent-control ${isOpen ? 'open' : 'closed'}" @click=${() => this.toggleEntity(vent.entity)}>
        <span class="vent-name">${vent.name}</span>
        <span class="vent-state">${state.state}</span>
      </div>
    `;
  }

  private renderPlants() {
    if (!this.config.plants?.length) {
      return html`
        <div class="plant-pots">
          <div class="plant-pot empty"><span>1</span></div>
          <div class="plant-pot empty"><span>2</span></div>
          <div class="plant-pot empty"><span>3</span></div>
          <div class="plant-pot empty"><span>4</span></div>
        </div>
      `;
    }

    const plantsByPosition = new Map();
    this.config.plants.forEach(plant => {
      plantsByPosition.set(plant.position || 1, plant);
    });

    return html`
      <div class="plant-pots">
        ${[1, 2, 3, 4].map(position => {
          const plant = plantsByPosition.get(position);
          return this.renderPlantPot(plant, position);
        })}
      </div>
    `;
  }

  private renderPlantPot(plant: any, position: number) {
    if (!plant) {
      return html`
        <div class="plant-pot empty">
          <span class="pot-number">${position}</span>
        </div>
      `;
    }

    const state = this.hass.states[plant.entity];
    const hasState = !!state;
    const isHealthy = hasState && state.state === 'ok';

    return html`
      <div class="plant-pot ${hasState ? (isHealthy ? 'healthy' : 'attention') : 'unavailable'}" 
           title="${plant.name}${hasState ? ` - ${state.state}` : ' - No data'}">
        <div class="plant-visual">
          <div class="plant-leaves ${isHealthy ? 'green' : 'yellow'}"></div>
          <div class="plant-stem"></div>
        </div>
        <div class="pot-base">
          <span class="pot-number">${position}</span>
        </div>
        <div class="plant-name">${plant.name}</div>
      </div>
    `;
  }

  private renderCamera() {
    if (!this.config.camera_entity) return html``;

    return html`
      <div class="camera">
        <h3>Live View</h3>
        <ha-camera-stream
          .hass=${this.hass}
          .stateObj=${this.hass.states[this.config.camera_entity]}
          allow-exoplayer
        ></ha-camera-stream>
      </div>
    `;
  }

  private toggleEntity(entityId: string) {
    const domain = entityId.split('.')[0];
    const service = this.hass.states[entityId]?.state === 'on' ? 'turn_off' : 'turn_on';
    
    this.hass.callService(domain, service, { entity_id: entityId });
  }

  private renderComponent(type: string, name: string, entityId: string | undefined, number: number, position: string) {
    const entity = entityId ? this.hass.states[entityId] : null;
    const isOn = entity ? ['on', 'open', 'home'].includes(entity.state.toLowerCase()) : false;
    const isClickable = !!entityId;

    return html`
      <div 
        class="component ${type} ${position} ${isOn ? 'active' : 'inactive'} ${isClickable ? 'clickable' : ''}"
        @click=${isClickable ? () => this.toggleEntity(entityId!) : null}
        title="${name}${entity ? ` (${entity.state})` : ''}"
      >
        <div class="component-number">${number}</div>
        <div class="component-icon ${type}"></div>
      </div>
    `;
  }

  private renderStatusIndicator(entityId: string | undefined) {
    if (!entityId || !this.hass.states[entityId]) {
      return html`<span class="status-indicator unavailable">N/A</span>`;
    }

    const entity = this.hass.states[entityId];
    const isOn = ['on', 'open', 'home'].includes(entity.state.toLowerCase());

    return html`
      <span class="status-indicator ${isOn ? 'on' : 'off'}" @click=${() => this.toggleEntity(entityId)}>
        ${entity.state}
      </span>
    `;
  }

  private renderSensorValue(entityId: string | undefined, unit: string) {
    if (!entityId || !this.hass.states[entityId]) {
      return html`<span class="sensor-value unavailable">--</span>`;
    }

    const entity = this.hass.states[entityId];
    const value = parseFloat(entity.state);
    const displayValue = isNaN(value) ? entity.state : value.toFixed(1);

    return html`
      <span class="sensor-value">${displayValue}${unit}</span>
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
                
                <!-- Top Components -->
                <div class="component-group top">
                  ${this.renderComponent('extractor', 'Extractor', this.config.ventilation_entity, 1, 'top-left')}
                  ${this.renderComponent('filter', 'Carbon Filter', null, 2, 'top-center')}
                  ${this.renderComponent('thermo', 'Temp/Humidity', this.config.inner_temp_entity, 9, 'top-right')}
                </div>

                <!-- Reflector and Light -->
                <div class="reflector-assembly">
                  <div class="reflector">
                    <div class="component-number">3</div>
                    <div class="reflector-body">
                      ${this.renderComponent('light-bulb', 'Growth Light', this.config.light_entity, 4, 'light-position')}
                    </div>
                  </div>
                  <div class="light-beam"></div>
                </div>

                <!-- Side Components -->
                <div class="component-group left">
                  ${this.renderComponent('ballast', 'Ballast', this.config.heating_entity, 5, 'left-side')}
                </div>

                <div class="component-group right">
                  ${this.renderComponent('thermostat', 'Thermostat', null, 8, 'right-side')}
                  ${this.renderComponent('fan', 'Ventilator', null, 7, 'right-bottom')}
                </div>

                <!-- Bottom Components -->
                <div class="component-group bottom">
                  ${this.renderComponent('intake', 'Intake Fan', null, 6, 'bottom-right')}
                </div>

                <!-- Plants Area -->
                <div class="plants-area">
                  ${this.renderPlants()}
                </div>

                <!-- Camera if configured -->
                ${this.config.camera_entity ? html`
                  <div class="camera-view">
                    <ha-camera-stream
                      .hass=${this.hass}
                      .stateObj=${this.hass.states[this.config.camera_entity]}
                      allow-exoplayer
                    ></ha-camera-stream>
                  </div>
                ` : ''}
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
                </div>
                <div class="legend-item">
                  <span class="legend-number">3</span>
                  <span class="legend-text">Reflector</span>
                </div>
                <div class="legend-item">
                  <span class="legend-number">4</span>
                  <span class="legend-text">Growth Light</span>
                  ${this.renderStatusIndicator(this.config.light_entity)}
                </div>
                <div class="legend-item">
                  <span class="legend-number">5</span>
                  <span class="legend-text">Ballast</span>
                  ${this.renderStatusIndicator(this.config.heating_entity)}
                </div>
                <div class="legend-item">
                  <span class="legend-number">6</span>
                  <span class="legend-text">Intake Fan</span>
                </div>
                <div class="legend-item">
                  <span class="legend-number">7</span>
                  <span class="legend-text">Ventilator</span>
                </div>
                <div class="legend-item">
                  <span class="legend-number">8</span>
                  <span class="legend-text">Thermostat</span>
                </div>
                <div class="legend-item">
                  <span class="legend-number">9</span>
                  <span class="legend-text">Temp/Humidity</span>
                  ${this.renderSensorValue(this.config.inner_temp_entity, '°C')}
                  ${this.renderSensorValue(this.config.inner_humidity_entity, '%')}
                </div>
              </div>

              <!-- VPD Display -->
              ${this.renderVPD()}

              <!-- Environmental Data -->
              <div class="environmental-data">
                <h4>Environment</h4>
                <div class="env-grid">
                  <div class="env-item">
                    <span class="env-label">Inner Temp</span>
                    ${this.renderSensorValue(this.config.inner_temp_entity, '°C')}
                  </div>
                  <div class="env-item">
                    <span class="env-label">Inner Humidity</span>
                    ${this.renderSensorValue(this.config.inner_humidity_entity, '%')}
                  </div>
                  <div class="env-item">
                    <span class="env-label">Leaf Temp</span>
                    ${this.renderSensorValue(this.config.leaf_temp_entity, '°C')}
                  </div>
                  <div class="env-item">
                    <span class="env-label">Outer Temp</span>
                    ${this.renderSensorValue(this.config.outer_temp_entity, '°C')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ha-card>
    `;
  }

  static get styles() {
    return css`
      ha-card {
        padding: 0;
        background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
      }

      .card-content {
        padding: 20px;
      }

      .grow-tent-schema {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 24px;
        min-height: 500px;
      }

      /* Main Tent Container */
      .tent-container {
        background: linear-gradient(145deg, #ffffff 0%, #f1f3f4 100%);
        border-radius: 12px;
        padding: 20px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        position: relative;
        overflow: hidden;
      }

      .tent-frame {
        position: relative;
        width: 100%;
        height: 100%;
        min-height: 450px;
        background: linear-gradient(to bottom, #e8e8e8 0%, #d0d0d0 100%);
        border: 4px solid #333;
        border-radius: 8px;
        box-shadow: inset 0 0 20px rgba(0,0,0,0.2);
      }

      /* Component Groups */
      .component-group {
        position: absolute;
        display: flex;
        gap: 10px;
      }

      .component-group.top {
        top: -30px;
        left: 20px;
        right: 20px;
        justify-content: space-between;
        align-items: center;
      }

      .component-group.left {
        left: -30px;
        top: 50%;
        transform: translateY(-50%);
        flex-direction: column;
      }

      .component-group.right {
        right: -30px;
        top: 40%;
        transform: translateY(-50%);
        flex-direction: column;
      }

      .component-group.bottom {
        bottom: -30px;
        right: 60px;
      }

      /* Components */
      .component {
        position: relative;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(145deg, #f0f0f0, #d0d0d0);
        border: 2px solid #666;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
      }

      .component.clickable:hover {
        transform: scale(1.1);
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      }

      .component.active {
        background: linear-gradient(145deg, #4caf50, #45a049);
        border-color: #2e7d32;
        color: white;
      }

      .component.inactive {
        background: linear-gradient(145deg, #f44336, #d32f2f);
        border-color: #c62828;
        color: white;
      }

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

      /* Component Icons */
      .component-icon {
        font-size: 20px;
      }

      .component-icon.extractor::before { content: '🌪️'; }
      .component-icon.filter::before { content: '🔰'; }
      .component-icon.thermo::before { content: '🌡️'; }
      .component-icon.light-bulb::before { content: '💡'; }
      .component-icon.ballast::before { content: '⚡'; }
      .component-icon.intake::before { content: '🌬️'; }
      .component-icon.fan::before { content: '🌀'; }
      .component-icon.thermostat::before { content: '🎛️'; }

      /* Reflector Assembly */
      .reflector-assembly {
        position: absolute;
        top: 60px;
        left: 50%;
        transform: translateX(-50%);
        width: 200px;
        height: 80px;
      }

      .reflector {
        position: relative;
        width: 100%;
        height: 40px;
        background: linear-gradient(145deg, #e0e0e0, #c0c0c0);
        border: 2px solid #888;
        border-radius: 20px 20px 5px 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
      }

      .reflector-body {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .light-beam {
        position: absolute;
        top: 40px;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 0;
        border-left: 80px solid transparent;
        border-right: 80px solid transparent;
        border-top: 100px solid rgba(255, 255, 0, 0.3);
        z-index: 1;
      }

      /* Plants Area */
      .plants-area {
        position: absolute;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 2;
      }

      .plant-pots {
        display: flex;
        gap: 15px;
        align-items: end;
      }

      .plant-pot {
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .plant-pot:hover {
        transform: translateY(-2px);
      }

      .plant-visual {
        position: relative;
        margin-bottom: 5px;
      }

      .plant-leaves {
        width: 30px;
        height: 30px;
        border-radius: 50% 0;
        transform: rotate(-45deg);
        margin-bottom: -10px;
        z-index: 1;
        position: relative;
      }

      .plant-leaves.green {
        background: linear-gradient(45deg, #4caf50, #66bb6a);
        box-shadow: 0 2px 4px rgba(76, 175, 80, 0.3);
      }

      .plant-leaves.yellow {
        background: linear-gradient(45deg, #ffc107, #ffeb3b);
        box-shadow: 0 2px 4px rgba(255, 193, 7, 0.3);
      }

      .plant-stem {
        width: 4px;
        height: 20px;
        background: #8bc34a;
        margin: 0 auto;
        border-radius: 2px;
      }

      .pot-base {
        width: 40px;
        height: 30px;
        background: linear-gradient(145deg, #8d6e63, #6d4c41);
        border-radius: 0 0 20px 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        position: relative;
      }

      .pot-number {
        color: white;
        font-size: 12px;
        font-weight: bold;
      }

      .plant-name {
        font-size: 10px;
        margin-top: 4px;
        text-align: center;
        color: var(--primary-text-color);
        font-weight: 500;
      }

      .plant-pot.empty .pot-base {
        background: linear-gradient(145deg, #bdbdbd, #9e9e9e);
      }

      .plant-pot.healthy .pot-base {
        border: 2px solid #4caf50;
      }

      .plant-pot.attention .pot-base {
        border: 2px solid #ff9800;
      }

      .plant-pot.unavailable .pot-base {
        border: 2px solid #f44336;
      }

      /* Camera View */
      .camera-view {
        position: absolute;
        top: 20px;
        right: 20px;
        width: 120px;
        height: 90px;
        border-radius: 8px;
        overflow: hidden;
        border: 2px solid #333;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      }

      /* Legend Panel */
      .legend-panel {
        background: white;
        border-radius: 12px;
        padding: 20px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        height: fit-content;
      }

      .legend-panel h3 {
        margin: 0 0 16px 0;
        color: var(--primary-color);
        font-size: 18px;
        border-bottom: 2px solid var(--primary-color);
        padding-bottom: 8px;
      }

      .legend-items {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .legend-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 8px;
        border-radius: 6px;
        background: rgba(0, 122, 204, 0.05);
        transition: all 0.2s ease;
      }

      .legend-item:hover {
        background: rgba(0, 122, 204, 0.1);
      }

      .legend-number {
        width: 24px;
        height: 24px;
        background: #007acc;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        font-weight: bold;
        flex-shrink: 0;
      }

      .legend-text {
        flex: 1;
        font-size: 14px;
        color: var(--primary-text-color);
        font-weight: 500;
      }

      .status-indicator {
        padding: 4px 8px;
        border-radius: 12px;
        font-size: 11px;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .status-indicator.on {
        background: #4caf50;
        color: white;
      }

      .status-indicator.off {
        background: #f44336;
        color: white;
      }

      .status-indicator.unavailable {
        background: #9e9e9e;
        color: white;
      }

      .sensor-value {
        font-size: 13px;
        font-weight: bold;
        color: var(--primary-color);
      }

      .sensor-value.unavailable {
        color: #9e9e9e;
      }

      /* VPD Display */
      .vpd-display {
        margin: 20px 0;
        text-align: center;
        padding: 16px;
        border-radius: 8px;
        background: linear-gradient(145deg, var(--vpd-color, #e0e0e0), rgba(255,255,255,0.1));
        border: 2px solid var(--vpd-color, #ccc);
      }

      .vpd-display h3 {
        margin: 0 0 8px 0;
        color: var(--primary-color);
        border: none;
        padding: 0;
      }

      .vpd-value {
        font-size: 20px;
        font-weight: bold;
        color: var(--vpd-color, #333);
      }

      .vpd-phase {
        font-size: 12px;
        margin-top: 4px;
        opacity: 0.8;
      }

      /* Environmental Data */
      .environmental-data {
        margin-top: 20px;
      }

      .environmental-data h4 {
        margin: 0 0 12px 0;
        color: var(--primary-color);
        font-size: 14px;
      }

      .env-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 8px;
      }

      .env-item {
        display: flex;
        flex-direction: column;
        gap: 4px;
        padding: 8px;
        background: rgba(0, 122, 204, 0.05);
        border-radius: 4px;
      }

      .env-label {
        font-size: 11px;
        color: var(--secondary-text-color);
        text-transform: uppercase;
        font-weight: 600;
      }

      /* Responsive Design */
      @media (max-width: 768px) {
        .grow-tent-schema {
          grid-template-columns: 1fr;
          gap: 16px;
        }
        
        .tent-container {
          min-height: 350px;
        }

        .component {
          width: 40px;
          height: 40px;
        }

        .reflector-assembly {
          width: 150px;
          height: 60px;
        }

        .light-beam {
          border-left-width: 60px;
          border-right-width: 60px;
          border-top-width: 80px;
        }

        .env-grid {
          grid-template-columns: 1fr;
        }
      }
    `;
  }
}

// Register the card
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: 'ha-grow-box-card',
  name: 'Grow Box Card',
  description: 'A card for monitoring and controlling cannabis grow tents'
});

console.info(
  `%c  HA-GROW-BOX-CARD  %c  Version 1.0.0  `,
  'color: orange; font-weight: bold; background: black',
  'color: white; font-weight: bold; background: dimgray',
);