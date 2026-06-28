import { initializeApp } from 'firebase-admin/app'
import { syncInstagramFeedToFirestore } from './instagram'

initializeApp()

syncInstagramFeedToFirestore()
  .then((posts) => {
    console.log(`Synced ${posts.length} Instagram posts (images mirrored to Storage)`)
    posts.slice(0, 3).forEach((p) => console.log(' ', p.imageUrl.slice(0, 80)))
  })
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
