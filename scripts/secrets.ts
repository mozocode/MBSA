import { execSync } from 'child_process'
import { readFileSync } from 'fs'
import { resolve } from 'path'

interface SecretEntry {
  name: string
  scope: string
  description: string
}

const PROJECT = 'mbsa-cbbf8'
const manifest: SecretEntry[] = JSON.parse(
  readFileSync(resolve(process.cwd(), 'secrets.manifest.json'), 'utf-8'),
)

function listRemoteSecrets(): string[] {
  try {
    const out = execSync(`gcloud secrets list --project=${PROJECT} --format="value(name)"`, {
      encoding: 'utf-8',
    })
    return out
      .trim()
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean)
  } catch {
    return []
  }
}

function printManifest() {
  console.log(`Platform secrets (project: ${PROJECT})\n`)
  const remote = new Set(listRemoteSecrets())

  for (const entry of manifest) {
    const status = remote.has(entry.name) ? '✓ set' : '✗ missing'
    console.log(`  ${status}  ${entry.name}`)
    console.log(`         scope: ${entry.scope}`)
    console.log(`         ${entry.description}\n`)
  }

  console.log('Store all values in Google Secret Manager:\n')
  for (const entry of manifest) {
    console.log(`  firebase functions:secrets:set ${entry.name} --project ${PROJECT}`)
  }
  console.log('\nPayments deploy without credentials — functions work but payments stay disabled until secrets are set.')
  console.log('When ready, store values in Secret Manager and switch functions/src/secrets.ts to defineSecret().')
  console.log('\nAfter updating secrets, redeploy functions:')
  console.log(`  firebase deploy --only functions --project ${PROJECT}`)
}

const cmd = process.argv[2]

if (!cmd || cmd === 'list') {
  printManifest()
} else if (cmd === 'set-all') {
  printManifest()
  console.log('\nRun each firebase functions:secrets:set command above to configure missing secrets.')
} else {
  console.error('Usage: npm run secrets [list|set-all]')
  process.exit(1)
}
