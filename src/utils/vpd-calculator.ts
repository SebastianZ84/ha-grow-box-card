export interface VPDResult {
  vpd: number;
  phase: string;
  color: string;
}

export class VPDCalculator {
  private static readonly DEFAULT_PHASES = {
    under_transpiration: { min: 0, max: 0.4, color: '#0066cc' },
    early_vegetation: { min: 0.4, max: 0.8, color: '#00cc66' },
    late_vegetation: { min: 0.8, max: 1.2, color: '#66cc00' },
    mid_late_flowering: { min: 1.2, max: 1.6, color: '#ffcc00' },
    danger_zone: { min: 1.6, max: Infinity, color: '#cc0000' }
  };

  static calculateVPD(leafTemp: number, airTemp: number, humidity: number): number {
    // VPD calculation using standard formula
    const VPleaf = 610.7 * Math.exp(17.27 * leafTemp / (leafTemp + 237.3)) / 1000;
    const VPair = 610.7 * Math.exp(17.27 * airTemp / (airTemp + 237.3)) / 1000 * humidity / 100;
    return VPleaf - VPair;
  }

  static getVPDPhase(vpd: number, customPhases?: any): VPDResult {
    const phases = customPhases || this.DEFAULT_PHASES;
    
    for (const [phaseName, phase] of Object.entries(phases)) {
      const p = phase as { min: number; max: number; color: string };
      if (vpd >= p.min && vpd < p.max) {
        return {
          vpd,
          phase: phaseName.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()),
          color: p.color
        };
      }
    }

    return {
      vpd,
      phase: 'Unknown',
      color: '#888888'
    };
  }

  static formatVPD(vpd: number): string {
    return vpd.toFixed(2) + ' kPa';
  }
}