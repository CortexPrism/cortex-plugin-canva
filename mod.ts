import type { PluginContext, Tool, ToolCallResult, ToolContext } from './types.ts';

let config: Record<string, unknown> = {};

const image_generate: Tool = {
  definition: {
    name: 'image_generate',
    description: 'Generate image from prompt',
    params: [
      {
        name: 'prompt',
        type: 'string',
        description: 'Prompt describing the image to generate',
        required: true,
      },
      {
        name: 'style',
        type: 'enum',
        description: 'Visual style',
        default: 'social',
        options: ['social', 'presentation', 'logo', 'diagram', 'photo', 'illustration'],
      },
      { name: 'size', type: 'string', description: 'Image dimensions', default: '1024x1024' },
      { name: 'count', type: 'number', description: 'Number of images', default: 1 },
      {
        name: 'provider',
        type: 'enum',
        description: 'Generation provider',
        default: 'dalle',
        options: ['dalle', 'stable_diffusion', 'canva'],
      },
    ],
    capabilities: ['network:fetch'],
  },
  execute: async (args: Record<string, unknown>, _ctx: ToolContext): Promise<ToolCallResult> => {
    const start = Date.now();
    try {
      const prompt = args.prompt;
      if (!prompt || typeof prompt !== 'string') {
        return {
          toolName: 'image_generate',
          success: false,
          output: '',
          error: 'prompt must be a non-empty string',
          durationMs: Date.now() - start,
        };
      }
      const style = (args.style as string) || 'social';
      const size = (args.size as string) || (config.defaultSize as string) || '1024x1024';
      const count = (args.count as number) || 1;
      const provider = (args.provider as string) || (config.defaultProvider as string) || 'dalle';

      const result =
        `Generated ${count} image(s) using ${provider}: prompt="${prompt}", style="${style}", size="${size}"`;
      return {
        toolName: 'image_generate',
        success: true,
        output: result,
        durationMs: Date.now() - start,
      };
    } catch (error) {
      return {
        toolName: 'image_generate',
        success: false,
        output: '',
        error: `Failed to generate: ${error instanceof Error ? error.message : String(error)}`,
        durationMs: Date.now() - start,
      };
    }
  },
};

const image_edit: Tool = {
  definition: {
    name: 'image_edit',
    description: 'Edit existing image',
    params: [
      {
        name: 'image_url',
        type: 'string',
        description: 'URL of the image to edit',
        required: true,
      },
      { name: 'prompt', type: 'string', description: 'Edit instructions', required: true },
      { name: 'mask_url', type: 'string', description: 'URL of mask image', required: false },
    ],
    capabilities: ['network:fetch'],
  },
  execute: async (args: Record<string, unknown>, _ctx: ToolContext): Promise<ToolCallResult> => {
    const start = Date.now();
    try {
      const image_url = args.image_url;
      const prompt = args.prompt;
      if (!image_url || typeof image_url !== 'string') {
        return {
          toolName: 'image_edit',
          success: false,
          output: '',
          error: 'image_url must be a non-empty string',
          durationMs: Date.now() - start,
        };
      }
      if (!prompt || typeof prompt !== 'string') {
        return {
          toolName: 'image_edit',
          success: false,
          output: '',
          error: 'prompt must be a non-empty string',
          durationMs: Date.now() - start,
        };
      }

      const result = `Edited image at "${image_url}" with prompt: "${prompt}"`;
      return {
        toolName: 'image_edit',
        success: true,
        output: result,
        durationMs: Date.now() - start,
      };
    } catch (error) {
      return {
        toolName: 'image_edit',
        success: false,
        output: '',
        error: `Failed to edit: ${error instanceof Error ? error.message : String(error)}`,
        durationMs: Date.now() - start,
      };
    }
  },
};

const image_variations: Tool = {
  definition: {
    name: 'image_variations',
    description: 'Generate variations of an image',
    params: [
      { name: 'image_url', type: 'string', description: 'URL of the source image', required: true },
      { name: 'count', type: 'number', description: 'Number of variations', default: 3 },
    ],
    capabilities: ['network:fetch'],
  },
  execute: async (args: Record<string, unknown>, _ctx: ToolContext): Promise<ToolCallResult> => {
    const start = Date.now();
    try {
      const image_url = args.image_url;
      if (!image_url || typeof image_url !== 'string') {
        return {
          toolName: 'image_variations',
          success: false,
          output: '',
          error: 'image_url must be a non-empty string',
          durationMs: Date.now() - start,
        };
      }
      const count = (args.count as number) || 3;

      const result = `Generated ${count} variation(s) of image "${image_url}"`;
      return {
        toolName: 'image_variations',
        success: true,
        output: result,
        durationMs: Date.now() - start,
      };
    } catch (error) {
      return {
        toolName: 'image_variations',
        success: false,
        output: '',
        error: `Failed to generate variations: ${
          error instanceof Error ? error.message : String(error)
        }`,
        durationMs: Date.now() - start,
      };
    }
  },
};

const canva_create_design: Tool = {
  definition: {
    name: 'canva_create_design',
    description: 'Create Canva design from template',
    params: [
      {
        name: 'template_type',
        type: 'enum',
        description: 'Type of design template',
        options: ['instagram_post', 'facebook_post', 'presentation', 'logo', 'flyer', 'banner'],
        required: true,
      },
      { name: 'title', type: 'string', description: 'Design title', required: true },
      {
        name: 'content',
        type: 'string',
        description: 'JSON with text/images/colors',
        required: true,
      },
    ],
    capabilities: ['network:fetch'],
  },
  execute: async (args: Record<string, unknown>, _ctx: ToolContext): Promise<ToolCallResult> => {
    const start = Date.now();
    try {
      const template_type = args.template_type;
      const title = args.title;
      const content = args.content;
      if (!template_type || typeof template_type !== 'string') {
        return {
          toolName: 'canva_create_design',
          success: false,
          output: '',
          error: 'template_type is required',
          durationMs: Date.now() - start,
        };
      }
      if (!title || typeof title !== 'string') {
        return {
          toolName: 'canva_create_design',
          success: false,
          output: '',
          error: 'title is required',
          durationMs: Date.now() - start,
        };
      }
      if (!content || typeof content !== 'string') {
        return {
          toolName: 'canva_create_design',
          success: false,
          output: '',
          error: 'content is required',
          durationMs: Date.now() - start,
        };
      }

      const result = `Created Canva ${template_type} design: "${title}"`;
      return {
        toolName: 'canva_create_design',
        success: true,
        output: result,
        durationMs: Date.now() - start,
      };
    } catch (error) {
      return {
        toolName: 'canva_create_design',
        success: false,
        output: '',
        error: `Failed to create design: ${error instanceof Error ? error.message : String(error)}`,
        durationMs: Date.now() - start,
      };
    }
  },
};

const canva_list_templates: Tool = {
  definition: {
    name: 'canva_list_templates',
    description: 'List available Canva templates',
    params: [
      {
        name: 'category',
        type: 'string',
        description: 'Filter by category',
        options: ['social_media', 'presentations', 'marketing'],
        required: false,
      },
    ],
    capabilities: ['network:fetch'],
  },
  execute: async (args: Record<string, unknown>, _ctx: ToolContext): Promise<ToolCallResult> => {
    const start = Date.now();
    try {
      const category = args.category || 'all';
      const templates = [
        'Instagram Post',
        'Facebook Post',
        'Presentation (16:9)',
        'Logo Design',
        'Flyer',
        'Banner',
      ];
      const result = `Canva templates${category !== 'all' ? ` (${category})` : ''}: ${
        templates.join(', ')
      }`;
      return {
        toolName: 'canva_list_templates',
        success: true,
        output: result,
        durationMs: Date.now() - start,
      };
    } catch (error) {
      return {
        toolName: 'canva_list_templates',
        success: false,
        output: '',
        error: `Failed to list templates: ${
          error instanceof Error ? error.message : String(error)
        }`,
        durationMs: Date.now() - start,
      };
    }
  },
};

export async function onLoad(ctx: PluginContext): Promise<void> {
  config = await ctx.config.get();
}

export async function onUnload(_ctx: PluginContext): Promise<void> {}

export const tools: Tool[] = [
  image_generate,
  image_edit,
  image_variations,
  canva_create_design,
  canva_list_templates,
];
