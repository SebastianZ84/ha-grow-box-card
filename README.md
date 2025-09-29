# HA Grow Box Card

A comprehensive Home Assistant custom card for monitoring and controlling cannabis grow tents. This card provides a visual representation of your grow tent with all essential monitoring and control features.

## Features

### 🌡️ Environmental Monitoring
- **Inner Environment**: Temperature and humidity inside the grow tent
- **Outer Environment**: Room temperature and humidity for comparison
- **Leaf Temperature**: Direct plant canopy temperature monitoring
- **VPD Calculation**: Automatic Vapor Pressure Deficit calculation with color-coded phases

### 🎛️ Control Systems
- **Light Control**: Turn grow lights on/off
- **Heating Control**: Manage heating elements
- **Ventilation Control**: Control exhaust fans
- **Vent Management**: Control multiple intake/exhaust vents with positioning

### 🌱 Plant Monitoring
- **Multi-Plant Support**: Monitor up to 4 plants simultaneously
- **OpenPlantBook Integration**: Compatible with plant entities
- **Plant Positioning**: Visual representation of plant locations in the tent

### 📹 Live Monitoring
- **WebRTC Camera Integration**: Live video stream from your grow tent
- **Visual Grow Tent Layout**: Schematic representation of your setup

## Installation

### Method 1: HACS (Recommended)
1. Open HACS in your Home Assistant instance
2. Go to "Frontend" section
3. Click the "+" button and search for "HA Grow Box Card"
4. Install the card
5. Add the card to your Lovelace dashboard

### Method 2: Manual Installation
1. Download the `ha-grow-box-card.js` file from the latest release
2. Copy it to your `config/www/` directory
3. Add the following to your Lovelace resources:
```yaml
resources:
  - url: /local/ha-grow-box-card.js
    type: module
```

## Configuration

### Basic Configuration
```yaml
type: custom:ha-grow-box-card
name: "My Grow Tent"
inner_temp_entity: sensor.grow_tent_temperature
inner_humidity_entity: sensor.grow_tent_humidity
outer_temp_entity: sensor.room_temperature
outer_humidity_entity: sensor.room_humidity
leaf_temp_entity: sensor.leaf_temperature
light_entity: light.grow_light
heating_entity: switch.grow_tent_heater
ventilation_entity: fan.grow_tent_exhaust
camera_entity: camera.grow_tent_cam
```

### Advanced Configuration with Vents and Plants
```yaml
type: custom:ha-grow-box-card
name: "Cannabis Grow Tent"
inner_temp_entity: sensor.grow_tent_temperature
inner_humidity_entity: sensor.grow_tent_humidity
outer_temp_entity: sensor.room_temperature
outer_humidity_entity: sensor.room_humidity
leaf_temp_entity: sensor.leaf_temperature
light_entity: light.grow_light
heating_entity: switch.grow_tent_heater
ventilation_entity: fan.grow_tent_exhaust
camera_entity: camera.grow_tent_cam

vents:
  - name: "Top Intake"
    entity: cover.top_intake_vent
    position: top
  - name: "Side Exhaust"
    entity: cover.side_exhaust_vent
    position: side
  - name: "Bottom Intake"
    entity: cover.bottom_intake_vent
    position: bottom

plants:
  - name: "Plant 1 - Sativa"
    entity: plant.cannabis_plant_1
    position: 1
  - name: "Plant 2 - Indica"
    entity: plant.cannabis_plant_2
    position: 2
  - name: "Plant 3 - Hybrid"
    entity: plant.cannabis_plant_3
    position: 3
  - name: "Plant 4 - Auto"
    entity: plant.cannabis_plant_4
    position: 4

vpd_calculation:
  enabled: true
  phases:
    under_transpiration:
      min: 0
      max: 0.4
      color: "#0066cc"
    early_vegetation:
      min: 0.4
      max: 0.8
      color: "#00cc66"
    late_vegetation:
      min: 0.8
      max: 1.2
      color: "#66cc00"
    mid_late_flowering:
      min: 1.2
      max: 1.6
      color: "#ffcc00"
    danger_zone:
      min: 1.6
      max: 999
      color: "#cc0000"
```

## Configuration Options

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `type` | string | **Required** | `custom:ha-grow-box-card` |
| `name` | string | `"Grow Tent"` | Card title |
| `inner_temp_entity` | string | Optional | Inner temperature sensor entity |
| `inner_humidity_entity` | string | Optional | Inner humidity sensor entity |
| `outer_temp_entity` | string | Optional | Outer temperature sensor entity |
| `outer_humidity_entity` | string | Optional | Outer humidity sensor entity |
| `leaf_temp_entity` | string | Optional | Leaf temperature sensor entity |
| `light_entity` | string | Optional | Light control entity |
| `heating_entity` | string | Optional | Heating control entity |
| `ventilation_entity` | string | Optional | Ventilation control entity |
| `camera_entity` | string | Optional | Camera entity for live view |
| `vents` | array | Optional | Array of vent configurations |
| `plants` | array | Optional | Array of plant configurations |
| `vpd_calculation` | object | Optional | VPD calculation settings |

### Vent Configuration
| Name | Type | Default | Description |
|------|------|---------|-------------|
| `name` | string | **Required** | Vent display name |
| `entity` | string | **Required** | Vent control entity (cover, switch) |
| `position` | string | `"side"` | Vent position: `top`, `side`, `bottom` |

### Plant Configuration
| Name | Type | Default | Description |
|------|------|---------|-------------|
| `name` | string | **Required** | Plant display name |
| `entity` | string | **Required** | Plant entity |
| `position` | number | `1` | Plant position in tent (1-4) |
| `image` | string | Optional | Plant image URL |

### VPD Configuration
| Name | Type | Default | Description |
|------|------|---------|-------------|
| `enabled` | boolean | `true` | Enable VPD calculation |
| `phases` | object | Default phases | Custom VPD phase definitions |

## VPD (Vapor Pressure Deficit) Information

The card automatically calculates and displays VPD based on your temperature and humidity sensors. VPD is crucial for cannabis cultivation as it indicates the plant's transpiration rate.

### Default VPD Phases:
- **Under-transpiration** (0.0-0.4 kPa): Too low, plants may not transpire enough
- **Early Vegetation** (0.4-0.8 kPa): Ideal for seedlings and early vegetative growth
- **Late Vegetation** (0.8-1.2 kPa): Perfect for vigorous vegetative growth
- **Mid-Late Flowering** (1.2-1.6 kPa): Optimal for flowering stage
- **Danger Zone** (>1.6 kPa): Too high, may stress plants

## Required Home Assistant Integrations

To use all features of this card, you may need:

1. **Plant Integration**: For plant monitoring
2. **Camera Integration**: For live streaming (WebRTC, generic camera, etc.)
3. **Sensor Integrations**: For temperature/humidity monitoring
4. **Climate/Light/Fan Integrations**: For equipment control

## Development

### Building from Source
```bash
npm install
npm run build
```

### Development Mode
```bash
npm run dev
```

This will start a development server with hot reloading.

## Troubleshooting

### Common Issues

1. **Card not showing**: Ensure the card is properly installed and added to Lovelace resources
2. **Entities not found**: Verify entity IDs are correct and entities exist in Home Assistant
3. **VPD not calculating**: Ensure temperature and humidity entities are providing numeric values
4. **Camera not loading**: Verify camera entity is accessible and WebRTC is configured properly

### Debug Mode
Enable debug mode by adding this to your configuration:
```yaml
logger:
  logs:
    custom_components.ha_grow_box_card: debug
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Disclaimer

This card is intended for legal cannabis cultivation where permitted by law. Please ensure compliance with your local laws and regulations regarding cannabis cultivation.

## Support

If you encounter issues or have feature requests, please open an issue on GitHub.

---

**Happy Growing! 🌱**