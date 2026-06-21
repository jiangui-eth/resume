#!/usr/bin/env node
/**
 * Link validity checker — verifies external URLs return non-404 responses.
 * Run: node apps/web/scripts/check-links.mjs
 */

import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const dataDir = join(__dirname, '../src/data')

const contact = JSON.parse(
  readFileSync(join(dataDir, 'contact.json'), 'utf-8'),
)
const profile = JSON.parse(
  readFileSync(join(dataDir, 'profile.json'), 'utf-8'),
)

const BASE_URL = process.env.SITE_URL ?? 'https://jiangui-resume.vercel.app'

const LINKS = [
  ...Object.values(contact).filter(
    v => typeof v === 'string' && v.startsWith('http'),
  ),
  ...(profile.socials ?? [])
    .map(s => s.url)
    .filter(u => u?.startsWith('http')),
  `${BASE_URL}/resume.pdf`,
]
  .filter(Boolean)
  .filter((v, i, a) => a.indexOf(v) === i)

const HEADERS = { 'User-Agent': 'Mozilla/5.0 (jiangui-resume/link-checker)' }

let failed = 0

for (const url of LINKS) {
  try {
    const res = await fetch(url, {
      method: 'HEAD',
      headers: HEADERS,
      redirect: 'follow',
      signal: AbortSignal.timeout(10_000),
    })
    const ok = res.status !== 404
    console.log(`${ok ? '✓' : '✗'} [${res.status}] ${url}`)
    if (!ok)
      failed++
  }
  catch (err) {
    console.log(`✗ [ERR] ${url}: ${err.message}`)
    failed++
  }
}

console.log(
  failed === 0
    ? `\nAll ${LINKS.length} links OK.`
    : `\n${failed}/${LINKS.length} link(s) failed.`,
)
process.exit(failed > 0 ? 1 : 0)
