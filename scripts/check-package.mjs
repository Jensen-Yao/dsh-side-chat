import { readFile, access } from 'node:fs/promises';
import { runInNewContext } from 'node:vm';
import assert from 'node:assert/strict';

const manifest = JSON.parse(await readFile('package.json', 'utf8'));
assert.equal(manifest.name, 'dsh-side-chat');
for (const target of [manifest.main, manifest.exports['./client'], manifest.dsh.bundle.patch]) await access(target);
let registration;
runInNewContext(await readFile(manifest.exports['./client'], 'utf8'), {
  window: { __ModuleLoader__: { load: (value) => { registration = value; } } },
});
assert.equal(registration?.id, manifest.name);
assert.equal(typeof registration?.factory, 'function');
assert.ok(manifest.files.includes('lib'), 'Built browser bundle must be included in the package');
console.log('Published entry points and lazy client registration verified.');
