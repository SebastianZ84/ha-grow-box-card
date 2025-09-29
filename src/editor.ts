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

  protected render() {
    if (!this.hass || !this._config) {
      return html``;
    }

    // Get all entities and filter by domain
    const allEntities = Object.keys(this.hass.states);
    const sensorEntities = allEntities.filter(entity => entity.startsWith('sensor.'));
    const lightEntities = allEntities.filter(entity => entity.startsWith('light.') || entity.startsWith('switch.'));
    const fanEntities = allEntities.filter(entity => entity.startsWith('fan.') || entity.startsWith('switch.'));
    const coverEntities = allEntities.filter(entity => entity.startsWith('cover.') || entity.startsWith('switch.'));
    const cameraEntities = allEntities.filter(entity => entity.startsWith('camera.'));
    const plantEntities = allEntities.filter(entity => entity.startsWith('plant.') || entity.startsWith('sensor.'));

    return html`
      <div class="card-config">
        <h3>Basic Configuration</h3>
        
        <div class="form-group">
          <label for="name">Name (Optional)</label>
          <input
            id="name"
            type="text"
            .value=${this._name}
            @input=${(ev: any) => this._valueChanged('name', ev.target.value)}
            placeholder="Grow Tent"
          />
        </div>

        <h3>Environmental Sensors</h3>
        
        <div class="form-group">
          <label for="inner_temp">Inner Temperature Entity</label>
          <select
            id="inner_temp"
            @change=${(ev: any) => this._valueChanged('inner_temp_entity', ev.target.value)}
          >
            <option value="">Select entity...</option>
            ${sensorEntities.map(entity => html`
              <option 
                value=${entity} 
                ?selected=${entity === this._config.inner_temp_entity}
              >
                ${entity} (${this.hass.states[entity]?.attributes?.friendly_name || entity})
              </option>
            `)}
          </select>
        </div>

        <div class="form-group">
          <label for="inner_humidity">Inner Humidity Entity</label>
          <select
            id="inner_humidity"
            @change=${(ev: any) => this._valueChanged('inner_humidity_entity', ev.target.value)}
          >
            <option value="">Select entity...</option>
            ${sensorEntities.map(entity => html`
              <option 
                value=${entity} 
                ?selected=${entity === this._config.inner_humidity_entity}
              >
                ${entity} (${this.hass.states[entity]?.attributes?.friendly_name || entity})
              </option>
            `)}
          </select>
        </div>

        <div class="form-group">
          <label for="outer_temp">Outer Temperature Entity</label>
          <select
            id="outer_temp"
            @change=${(ev: any) => this._valueChanged('outer_temp_entity', ev.target.value)}
          >
            <option value="">Select entity...</option>
            ${sensorEntities.map(entity => html`
              <option 
                value=${entity} 
                ?selected=${entity === this._config.outer_temp_entity}
              >
                ${entity} (${this.hass.states[entity]?.attributes?.friendly_name || entity})
              </option>
            `)}
          </select>
        </div>

        <div class="form-group">
          <label for="outer_humidity">Outer Humidity Entity</label>
          <select
            id="outer_humidity"
            @change=${(ev: any) => this._valueChanged('outer_humidity_entity', ev.target.value)}
          >
            <option value="">Select entity...</option>
            ${sensorEntities.map(entity => html`
              <option 
                value=${entity} 
                ?selected=${entity === this._config.outer_humidity_entity}
              >
                ${entity} (${this.hass.states[entity]?.attributes?.friendly_name || entity})
              </option>
            `)}
          </select>
        </div>

        <div class="form-group">
          <label for="leaf_temp">Leaf Temperature Entity</label>
          <select
            id="leaf_temp"
            @change=${(ev: any) => this._valueChanged('leaf_temp_entity', ev.target.value)}
          >
            <option value="">Select entity...</option>
            ${sensorEntities.map(entity => html`
              <option 
                value=${entity} 
                ?selected=${entity === this._config.leaf_temp_entity}
              >
                ${entity} (${this.hass.states[entity]?.attributes?.friendly_name || entity})
              </option>
            `)}
          </select>
        </div>

        <h3>Control Entities</h3>

        <div class="form-group">
          <label for="light">Light Entity</label>
          <select
            id="light"
            @change=${(ev: any) => this._valueChanged('light_entity', ev.target.value)}
          >
            <option value="">Select entity...</option>
            ${lightEntities.map(entity => html`
              <option 
                value=${entity} 
                ?selected=${entity === this._config.light_entity}
              >
                ${entity} (${this.hass.states[entity]?.attributes?.friendly_name || entity})
              </option>
            `)}
          </select>
        </div>

        <div class="form-group">
          <label for="heating">Heating Entity</label>
          <select
            id="heating"
            @change=${(ev: any) => this._valueChanged('heating_entity', ev.target.value)}
          >
            <option value="">Select entity...</option>
            ${lightEntities.map(entity => html`
              <option 
                value=${entity} 
                ?selected=${entity === this._config.heating_entity}
              >
                ${entity} (${this.hass.states[entity]?.attributes?.friendly_name || entity})
              </option>
            `)}
          </select>
        </div>

        <div class="form-group">
          <label for="ventilation">Ventilation Entity</label>
          <select
            id="ventilation"
            @change=${(ev: any) => this._valueChanged('ventilation_entity', ev.target.value)}
          >
            <option value="">Select entity...</option>
            ${fanEntities.map(entity => html`
              <option 
                value=${entity} 
                ?selected=${entity === this._config.ventilation_entity}
              >
                ${entity} (${this.hass.states[entity]?.attributes?.friendly_name || entity})
              </option>
            `)}
          </select>
        </div>

        <h3>Camera</h3>

        <div class="form-group">
          <label for="camera">Camera Entity</label>
          <select
            id="camera"
            @change=${(ev: any) => this._valueChanged('camera_entity', ev.target.value)}
          >
            <option value="">Select entity...</option>
            ${cameraEntities.map(entity => html`
              <option 
                value=${entity} 
                ?selected=${entity === this._config.camera_entity}
              >
                ${entity} (${this.hass.states[entity]?.attributes?.friendly_name || entity})
              </option>
            `)}
          </select>
        </div>

        <h3>VPD Configuration</h3>
        <div class="form-group">
          <label>
            <input
              type="checkbox"
              .checked=${this._config.vpd_calculation?.enabled !== false}
              @change=${(ev: any) => this._vpdEnabledChanged(ev.target.checked)}
            />
            Enable VPD Calculation
          </label>
        </div>

        <h3>Vents Configuration</h3>
        ${this.renderVentConfiguration(coverEntities)}

        <h3>Plants Configuration</h3>
        ${this.renderPlantConfiguration(plantEntities)}
      </div>
    `;
  }

  private renderVentConfiguration(coverEntities: string[]) {
    const vents = this._config.vents || [];
    
    return html`
      <div class="vents-config">
        ${vents.map((vent, index) => html`
          <div class="vent-config">
            <div class="form-group">
              <label for="vent-name-${index}">Vent Name</label>
              <input
                id="vent-name-${index}"
                type="text"
                .value=${vent.name}
                @input=${(ev: any) => this._ventChanged(index, 'name', ev.target.value)}
                placeholder="Vent Name"
              />
            </div>
            
            <div class="form-group">
              <label for="vent-entity-${index}">Vent Entity</label>
              <select
                id="vent-entity-${index}"
                @change=${(ev: any) => this._ventChanged(index, 'entity', ev.target.value)}
              >
                <option value="">Select entity...</option>
                ${coverEntities.map(entity => html`
                  <option 
                    value=${entity} 
                    ?selected=${entity === vent.entity}
                  >
                    ${entity} (${this.hass.states[entity]?.attributes?.friendly_name || entity})
                  </option>
                `)}
              </select>
            </div>

            <div class="form-group">
              <label for="vent-position-${index}">Position</label>
              <select
                id="vent-position-${index}"
                @change=${(ev: any) => this._ventChanged(index, 'position', ev.target.value)}
              >
                <option value="top" ?selected=${vent.position === 'top'}>Top</option>
                <option value="side" ?selected=${vent.position === 'side'}>Side</option>
                <option value="bottom" ?selected=${vent.position === 'bottom'}>Bottom</option>
              </select>
            </div>

            <button class="remove-button" @click=${() => this._removeVent(index)}>Remove Vent</button>
          </div>
        `)}
        
        <button class="add-button" @click=${this._addVent}>Add Vent</button>
      </div>
    `;
  }

  private renderPlantConfiguration(plantEntities: string[]) {
    const plants = this._config.plants || [];
    
    return html`
      <div class="plants-config">
        ${plants.map((plant, index) => html`
          <div class="plant-config">
            <div class="form-group">
              <label for="plant-name-${index}">Plant Name</label>
              <input
                id="plant-name-${index}"
                type="text"
                .value=${plant.name}
                @input=${(ev: any) => this._plantChanged(index, 'name', ev.target.value)}
                placeholder="Plant Name"
              />
            </div>
            
            <div class="form-group">
              <label for="plant-entity-${index}">Plant Entity</label>
              <select
                id="plant-entity-${index}"
                @change=${(ev: any) => this._plantChanged(index, 'entity', ev.target.value)}
              >
                <option value="">Select entity...</option>
                ${plantEntities.map(entity => html`
                  <option 
                    value=${entity} 
                    ?selected=${entity === plant.entity}
                  >
                    ${entity} (${this.hass.states[entity]?.attributes?.friendly_name || entity})
                  </option>
                `)}
              </select>
            </div>

            <div class="form-group">
              <label for="plant-position-${index}">Position (1-4)</label>
              <input
                id="plant-position-${index}"
                type="number"
                min="1"
                max="4"
                .value=${plant.position || 1}
                @input=${(ev: any) => this._plantChanged(index, 'position', parseInt(ev.target.value))}
              />
            </div>

            <button class="remove-button" @click=${() => this._removePlant(index)}>Remove Plant</button>
          </div>
        `)}
        
        <button class="add-button" @click=${this._addPlant}>Add Plant</button>
      </div>
    `;
  }

  private _valueChanged(configValue: string, value: string): void {
    if (!this._config || !this.hass) {
      return;
    }

    if (this._config[configValue as keyof GrowBoxCardConfig] === value) {
      return;
    }

    const newConfig = {
      ...this._config,
      [configValue]: value || undefined,
    };

    fireEvent(this, 'config-changed', { config: newConfig });
  }

  private _vpdEnabledChanged(enabled: boolean): void {
    const newConfig = {
      ...this._config,
      vpd_calculation: {
        ...this._config.vpd_calculation,
        enabled
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
        gap: 16px;
        padding: 16px;
      }

      h3 {
        margin: 20px 0 12px 0;
        color: var(--primary-color);
        border-bottom: 1px solid var(--divider-color);
        padding-bottom: 4px;
        font-size: 16px;
      }

      .form-group {
        display: flex;
        flex-direction: column;
        gap: 4px;
        margin-bottom: 12px;
      }

      label {
        font-weight: 500;
        color: var(--primary-text-color);
        font-size: 14px;
      }

      input, select {
        padding: 8px 12px;
        border: 1px solid var(--divider-color);
        border-radius: 4px;
        background: var(--card-background-color);
        color: var(--primary-text-color);
        font-size: 14px;
        font-family: inherit;
      }

      input:focus, select:focus {
        outline: none;
        border-color: var(--primary-color);
        box-shadow: 0 0 0 1px var(--primary-color);
      }

      input[type="checkbox"] {
        width: auto;
        margin-right: 8px;
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
        position: relative;
      }

      .add-button,
      .remove-button {
        padding: 8px 16px;
        border: 1px solid var(--primary-color);
        border-radius: 4px;
        background: var(--primary-color);
        color: white;
        cursor: pointer;
        font-size: 14px;
        margin-top: 8px;
      }

      .remove-button {
        background: #f44336;
        border-color: #f44336;
        position: absolute;
        top: 16px;
        right: 16px;
        padding: 4px 8px;
        font-size: 12px;
      }

      .add-button:hover,
      .remove-button:hover {
        opacity: 0.9;
      }

      select option {
        background: var(--card-background-color);
        color: var(--primary-text-color);
      }
    `;
  }
}