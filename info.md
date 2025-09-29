## HA Grow Box Card

A comprehensive Home Assistant custom card for monitoring and controlling cannabis grow tents.

### Features

- **Environmental Monitoring**: Track inner/outer temperature, humidity, and leaf temperature
- **VPD Calculation**: Automatic Vapor Pressure Deficit calculation with phase indicators
- **Control Systems**: Manage lights, heating, ventilation, and multiple vents
- **Plant Monitoring**: Support for up to 4 plants with OpenPlantBook integration
- **Live Camera**: WebRTC camera integration for real-time monitoring
- **Visual Layout**: Schematic representation of your grow tent setup

### Installation

1. Install via HACS or manually copy `ha-grow-box-card.js` to `/config/www/`
2. Add to Lovelace resources
3. Add card to your dashboard

### Basic Configuration

```yaml
type: custom:ha-grow-box-card
name: "My Grow Tent"
inner_temp_entity: sensor.grow_tent_temperature
inner_humidity_entity: sensor.grow_tent_humidity
leaf_temp_entity: sensor.leaf_temperature
light_entity: light.grow_light
camera_entity: camera.grow_tent_cam
```

For more configuration options, see the README.md file.