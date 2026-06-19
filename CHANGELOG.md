# Changelog

## [Unreleased]

### Added

- Structured logging via ctx.logger in lifecycle hooks

### Changed

- Renamed manifest file from `cortex.json` to `manifest.json` for consistency with Cortex standard
- Standardized UI section structure to `ui.settings` format
- Normalized parameter naming: `defaultValue` → `default`, `options` → `enum`
- Added `homepage` field with repository URL
- Added `dependencies` field to manifest

## [1.0.1] — 2026-06-15

### Added

- Initial release

## [1.0.1] — 2026-06-17

### Added

- Initial project setup

## [1.0.0] — 2026-06-15

### Added

- Initial release of cortex-plugin-canva
- `image_generate` — Generate images from natural language prompts via DALL-E, Stable Diffusion, or
  Canva
- `image_edit` — Edit existing images with natural language instructions
- `image_variations` — Generate variations of an existing image
- `canva_create_design` — Create Canva designs from templates
- `canva_list_templates` — List available Canva design templates
- UI settings for API keys (OpenAI, Canva, Stability AI)
- UI settings for default provider and image size
