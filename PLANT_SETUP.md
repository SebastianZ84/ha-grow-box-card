# Plant Entity Setup Guide

Your plant entity `plant.purple_lemonade_auto_fastbuds` is not showing up because it needs to be properly configured in Home Assistant. Here's how to set it up:

## Step 1: Check if the Plant Entity Exists

First, check if your plant entity exists in Home Assistant:

1. Go to **Developer Tools** → **States**
2. Search for `plant.purple_lemonade_auto_fastbuds`
3. If it doesn't exist, you need to create it

## Step 2: Create Plant Entity in configuration.yaml

Add this to your `configuration.yaml` file:

```yaml
plant:
  purple_lemonade_auto_fastbuds:
    sensors:
      moisture: sensor.your_moisture_sensor
      conductivity: sensor.your_conductivity_sensor
      illuminance: sensor.your_light_sensor
      temperature: sensor.your_temperature_sensor
      battery: sensor.your_battery_sensor  # Optional
    min_moisture: 15
    max_moisture: 60
    min_conductivity: 350
    max_conductivity: 2000
    min_illuminance: 500
    max_illuminance: 60000
    min_temperature: 15
    max_temperature: 32
```

## Step 3: Replace with Your Actual Sensor Entities

You need to replace the placeholder sensor names with your actual sensor entities. Common examples:

### For MiFlora/Xiaomi sensors:
```yaml
plant:
  purple_lemonade_auto_fastbuds:
    sensors:
      moisture: sensor.miflora_moisture
      conductivity: sensor.miflora_conductivity
      illuminance: sensor.miflora_light_intensity
      temperature: sensor.miflora_temperature
      battery: sensor.miflora_battery
```

### For ESPHome sensors:
```yaml
plant:
  purple_lemonade_auto_fastbuds:
    sensors:
      moisture: sensor.plant_soil_moisture
      conductivity: sensor.plant_conductivity
      illuminance: sensor.plant_light_sensor
      temperature: sensor.plant_temperature
```

## Step 4: Check Your Available Sensors

To find your available sensors:

1. Go to **Developer Tools** → **States**
2. Filter by `sensor.` 
3. Look for sensors related to:
   - Moisture/humidity
   - Conductivity/fertility/EC
   - Light/illuminance
   - Temperature

## Step 5: Restart Home Assistant

After adding the plant configuration:
1. **Configuration** → **Server Controls** → **Restart**
2. Wait for Home Assistant to restart

## Step 6: Verify Plant Entity

After restart:
1. Go to **Developer Tools** → **States**
2. Search for `plant.purple_lemonade_auto_fastbuds`
3. You should see the entity with attributes like:
   - `moisture: 45`
   - `conductivity: 1200`
   - `illuminance: 15000`
   - `temperature: 24`

## Troubleshooting

### If you see "Entity not found":
- The plant entity doesn't exist in Home Assistant
- Check if you added it to `configuration.yaml` and restarted

### If you see "N/A" values:
- The sensor entities in the plant configuration don't exist
- Check the sensor names in Developer Tools → States

### Alternative: Use Individual Sensors

If you don't want to create a plant entity, you can modify the card configuration to use individual sensors directly. Let me know if you need help with this approach.

## Example Working Configuration

Here's a complete example:

```yaml
# configuration.yaml
plant:
  purple_lemonade_auto_fastbuds:
    sensors:
      moisture: sensor.miflora_moisture
      conductivity: sensor.miflora_conductivity
      illuminance: sensor.miflora_light_intensity
      temperature: sensor.miflora_temperature
    min_moisture: 15
    max_moisture: 60
    min_conductivity: 350
    max_conductivity: 2000
```

```yaml
# Lovelace card configuration
type: custom:ha-grow-box-card
name: Grow Tent
plants:
  - name: Purple Lemonade Auto
    entity: plant.purple_lemonade_auto_fastbuds
    position: 1
```

This should make your plant show up with real sensor data!