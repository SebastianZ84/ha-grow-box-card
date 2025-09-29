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
  inner_humidity_entity?: string;
  outer_temp_entity?: string;
  outer_humidity_entity?: string;
  leaf_temp_entity?: string;
  
  // Control entities
  light_entity?: string;
  heating_entity?: string;
  ventilation_entity?: string;
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
}

export interface PlantConfig {
  name: string;
  entity: string;
  position?: number; // 1-4 for positioning in the tent
  image?: string;
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