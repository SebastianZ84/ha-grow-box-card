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
    if (!this.config.plants?.length) return html``;

    return html`
      <div class="plants">
        <h3>Plants</h3>
        <div class="plant-grid">
          ${this.config.plants.map(plant => this.renderPlant(plant))}
        </div>
      </div>
    `;
  }

  private renderPlant(plant: any) {
    const state = this.hass.states[plant.entity];
    if (!state) return html`<div class="plant unavailable">${plant.name}</div>`;

    return html`
      <div class="plant" data-position="${plant.position}">
        <div class="plant-name">${plant.name}</div>
        <div class="plant-state">${state.state}</div>
        <div class="plant-attributes">
          ${Object.entries(state.attributes || {}).map(([key, value]) => 
            html`<div class="attribute"><span class="key">${key}:</span> <span class="value">${value}</span></div>`
          )}
        </div>
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

  protected render() {
    if (!this.config || !this.hass) {
      return html``;
    }

    return html`
      <ha-card .header=${this.config.name}>
        <div class="card-content">
          <div class="grow-tent-layout">
            <div class="tent-visual">
              <div class="tent-frame">
                <div class="tent-interior">
                  ${this.renderPlants()}
                  ${this.renderCamera()}
                </div>
              </div>
            </div>
            
            <div class="monitoring-panel">
              ${this.renderEnvironmentalSensors()}
              ${this.renderVPD()}
              ${this.renderControls()}
            </div>
          </div>
        </div>
      </ha-card>
    `;
  }

  static get styles() {
    return css`
      ha-card {
        padding: 16px;
      }

      .card-content {
        padding: 0;
      }

      .grow-tent-layout {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
        min-height: 400px;
      }

      .tent-visual {
        border: 2px solid #333;
        border-radius: 8px;
        padding: 10px;
        background: linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%);
        position: relative;
      }

      .tent-frame {
        border: 3px solid #666;
        border-radius: 4px;
        height: 100%;
        background: linear-gradient(45deg, #2a2a2a 25%, transparent 25%), 
                    linear-gradient(-45deg, #2a2a2a 25%, transparent 25%), 
                    linear-gradient(45deg, transparent 75%, #2a2a2a 75%), 
                    linear-gradient(-45deg, transparent 75%, #2a2a2a 75%);
        background-size: 20px 20px;
        background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
      }

      .tent-interior {
        background: rgba(0, 0, 0, 0.1);
        height: 100%;
        border-radius: 2px;
        padding: 10px;
        position: relative;
      }

      .monitoring-panel {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .environmental-sensors {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
      }

      .sensor-group h3 {
        margin: 0 0 8px 0;
        font-size: 14px;
        color: var(--primary-color);
      }

      .sensors {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .sensor {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px;
        border-radius: 4px;
        background: var(--card-background-color);
        border: 1px solid var(--divider-color);
      }

      .sensor.temperature { border-left: 4px solid #ff6b6b; }
      .sensor.humidity { border-left: 4px solid #4ecdc4; }
      .sensor.leaf-temperature { border-left: 4px solid #45b7d1; }

      .sensor.unavailable {
        opacity: 0.5;
        border-left: 4px solid #ccc;
      }

      .sensor .value {
        font-weight: bold;
        font-size: 18px;
      }

      .sensor .unit {
        font-size: 12px;
        color: var(--secondary-text-color);
      }

      .sensor .name {
        font-size: 12px;
        color: var(--secondary-text-color);
        margin-left: auto;
      }

      .vpd-display {
        text-align: center;
        padding: 16px;
        border-radius: 8px;
        background: var(--card-background-color);
        border: 2px solid var(--vpd-color, #ccc);
      }

      .vpd-display h3 {
        margin: 0 0 8px 0;
        color: var(--primary-color);
      }

      .vpd-value {
        font-size: 24px;
        font-weight: bold;
        color: var(--vpd-color, #333);
      }

      .vpd-phase {
        font-size: 14px;
        color: var(--secondary-text-color);
        margin-top: 4px;
      }

      .controls h3 {
        margin: 0 0 12px 0;
        color: var(--primary-color);
      }

      .control-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
        gap: 8px;
        margin-bottom: 16px;
      }

      .control {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 12px;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease;
        background: var(--card-background-color);
        border: 2px solid var(--divider-color);
      }

      .control.on {
        border-color: var(--primary-color);
        background: var(--primary-color);
        color: white;
      }

      .control.off {
        border-color: #ccc;
      }

      .control.unavailable {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .control:hover:not(.unavailable) {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
      }

      .control-icon {
        width: 24px;
        height: 24px;
        margin-bottom: 8px;
      }

      .control-icon.lightbulb::before { content: '💡'; }
      .control-icon.radiator::before { content: '🔥'; }
      .control-icon.fan::before { content: '💨'; }

      .control-name {
        font-size: 12px;
        font-weight: bold;
      }

      .control-state {
        font-size: 10px;
        opacity: 0.8;
        margin-top: 2px;
      }

      .vents h4 {
        margin: 0 0 8px 0;
        font-size: 14px;
        color: var(--primary-color);
      }

      .vent-controls {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }

      .vent-control {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 6px 12px;
        border-radius: 16px;
        cursor: pointer;
        font-size: 12px;
        transition: all 0.3s ease;
      }

      .vent-control.open {
        background: #4caf50;
        color: white;
      }

      .vent-control.closed {
        background: #f44336;
        color: white;
      }

      .plants {
        margin-top: 16px;
      }

      .plants h3 {
        margin: 0 0 12px 0;
        color: var(--primary-color);
        font-size: 14px;
      }

      .plant-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 8px;
      }

      .plant {
        padding: 8px;
        border-radius: 4px;
        background: rgba(76, 175, 80, 0.1);
        border: 1px solid #4caf50;
        font-size: 12px;
      }

      .plant.unavailable {
        background: rgba(255, 255, 255, 0.1);
        border-color: #ccc;
        opacity: 0.5;
      }

      .plant-name {
        font-weight: bold;
        margin-bottom: 4px;
      }

      .plant-state {
        color: var(--primary-color);
        margin-bottom: 4px;
      }

      .plant-attributes {
        font-size: 10px;
        color: var(--secondary-text-color);
      }

      .attribute {
        margin-bottom: 2px;
      }

      .attribute .key {
        font-weight: bold;
      }

      .camera {
        margin-top: auto;
      }

      .camera h3 {
        margin: 0 0 8px 0;
        color: var(--primary-color);
        font-size: 14px;
      }

      ha-camera-stream {
        width: 100%;
        border-radius: 4px;
        overflow: hidden;
      }

      @media (max-width: 768px) {
        .grow-tent-layout {
          grid-template-columns: 1fr;
        }
        
        .environmental-sensors {
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