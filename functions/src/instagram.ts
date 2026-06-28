import https from 'node:https'

const IG_APP_ID = '936619743392459'
const IG_USERNAME = 'mbsagators'
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

let cachedPosts: InstagramPost[] | null = null
let cachedAt = 0

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

export async function fetchInstagramPosts(limit = 8): Promise<InstagramPost[]> {
  const now = Date.now()
  if (cachedPosts && now - cachedAt < CACHE_TTL_MS) {
    return cachedPosts.slice(0, limit)
  }

  const json = (await fetchInstagramProfile()) as {
    data?: {
      user?: {
        edge_owner_to_timeline_media?: {
          edges?: Array<{ node?: InstagramNode }>
        }
      }
    }
  }

  const edges = json.data?.user?.edge_owner_to_timeline_media?.edges ?? []
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

  cachedPosts = posts
  cachedAt = now
  return posts.slice(0, limit)
}
