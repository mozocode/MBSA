import { onRequest } from 'firebase-functions/v2/https'
import { downloadInstagramImage } from './instagram'

/** Proxy Instagram CDN images so they load reliably in the browser. */
export const proxyInstagramImage = onRequest({ cors: true }, async (req, res) => {
  const sourceUrl = typeof req.query.url === 'string' ? req.query.url : ''
  if (!sourceUrl) {
    res.status(400).send('Missing url')
    return
  }

  try {
    const { body, contentType } = await downloadInstagramImage(sourceUrl)
    res.set('Content-Type', contentType)
    res.set('Cache-Control', 'public, max-age=3600')
    res.status(200).send(body)
  } catch {
    res.status(502).send('Failed to load image')
  }
})
