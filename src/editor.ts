import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant, fireEvent, LovelaceCardEditor } from 'custom-card-helpers';

import { GrowBoxCardConfig } from './types';

@customElement('ha-grow-box-card-editor')
export class GrowBoxCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: GrowBoxCardConfig;

  public setConfig(config: GrowBoxCardConfig): void {
    this._config = { ...config };
  }

  get _name(): string {
    return this._config?.name || '';
  }

  get _inner_temp_entity(): string {
    return this._config?.inner_temp_entity || '';
  }

  get _inner_humidity_entity(): string {
    return this._config?.inner_humidity_entity || '';
  }

  get _outer_temp_entity(): string {
    return this._config?.outer_temp_entity || '';
  }

  get _outer_humidity_entity(): string {
    return this._config?.outer_humidity_entity || '';
  }

  get _leaf_temp_entity(): string {
    return this._config?.leaf_temp_entity || '';
  }

  get _light_entity(): string {
    return this._config?.light_entity || '';
  }

  get _heating_entity(): string {
    return this._config?.heating_entity || '';
  }

  get _ventilation_entity(): string {
    return this._config?.ventilation_entity || '';
  }

  get _camera_entity(): string {
    return this._config?.camera_entity || '';
  }

  protected render() {
    if (!this.hass || !this._config) {
      return html``;
    }

    const entityOptions = Object.keys(this.hass.states).map(entity => ({
      value: entity,
      label: `${entity} (${this.hass.states[entity].attributes.friendly_name || entity})`
    }));

    return html`
      <div class="card-config">
        <h3>Basic Configuration</h3>
        
        <paper-input
          label="Name (Optional)"
          .value=${this._name}
          .configValue=${'name'}
          @value-changed=${this._valueChanged}
        ></paper-input>

        <h3>Environmental Sensors</h3>
        
        <ha-entity-picker
          label="Inner Temperature Entity"
          .hass=${this.hass}
          .value=${this._inner_temp_entity}
          .configValue=${'inner_temp_entity'}
          @value-changed=${this._valueChanged}
          .includeDomains=${['sensor']}
          allow-custom-entity
        ></ha-entity-picker>

        <ha-entity-picker
          label="Inner Humidity Entity"
          .hass=${this.hass}
          .value=${this._inner_humidity_entity}
          .configValue=${'inner_humidity_entity'}
          @value-changed=${this._valueChanged}
          .includeDomains=${['sensor']}
          allow-custom-entity
        ></ha-entity-picker>

        <ha-entity-picker
          label="Outer Temperature Entity"
          .hass=${this.hass}
          .value=${this._outer_temp_entity}
          .configValue=${'outer_temp_entity'}
          @value-changed=${this._valueChanged}
          .includeDomains=${['sensor']}
          allow-custom-entity
        ></ha-entity-picker>

        <ha-entity-picker
          label="Outer Humidity Entity"
          .hass=${this.hass}
          .value=${this._outer_humidity_entity}
          .configValue=${'outer_humidity_entity'}
          @value-changed=${this._valueChanged}
          .includeDomains=${['sensor']}
          allow-custom-entity
        ></ha-entity-picker>

        <ha-entity-picker
          label="Leaf Temperature Entity"
          .hass=${this.hass}
          .value=${this._leaf_temp_entity}
          .configValue=${'leaf_temp_entity'}
          @value-changed=${this._valueChanged}
          .includeDomains=${['sensor']}
          allow-custom-entity
        ></ha-entity-picker>

        <h3>Control Entities</h3>

        <ha-entity-picker
          label="Light Entity"
          .hass=${this.hass}
          .value=${this._light_entity}
          .configValue=${'light_entity'}
          @value-changed=${this._valueChanged}
          .includeDomains=${['light', 'switch']}
          allow-custom-entity
        ></ha-entity-picker>

        <ha-entity-picker
          label="Heating Entity"
          .hass=${this.hass}
          .value=${this._heating_entity}
          .configValue=${'heating_entity'}
          @value-changed=${this._valueChanged}
          .includeDomains=${['switch', 'climate']}
          allow-custom-entity
        ></ha-entity-picker>

        <ha-entity-picker
          label="Ventilation Entity"
          .hass=${this.hass}
          .value=${this._ventilation_entity}
          .configValue=${'ventilation_entity'}
          @value-changed=${this._valueChanged}
          .includeDomains=${['fan', 'switch']}
          allow-custom-entity
        ></ha-entity-picker>

        <h3>Camera</h3>

        <ha-entity-picker
          label="Camera Entity"
          .hass=${this.hass}
          .value=${this._camera_entity}
          .configValue=${'camera_entity'}
          @value-changed=${this._valueChanged}
          .includeDomains=${['camera']}
          allow-custom-entity
        ></ha-entity-picker>

        <h3>Vents Configuration</h3>
        ${this.renderVentConfiguration()}

        <h3>Plants Configuration</h3>
        ${this.renderPlantConfiguration()}

        <h3>VPD Configuration</h3>
        <ha-formfield label="Enable VPD Calculation">
          <ha-checkbox
            .checked=${this._config.vpd_calculation?.enabled !== false}
            .configValue=${'vpd_enabled'}
            @change=${this._vpdEnabledChanged}
          ></ha-checkbox>
        </ha-formfield>
      </div>
    `;
  }

  private renderVentConfiguration() {
    const vents = this._config.vents || [];
    
    return html`
      <div class="vents-config">
        ${vents.map((vent, index) => html`
          <div class="vent-config">
            <paper-input
              label="Vent Name"
              .value=${vent.name}
              @value-changed=${(ev: any) => this._ventChanged(index, 'name', ev.detail.value)}
            ></paper-input>
            
            <ha-entity-picker
              label="Vent Entity"
              .hass=${this.hass}
              .value=${vent.entity}
              @value-changed=${(ev: any) => this._ventChanged(index, 'entity', ev.detail.value)}
              .includeDomains=${['cover', 'switch']}
              allow-custom-entity
            ></ha-entity-picker>

            <paper-dropdown-menu label="Position">
              <paper-listbox
                slot="dropdown-content"
                .selected=${['top', 'side', 'bottom'].indexOf(vent.position || 'side')}
                @selected-changed=${(ev: any) => this._ventChanged(index, 'position', ['top', 'side', 'bottom'][ev.detail.value])}
              >
                <paper-item>Top</paper-item>
                <paper-item>Side</paper-item>
                <paper-item>Bottom</paper-item>
              </paper-listbox>
            </paper-dropdown-menu>

            <mwc-button @click=${() => this._removeVent(index)}>Remove Vent</mwc-button>
          </div>
        `)}
        
        <mwc-button @click=${this._addVent}>Add Vent</mwc-button>
      </div>
    `;
  }

  private renderPlantConfiguration() {
    const plants = this._config.plants || [];
    
    return html`
      <div class="plants-config">
        ${plants.map((plant, index) => html`
          <div class="plant-config">
            <paper-input
              label="Plant Name"
              .value=${plant.name}
              @value-changed=${(ev: any) => this._plantChanged(index, 'name', ev.detail.value)}
            ></paper-input>
            
            <ha-entity-picker
              label="Plant Entity"
              .hass=${this.hass}
              .value=${plant.entity}
              @value-changed=${(ev: any) => this._plantChanged(index, 'entity', ev.detail.value)}
              .includeDomains=${['plant', 'sensor']}
              allow-custom-entity
            ></ha-entity-picker>

            <paper-input
              label="Position (1-4)"
              type="number"
              min="1"
              max="4"
              .value=${plant.position || 1}
              @value-changed=${(ev: any) => this._plantChanged(index, 'position', parseInt(ev.detail.value))}
            ></paper-input>

            <mwc-button @click=${() => this._removePlant(index)}>Remove Plant</mwc-button>
          </div>
        `)}
        
        <mwc-button @click=${this._addPlant}>Add Plant</mwc-button>
      </div>
    `;
  }

  private _valueChanged(ev: any): void {
    if (!this._config || !this.hass) {
      return;
    }

    const target = ev.target;
    const configValue = target.configValue;
    const value = target.value;

    if ((this as any)[`_${configValue}`] === value) {
      return;
    }

    const newConfig = {
      ...this._config,
      [configValue]: value,
    };

    fireEvent(this, 'config-changed', { config: newConfig });
  }

  private _vpdEnabledChanged(ev: any): void {
    const value = ev.target.checked;
    const newConfig = {
      ...this._config,
      vpd_calculation: {
        ...this._config.vpd_calculation,
        enabled: value
      }
    };

    fireEvent(this, 'config-changed', { config: newConfig });
  }

  private _ventChanged(index: number, field: string, value: any): void {
    const vents = [...(this._config.vents || [])];
    vents[index] = { ...vents[index], [field]: value };

    const newConfig = {
      ...this._config,
      vents
    };

    fireEvent(this, 'config-changed', { config: newConfig });
  }

  private _addVent(): void {
    const vents = [...(this._config.vents || [])];
    vents.push({ name: 'New Vent', entity: '', position: 'side' });

    const newConfig = {
      ...this._config,
      vents
    };

    fireEvent(this, 'config-changed', { config: newConfig });
  }

  private _removeVent(index: number): void {
    const vents = [...(this._config.vents || [])];
    vents.splice(index, 1);

    const newConfig = {
      ...this._config,
      vents
    };

    fireEvent(this, 'config-changed', { config: newConfig });
  }

  private _plantChanged(index: number, field: string, value: any): void {
    const plants = [...(this._config.plants || [])];
    plants[index] = { ...plants[index], [field]: value };

    const newConfig = {
      ...this._config,
      plants
    };

    fireEvent(this, 'config-changed', { config: newConfig });
  }

  private _addPlant(): void {
    const plants = [...(this._config.plants || [])];
    const nextPosition = Math.max(0, ...plants.map(p => p.position || 0)) + 1;
    
    plants.push({ 
      name: `Plant ${nextPosition}`, 
      entity: '', 
      position: Math.min(4, nextPosition)
    });

    const newConfig = {
      ...this._config,
      plants
    };

    fireEvent(this, 'config-changed', { config: newConfig });
  }

  private _removePlant(index: number): void {
    const plants = [...(this._config.plants || [])];
    plants.splice(index, 1);

    const newConfig = {
      ...this._config,
      plants
    };

    fireEvent(this, 'config-changed', { config: newConfig });
  }

  static get styles() {
    return css`
      .card-config {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      h3 {
        margin: 16px 0 8px 0;
        color: var(--primary-color);
        border-bottom: 1px solid var(--divider-color);
        padding-bottom: 4px;
      }

      .vents-config,
      .plants-config {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .vent-config,
      .plant-config {
        padding: 16px;
        border: 1px solid var(--divider-color);
        border-radius: 8px;
        background: var(--card-background-color);
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      paper-input,
      ha-entity-picker,
      paper-dropdown-menu {
        width: 100%;
      }

      mwc-button {
        margin-top: 8px;
        align-self: flex-start;
      }

      ha-formfield {
        margin: 8px 0;
      }
    `;
  }
}