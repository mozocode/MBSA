import https from 'node:https'
import { getFirestore, Timestamp } from 'firebase-admin/firestore'

const IG_APP_ID = '936619743392459'
const IG_USERNAME = 'mbsagators'
const CACHE_DOC = 'settings/instagramFeed'
const CACHE_TTL_MS = 60 * 60 * 1000

export interface InstagramPost {
  id: string
  imageUrl: string
  permalink: string
  caption?: string
}

interface InstagramNode {
  id: string
  shortcode: string
  display_url?: string
  thumbnail_src?: string
  edge_media_to_caption?: {
    edges?: Array<{ node?: { text?: string } }>
  }
}

interface CacheDoc {
  posts: InstagramPost[]
  updatedAt: FirebaseFirestore.Timestamp
}

let memoryCache: InstagramPost[] | null = null
let memoryCachedAt = 0

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
    request.setTimeout(15_000, () => {
      request.destroy(new Error('Instagram request timed out'))
    })
  })
}

function parseInstagramPosts(json: unknown): InstagramPost[] {
  const edges =
    (json as {
      data?: { user?: { edge_owner_to_timeline_media?: { edges?: Array<{ node?: InstagramNode }> } } }
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

  if (posts.length === 0) {
    throw new Error('No Instagram posts returned')
  }

  return posts
}

async function readFirestoreCache(): Promise<InstagramPost[] | null> {
  const snap = await getFirestore().doc(CACHE_DOC).get()
  if (!snap.exists) return null
  const data = snap.data() as CacheDoc | undefined
  if (!data?.posts?.length) return null
  return data.posts
}

async function writeFirestoreCache(posts: InstagramPost[]): Promise<void> {
  const sanitized = posts.map(({ id, imageUrl, permalink, caption }) => {
    const post: InstagramPost = { id, imageUrl, permalink }
    if (caption) post.caption = caption
    return post
  })
  await getFirestore()
    .doc(CACHE_DOC)
    .set({
      posts: sanitized,
      updatedAt: Timestamp.now(),
    })
}

async function fetchLiveInstagramPosts(): Promise<InstagramPost[]> {
  const json = await fetchInstagramProfile()
  return parseInstagramPosts(json)
}

export async function fetchInstagramPosts(limit = 8): Promise<InstagramPost[]> {
  const now = Date.now()
  if (memoryCache && now - memoryCachedAt < CACHE_TTL_MS) {
    return memoryCache.slice(0, limit)
  }

  try {
    const posts = await fetchLiveInstagramPosts()
    memoryCache = posts
    memoryCachedAt = now
    await writeFirestoreCache(posts).catch(() => undefined)
    return posts.slice(0, limit)
  } catch {
    const cached = (await readFirestoreCache()) ?? memoryCache
    if (cached?.length) {
      memoryCache = cached
      memoryCachedAt = now
      return cached.slice(0, limit)
    }
    throw new Error('Instagram feed unavailable')
  }
}

/** Used by sync script via dynamic import path duplication. */
export async function syncInstagramFeedToFirestore(): Promise<InstagramPost[]> {
  const posts = await fetchLiveInstagramPosts()
  await writeFirestoreCache(posts)
  memoryCache = posts
  memoryCachedAt = Date.now()
  return posts
}
