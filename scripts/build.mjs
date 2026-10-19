import { build } from 'esbuild';
import { mkdir, readFile, writeFile } from 'node:fs/promises';

await mkdir('lib', { recursive: true });
await build({ entryPoints: ['src/index.ts'], outfile: 'lib/index.js', bundle: true, format: 'esm', platform: 'node', target: 'node22' });
const result = await build({ entryPoints: ['src/client.tsx'], bundle: true, format: 'cjs', platform: 'browser', target: 'es2022',
  jsx: 'automatic', external: ['react', 'react/jsx-runtime', 'react-dom'], loader: { '.css': 'text' }, write: false, metafile: true });
const imports = Object.values(result.metafile.outputs).flatMap((output) => output.imports);
const allowed = new Set(['react', 'react/jsx-runtime', 'react-dom']);
for (const item of imports) if (item.external && !allowed.has(item.path)) throw new Error(`Unregistered browser external: ${item.path}`);
const { name } = JSON.parse(await readFile('package.json', 'utf8'));
await writeFile('lib/client.js', `window.__ModuleLoader__.load({id:${JSON.stringify(name)},factory:(require)=>{var module={exports:{}};var exports=module.exports;\n${result.outputFiles[0].text}\nreturn module.exports;}});\n`);
console.log('Built host entry and native sidebar client.');
