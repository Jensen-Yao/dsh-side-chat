import { mkdir, writeFile } from 'node:fs/promises'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import {
  Check, Copy, GitFork, History, LockKeyhole, MessageCirclePlus, PanelsTopLeft, X,
} from 'lucide-react'

const target = new URL('../docs/assets/', import.meta.url)
await mkdir(target, { recursive: true })

const icons = {
  mark: MessageCirclePlus,
  native: PanelsTopLeft,
  branch: GitFork,
  lock: LockKeyhole,
  tabs: PanelsTopLeft,
  history: History,
  copy: Copy,
  close: X,
  check: Check,
}

for (const [name, Icon] of Object.entries(icons)) {
  const content = renderToStaticMarkup(createElement(Icon, {
    'aria-hidden': true,
    color: 'currentColor',
    fill: 'none',
    size: 24,
    strokeWidth: 1.8,
  }))
  await writeFile(new URL(`${name}.svg`, target), `${content}\n`, 'utf8')
}
