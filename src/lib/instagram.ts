import { getFunctions, httpsCallable } from 'firebase/functions'
import { app } from './firebase'

export interface InstagramPost {
  id: string
  imageUrl: string
  permalink: string
  caption?: string
}

interface InstagramFeedResponse {
  posts: InstagramPost[]
}

export async function getInstagramFeed(limit = 8): Promise<InstagramPost[]> {
  const functions = getFunctions(app)
  const callable = httpsCallable<{ limit?: number }, InstagramFeedResponse>(
    functions,
    'getInstagramFeed',
  )
  const result = await callable({ limit })
  return result.data.posts
}
