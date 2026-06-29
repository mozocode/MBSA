import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { Resvg } from '@resvg/resvg-js'
import sharp from 'sharp'

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicDir = join(__dirname, '..', 'public')
const svgPath = join(publicDir, 'og-image.svg')

const svg = readFileSync(svgPath)
const resvg = new Resvg(svg, {
  fitTo: { mode: 'width', value: 1200 },
  font: { loadSystemFonts: true },
  imagePath: publicDir,
})
const png = resvg.render().asPng()

writeFileSync(join(publicDir, 'og-image.png'), png)

const jpg = await sharp(png).jpeg({ quality: 92, mozjpeg: true }).toBuffer()
writeFileSync(join(publicDir, 'og-image.jpg'), jpg)

console.log('Generated public/og-image.png and public/og-image.jpg')
