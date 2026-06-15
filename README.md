# Cortex Plugin: Canva / Image Generator

Generate social media graphics, presentations, logos, and diagrams from natural language using DALL-E, Stable Diffusion, and Canva.

## Installation

```bash
cortex plugin install github:CortexPrism/cortex-plugin-canva
```

## Tools

### image_generate
Generate image from prompt.
- `prompt` (string, required) — Prompt describing the image to generate
- `style` (enum, default: "social") — Visual style: social, presentation, logo, diagram, photo, illustration
- `size` (string, default: "1024x1024") — Image dimensions
- `count` (number, default: 1) — Number of images to generate
- `provider` (enum, default: "dalle") — Generation provider: dalle, stable_diffusion, canva

### image_edit
Edit existing image by providing an image URL and edit instructions.
- `image_url` (string, required) — URL of the image to edit
- `prompt` (string, required) — Edit instructions in natural language
- `mask_url` (string, optional) — URL of mask image

### image_variations
Generate variations of an existing image.
- `image_url` (string, required) — URL of the source image
- `count` (number, default: 3) — Number of variations

### canva_create_design
Create a Canva design from a template.
- `template_type` (enum, required) — Design type: instagram_post, facebook_post, presentation, logo, flyer, banner
- `title` (string, required) — Design title
- `content` (string, required) — JSON with text, images, and colors

### canva_list_templates
List available Canva templates.
- `category` (string, optional) — Filter: social_media, presentations, marketing

## Configuration

| Key | Type | Description |
|-----|------|-------------|
| `openaiApiKey` | secret | OpenAI API Key for DALL-E |
| `canvaApiKey` | secret | Canva API Key |
| `stabilityApiKey` | secret | Stability AI Key |
| `defaultProvider` | select | Default provider: dalle, stable_diffusion, canva |
| `defaultSize` | select | Default size: 1024x1024, 1792x1024, 1024x1792 |

## Development

```bash
deno task test
deno fmt
deno lint
```

## License

MIT
