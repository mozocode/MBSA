import https from 'node:https'
import { randomUUID } from 'node:crypto'
import { getStorage } from 'firebase-admin/storage'
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

function downloadImage(url: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const request = https.get(
      url,
      {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          Referer: 'https://www.instagram.com/',
        },
      },
      (response) => {
        if (response.statusCode !== 200) {
          reject(new Error(`Image download failed (${response.statusCode})`))
          return
        }
        const chunks: Buffer[] = []
        response.on('data', (chunk) => chunks.push(Buffer.from(chunk)))
        response.on('end', () => resolve(Buffer.concat(chunks)))
      },
    )
    request.on('error', reject)
    request.setTimeout(20_000, () => {
      request.destroy(new Error('Image download timed out'))
    })
  })
}

function isMirroredUrl(url: string): boolean {
  return url.includes('firebasestorage.googleapis.com')
}

async function mirrorImageToStorage(postId: string, sourceUrl: string): Promise<string> {
  const bucket = getStorage().bucket()
  const objectPath = `instagram/${postId}.jpg`
  const file = bucket.file(objectPath)

  const [exists] = await file.exists()
  if (exists) {
    const [metadata] = await file.getMetadata()
    const token = metadata.metadata?.firebaseStorageDownloadTokens
    if (typeof token === 'string' && token) {
      return buildStorageUrl(bucket.name, objectPath, token)
    }
  }

  const buffer = await downloadImage(sourceUrl)
  const token = randomUUID()
  await file.save(buffer, {
    metadata: {
      contentType: 'image/jpeg',
      cacheControl: 'public, max-age=31536000',
      metadata: {
        firebaseStorageDownloadTokens: token,
      },
    },
    resumable: false,
  })

  return buildStorageUrl(bucket.name, objectPath, token)
}

function buildStorageUrl(bucketName: string, objectPath: string, token: string): string {
  const encoded = encodeURIComponent(objectPath)
  return `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${encoded}?alt=media&token=${token}`
}

async function mirrorPostImages(posts: InstagramPost[]): Promise<InstagramPost[]> {
  const mirrored: InstagramPost[] = []

  for (const post of posts) {
    if (isMirroredUrl(post.imageUrl)) {
      mirrored.push(post)
      continue
    }

    try {
      const imageUrl = await mirrorImageToStorage(post.id, post.imageUrl)
      mirrored.push({ ...post, imageUrl })
    } catch {
      mirrored.push(post)
    }
  }

  return mirrored
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
  const posts = parseInstagramPosts(json)
  return mirrorPostImages(posts)
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
      const needsMirror = cached.some((post) => !isMirroredUrl(post.imageUrl))
      const posts = needsMirror ? await mirrorPostImages(cached) : cached
      if (needsMirror) {
        await writeFirestoreCache(posts).catch(() => undefined)
      }
      memoryCache = posts
      memoryCachedAt = now
      return posts.slice(0, limit)
    }
    throw new Error('Instagram feed unavailable')
  }
}

export async function syncInstagramFeedToFirestore(): Promise<InstagramPost[]> {
  const posts = await fetchLiveInstagramPosts()
  await writeFirestoreCache(posts)
  memoryCache = posts
  memoryCachedAt = Date.now()
  return posts
}
