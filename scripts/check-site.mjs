import assert from 'node:assert/strict'
import { readFile, stat } from 'node:fs/promises'

const html = await readFile(new URL('../docs/index.html', import.meta.url), 'utf8')
const css = await readFile(new URL('../docs/site.css', import.meta.url), 'utf8')
const js = await readFile(new URL('../docs/site.js', import.meta.url), 'utf8')
const referenced = [...html.matchAll(/(?:src|href)="(assets\/[^\"]+)"/g)].map((match) => match[1])
for (const asset of new Set([...referenced, 'assets/desktop.png', 'assets/entry.png', 'assets/mobile.png'])) {
  await stat(new URL(`../docs/${asset}`, import.meta.url))
}
assert.match(html, /<h1>主线不停/)
assert.match(html, /id="install"/)
assert.match(html, /id="privacy"/)
assert.match(css, /@media\(max-width:700px\)/)
assert.match(css, /prefers-reduced-motion/)
assert.match(js, /navigator\.clipboard\.writeText/)
assert.match(js, /showModal\(\)/)
assert.ok(!/href="\/(?!\/)/.test(html), 'GitHub Pages assets and links must work from a repository subpath')
console.log(`Site assets verified: ${new Set(referenced).size} unique files; ${html.length} HTML chars`)
