import { assertEquals, assertStringIncludes } from 'https://deno.land/std@0.208.0/assert/mod.ts';
import { tools } from '../../mod.ts';
import type { PluginContext, ToolContext } from '../../types.ts';

// Mock PluginContext
const mockContext: PluginContext & ToolContext = {
  pluginId: 'cortex-plugin-canva',
  pluginDir: '/tmp/plugins/cortex-plugin-canva',
  state: {
    get: async () => null,
    set: async () => {},
    delete: async () => {},
    list: async () => ({}),
  },
  config: {
    get: async () => null,
    set: async () => {},
    getAll: async () => ({}),
  },
  logger: {
    info: () => {},
    warn: () => {},
    error: () => {},
    debug: () => {},
  },
  host: {
    registerTool: () => {},
    unregisterTool: () => {},
  },
  sessionId: 'test-session',
  workingDir: '/tmp',
  agentId: 'test-agent',
  workspaceDir: '/tmp',
};

function findTool(name: string) {
  const tool = tools.find((t) => t.definition.name === name);
  if (!tool) throw new Error(`Tool "${name}" not found`);
  return tool;
}

Deno.test('tools array — exports all tools', () => {
  assertEquals(tools.length, 5);
  assertEquals(tools[0].definition.name, 'image_generate');
  assertEquals(tools[1].definition.name, 'image_edit');
  assertEquals(tools[2].definition.name, 'image_variations');
  assertEquals(tools[3].definition.name, 'canva_create_design');
  assertEquals(tools[4].definition.name, 'canva_list_templates');
});

Deno.test('image_generate — rejects empty prompt', async () => {
  const tool = findTool('image_generate');
  const result = await tool.execute({ 'prompt': '' }, mockContext);
  assertEquals(result.success, false);
  assertStringIncludes(result.error ?? '', 'non-empty string');
});

Deno.test('image_edit — rejects empty image_url', async () => {
  const tool = findTool('image_edit');
  const result = await tool.execute({ 'image_url': '' }, mockContext);
  assertEquals(result.success, false);
  assertStringIncludes(result.error ?? '', 'non-empty string');
});

Deno.test('image_variations — rejects empty image_url', async () => {
  const tool = findTool('image_variations');
  const result = await tool.execute({ 'image_url': '' }, mockContext);
  assertEquals(result.success, false);
  assertStringIncludes(result.error ?? '', 'non-empty string');
});

Deno.test('canva_create_design — tool is defined with name and description', () => {
  const tool = findTool('canva_create_design');
  assertEquals(typeof tool.definition.description, 'string');
  assertEquals(tool.definition.description.length > 0, true);
});

Deno.test('canva_list_templates — tool is defined with name and description', () => {
  const tool = findTool('canva_list_templates');
  assertEquals(typeof tool.definition.description, 'string');
  assertEquals(tool.definition.description.length > 0, true);
});

Deno.test('all tools return durationMs', async () => {
  for (const tool of tools) {
    const args: Record<string, unknown> = {};
    const result = await tool.execute(args, mockContext);
    assertEquals(typeof result.durationMs, 'number');
    assertEquals(result.durationMs >= 0, true);
  }
});
