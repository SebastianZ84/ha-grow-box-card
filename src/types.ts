import { LovelaceCard, LovelaceCardConfig, LovelaceCardEditor } from 'custom-card-helpers';

declare global {
  interface HTMLElementTagNameMap {
    'ha-grow-box-card': GrowBoxCard;
    'ha-grow-box-card-editor': GrowBoxCardEditor;
  }
}

export interface GrowBoxCardConfig extends LovelaceCardConfig {
  type: 'custom:ha-grow-box-card';
  name?: string;
  
  // Environmental sensors
  inner_temp_entity?: string;
  inner_temp_icon?: string;
  inner_humidity_entity?: string;
  inner_humidity_icon?: string;
  outer_temp_entity?: string;
  outer_temp_icon?: string;
  outer_humidity_entity?: string;
  outer_humidity_icon?: string;
  leaf_temp_entity?: string;
  leaf_temp_icon?: string;
  
  // Control entities
  light_entity?: string;
  light_icon?: string;
  heating_entity?: string;
  heating_icon?: string;
  ventilation_entity?: string;
  ventilation_icon?: string;
  vents?: VentConfig[];
  
  // Plant monitoring
  plants?: PlantConfig[];
  
  // Camera
  camera_entity?: string;
  
  // VPD settings
  vpd_calculation?: VPDConfig;
}

export interface VentConfig {
  name: string;
  entity: string;
  position?: 'top' | 'side' | 'bottom';
  icon?: string;
}

export interface PlantConfig {
  entity: string; // Plant entity (required, just like Flower Card)
  name?: string; // Optional override name
  icon?: string; // Custom plant icon
  show_bars?: string[]; // Array of sensor types to show: illuminance, humidity, moisture, conductivity, temperature, dli
}

export interface VPDConfig {
  enabled?: boolean;
  phases?: {
    under_transpiration: { min: number; max: number; color: string };
    early_vegetation: { min: number; max: number; color: string };
    late_vegetation: { min: number; max: number; color: string };
    mid_late_flowering: { min: number; max: number; color: string };
    danger_zone: { min: number; max: number; color: string };
  };
}

export interface GrowBoxCard extends LovelaceCard {
  setConfig(config: GrowBoxCardConfig): void;
}

export interface GrowBoxCardEditor extends LovelaceCardEditor {
  setConfig(config: GrowBoxCardConfig): void;
}