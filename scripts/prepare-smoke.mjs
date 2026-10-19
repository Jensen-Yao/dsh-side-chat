import { mkdir, readFile, writeFile, symlink } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join, resolve } from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const home = resolve(process.argv[2] ?? join(root, 'output/smoke-home'));
const profile = join(home, 'profiles/side-chat-smoke');
await mkdir(join(profile, 'node_modules'), { recursive: true });
const manifest = {
  name: 'dsh-profile-side-chat-smoke', private: true,
  dependencies: { 'dsh-side-chat': `link:${root}` },
  dsh: { profile: { bundles: ['@deepseek-ai/dsh-base', '@deepseek-ai/dsh-web-app', 'dsh-side-chat'] } },
};
await writeFile(join(profile, 'package.json'), JSON.stringify(manifest, null, 2) + '\n');
const fixture = new URL('../tests/fixture-adapter.mjs', import.meta.url).href;
await writeFile(join(profile, 'cordis.patch.yml'), `- insert:\n    - id: side-chat-fixture\n      name: ${JSON.stringify(fixture)}\n- id: agent-default-model\n  config:\n    provider: side-chat-fixture\n    model: fixture\n`);
const link = join(profile, 'node_modules/dsh-side-chat');
try {
  const installed = JSON.parse(await readFile(join(link, 'package.json'), 'utf8'));
  if (installed.name !== 'dsh-side-chat') throw new Error('Unexpected smoke profile link');
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
  await symlink(root, link, process.platform === 'win32' ? 'junction' : 'dir');
}
console.log(`Isolated smoke profile ready: ${profile}`);
