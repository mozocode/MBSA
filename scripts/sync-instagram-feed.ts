import https from 'node:https'
import { initializeApp, applicationDefault, cert } from 'firebase-admin/app'
import { getFirestore, Timestamp } from 'firebase-admin/firestore'
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const IG_APP_ID = '936619743392459'
const IG_USERNAME = 'mbsagators'
const CACHE_DOC = 'settings/instagramFeed'

interface InstagramPost {
  id: string
  imageUrl: string
  permalink: string
  caption?: string
}

function initAdmin() {
  const serviceAccountPath = resolve(process.cwd(), 'serviceAccountKey.json')
  if (existsSync(serviceAccountPath)) {
    initializeApp({ credential: cert(JSON.parse(readFileSync(serviceAccountPath, 'utf-8'))) })
    return
  }
  initializeApp({ credential: applicationDefault(), projectId: 'mbsa-cbbf8' })
}

function fetchInstagramProfile(): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const request = https.get(
      {
        hostname: 'www.instagram.com',
        path: `/api/v1/users/web_profile_info/?username=${IG_USERNAME}`,
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'X-IG-App-ID': IG_APP_ID,
          Accept: '*/*',
        },
      },
      (response) => {
        let body = ''
        response.on('data', (chunk) => {
          body += chunk
        })
        response.on('end', () => {
          if (response.statusCode !== 200) {
            reject(new Error(`Instagram request failed (${response.statusCode})`))
            return
          }
          try {
            resolve(JSON.parse(body))
          } catch {
            reject(new Error('Instagram response was not valid JSON'))
          }
        })
      },
    )
    request.on('error', reject)
  })
}

function parsePosts(json: unknown): InstagramPost[] {
  const edges =
    (json as {
      data?: {
        user?: {
          edge_owner_to_timeline_media?: {
            edges?: Array<{
              node?: {
                id: string
                shortcode: string
                display_url?: string
                thumbnail_src?: string
                edge_media_to_caption?: { edges?: Array<{ node?: { text?: string } }> }
              }
            }>
          }
        }
      }
    }).data?.user?.edge_owner_to_timeline_media?.edges ?? []

  const posts: InstagramPost[] = []
  for (const edge of edges) {
    const node = edge.node
    if (!node?.id || !node.shortcode) continue
    const imageUrl = node.display_url ?? node.thumbnail_src
    if (!imageUrl) continue
    posts.push({
      id: node.id,
      imageUrl,
      permalink: `https://www.instagram.com/p/${node.shortcode}/`,
      caption: node.edge_media_to_caption?.edges?.[0]?.node?.text,
    })
  }
  return posts
}

async function main() {
  initAdmin()
  const json = await fetchInstagramProfile()
  const posts = parsePosts(json)
  if (posts.length === 0) {
    throw new Error('No Instagram posts found')
  }
  await getFirestore()
    .doc(CACHE_DOC)
    .set({
      posts: posts.map(({ id, imageUrl, permalink, caption }) => {
        const post: InstagramPost = { id, imageUrl, permalink }
        if (caption) post.caption = caption
        return post
      }),
      updatedAt: Timestamp.now(),
    })
  console.log(`Synced ${posts.length} Instagram posts to ${CACHE_DOC}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
