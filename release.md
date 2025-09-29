# Release Process

This document describes how to create a release for HACS compatibility.

## Preparing a Release

1. **Update Version**: Update the version number in `package.json`
2. **Build**: Run `npm run build` to generate the latest `ha-grow-box-card.js`
3. **Test**: Verify the card works in Home Assistant
4. **Commit**: Commit all changes
5. **Tag**: Create a git tag with the version number
6. **Push**: Push to GitHub including tags

## Commands

```bash
# Update version (edit package.json manually)
# Build the distribution file
npm run build

# Commit changes
git add .
git commit -m "Release version X.X.X"

# Create and push tag
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin main --tags
```

## HACS Requirements Met

✅ **Root Distribution**: Main JS file is in repository root  
✅ **HACS Config**: `hacs.json` with correct settings  
✅ **Documentation**: README.md and info.md files  
✅ **License**: MIT license included  
✅ **Build System**: Professional build process with TypeScript

## Installation for Users

### Via HACS (Recommended)
1. Add this repository as a custom repository in HACS
2. Search for "HA Grow Box Card" 
3. Install and restart Home Assistant

### Manual Installation
1. Download `ha-grow-box-card.js` from the latest release
2. Copy to `/config/www/` directory
3. Add to Lovelace resources:
```yaml
resources:
  - url: /local/ha-grow-box-card.js
    type: module
```