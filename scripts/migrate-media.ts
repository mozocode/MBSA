/**
 * Downloads all mbsagators.com/wp-content/uploads assets referenced in the
 * codebase and rewrites URLs to local /media/ paths.
 *
 * Usage: npm run migrate:media
 */
import { mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'fs'
import { dirname, join, relative, resolve } from 'path'

const ROOT = resolve(process.cwd())
const PUBLIC_MEDIA = join(ROOT, 'public', 'media')
const PREFIX = 'https://mbsagators.com/wp-content/uploads/'
const LOCAL_PREFIX = '/media/'

/** Source URLs that moved or were renamed on the original WordPress site. */
const SOURCE_ALIASES: Record<string, string> = {
  [`${PREFIX}2024/01/MBSA-Code-of-Conduct.pdf`]:
    `${PREFIX}2024/05/MBSA-Code-of-Conduct.pdf`,
  [`${PREFIX}2024/01/MBSA-Constitution-and-By-Laws.pdf`]:
    `${PREFIX}2024/01/constitution-and-bylaws.pdf`,
  [`${PREFIX}2024/01/MBSA-Policies.pdf`]: `${PREFIX}2023/12/mba-policies.pdf`,
  [`${PREFIX}2024/01/Pressing-On-Logo.png`]: `${PREFIX}2023/12/pressing-on.png`,
  [`${PREFIX}2024/01/Dunhams-Sports-Logo.png`]: `${PREFIX}2023/12/dunhams.png`,
  [`${PREFIX}2024/01/All-American-Baseball-Center-Logo.png`]:
    `${PREFIX}2023/12/all_american_baseball_2022_large-1.png`,
  [`${PREFIX}2024/01/Union-Home-Mortgage-Logo.png`]:
    `${PREFIX}2023/12/img-1-2.png`,
  [`${PREFIX}2025/04/Summer-in-the-Swamp.jpg`]:
    `${PREFIX}2025/11/Summer-in-the-Swamp.jpg`,
  [`${PREFIX}2024/04/Swing-into-Spring.jpg`]:
    `${PREFIX}2025/11/F288A105-A4F1-4F76-8A05-D347E8A10B56.jpg`,
  [`${PREFIX}2025/11/Swing-into-Spring.jpg`]:
    `${PREFIX}2025/11/F288A105-A4F1-4F76-8A05-D347E8A10B56.jpg`,
}

/** Local /media paths mapped to their live source URL on mbsagators.com. */
const LOCAL_ASSET_SOURCES: Array<{ rel: string; url: string }> = [
  { rel: '2025/11/Spring-Ding.jpg', url: `${PREFIX}2025/11/Spring-Ding.jpg` },
  {
    rel: '2025/11/Swing-into-Spring.jpg',
    url: `${PREFIX}2025/11/F288A105-A4F1-4F76-8A05-D347E8A10B56.jpg`,
  },
  { rel: '2025/11/Summer-in-the-Swamp.jpg', url: `${PREFIX}2025/11/Summer-in-the-Swamp.jpg` },
  { rel: '2025/11/Summer-Slam.jpg', url: `${PREFIX}2025/11/Summer-Slam.jpg` },
  { rel: '2025/11/Beach-Bash.jpg', url: `${PREFIX}2025/11/Beach-Bash.jpg` },
  { rel: '2025/11/Pumpkin-Smash.jpg', url: `${PREFIX}2025/11/Pumpkin-Smash.jpg` },
  { rel: '2024/02/DSC_0830.jpeg', url: `${PREFIX}2024/02/DSC_0830.jpeg` },
  { rel: '2024/04/Swing-into-Spring.jpg', url: `${PREFIX}2025/11/F288A105-A4F1-4F76-8A05-D347E8A10B56.jpg` },
  { rel: '2025/04/Summer-in-the-Swamp.jpg', url: `${PREFIX}2025/11/Summer-in-the-Swamp.jpg` },
]

const EXTRA_URLS = [
  `${PREFIX}2024/02/IMG_7340.jpeg`,
  `${PREFIX}2024/02/IMG_7919.jpg`,
  `${LOCAL_PREFIX}2024/02/Screenshot-2024-02-28-at-12.44.00\u202fAM.png`.replace(
    LOCAL_PREFIX,
    PREFIX,
  ),
  `${LOCAL_PREFIX}2024/03/Screenshot-2024-03-05-at-12.38.48\u202fPM.png`.replace(
    LOCAL_PREFIX,
    PREFIX,
  ),
]

const EXT_RE = /\.(jpe?g|png|webp|svg|pdf|gif)$/i

function walk(dir: string, acc: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    if (entry === 'node_modules' || entry === 'dist' || entry === '.git' || entry === 'media') continue
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) walk(full, acc)
    else if (/\.(ts|tsx|js|json)$/.test(entry)) acc.push(full)
  }
  return acc
}

function extractUrls(text: string): string[] {
  const re = /https:\/\/mbsagators\.com\/wp-content\/uploads\/[^\s"'<>\\\)]+/g
  const urls = new Set<string>()
  for (const match of text.matchAll(re)) {
    let url = match[0].replace(/\\+$/, '')
    if (url.includes('${')) continue
    if (!EXT_RE.test(url.split('?')[0])) continue
    urls.add(url)
  }
  return [...urls]
}

function toLocalPath(url: string): string {
  const rel = url.slice(PREFIX.length)
  return join(PUBLIC_MEDIA, rel)
}

function downloadUrl(url: string): string {
  const parts = url.slice(PREFIX.length).split('/')
  const filename = encodeURIComponent(parts.pop()!).replace(/%2F/g, '/')
  return PREFIX + [...parts, filename].join('/')
}

async function downloadFromSource(url: string, dest: string): Promise<boolean> {
  mkdirSync(dirname(dest), { recursive: true })
  const fetchUrl = downloadUrl(url)
  try {
    const res = await fetch(fetchUrl, {
      headers: { 'User-Agent': 'MBSA-Asset-Migration/1.0' },
      redirect: 'follow',
    })
    if (!res.ok) {
      console.error(`  FAIL ${res.status} ${fetchUrl}`)
      return false
    }
    const buf = Buffer.from(await res.arrayBuffer())
    writeFileSync(dest, buf)
    console.log(`  OK   ${relative(ROOT, dest)}`)
    return true
  } catch (err) {
    console.error(`  ERR  ${fetchUrl}`, err)
    return false
  }
}

async function download(url: string, dest: string): Promise<boolean> {
  mkdirSync(dirname(dest), { recursive: true })
  const fetchUrl = downloadUrl(SOURCE_ALIASES[url] ?? url)
  try {
    const res = await fetch(fetchUrl, {
      headers: { 'User-Agent': 'MBSA-Asset-Migration/1.0' },
      redirect: 'follow',
    })
    if (!res.ok) {
      console.error(`  FAIL ${res.status} ${fetchUrl}`)
      return false
    }
    const buf = Buffer.from(await res.arrayBuffer())
    writeFileSync(dest, buf)
    const alias = fetchUrl !== url ? ` (alias of ${relative(PUBLIC_MEDIA, dest)})` : ''
    console.log(`  OK   ${relative(ROOT, dest)}${alias}`)
    return true
  } catch (err) {
    console.error(`  ERR  ${fetchUrl}`, err)
    return false
  }
}

async function main() {
  const files = walk(join(ROOT, 'src')).concat(walk(join(ROOT, 'scripts')))
  const urlSet = new Set<string>(EXTRA_URLS)

  for (const file of files) {
    if (file.endsWith('migrate-media.ts')) continue
    const text = readFileSync(file, 'utf-8')
    for (const url of extractUrls(text)) urlSet.add(url)
  }

  const urls = [...urlSet].sort()
  console.log(`Found ${urls.length} unique assets to download\n`)

  let ok = 0
  let fail = 0

  console.log('Tournament artwork (local /media paths):\n')
  for (const { rel, url } of LOCAL_ASSET_SOURCES) {
    const dest = join(PUBLIC_MEDIA, rel)
    if (statSync(dest, { throwIfNoEntry: false })?.isFile()) {
      console.log(`  skip ${relative(ROOT, dest)}`)
      ok++
      continue
    }
    if (await downloadFromSource(url, dest)) ok++
    else fail++
  }

  console.log('\nReferenced remote assets:\n')
  for (const url of urls) {
    const dest = toLocalPath(url)
    if (statSync(dest, { throwIfNoEntry: false })?.isFile()) {
      console.log(`  skip ${relative(ROOT, dest)}`)
      ok++
      continue
    }
    if (await download(url, dest)) ok++
    else fail++
  }

  console.log(`\nDownloaded: ${ok} ok, ${fail} failed\nRewriting source URLs...`)

  let rewritten = 0
  for (const file of files) {
    if (file.endsWith('migrate-media.ts')) continue
    const text = readFileSync(file, 'utf-8')
    if (!text.includes(PREFIX)) continue
    const next = text.replaceAll(PREFIX, LOCAL_PREFIX)
    if (next !== text) {
      writeFileSync(file, next)
      rewritten++
      console.log(`  ${relative(ROOT, file)}`)
    }
  }

  console.log(`\nDone. Rewrote ${rewritten} files.`)
  if (fail > 0) {
    console.warn('\nSome assets could not be downloaded. Re-run after adding SOURCE_ALIASES entries.')
    process.exit(1)
  }
}

main()
