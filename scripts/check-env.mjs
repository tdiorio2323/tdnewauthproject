import fs from 'node:fs'

function loadLocalEnv() {
  const env = { ...process.env }
  const file = '.env.local'
  if (!fs.existsSync(file)) return env
  const content = fs.readFileSync(file, 'utf8')
  for (const raw of content.split(/\r?\n/)) {
    if (!raw || raw.trim().startsWith('#')) continue
    const match = raw.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/)
    if (!match) continue
    const key = match[1]
    let val = match[2]
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1)
    }
    env[key] = val
  }
  return env
}

const env = loadLocalEnv()
const missing = []
for (const key of ['VITE_SUPABASE_URL', 'VITE_SUPABASE_ANON_KEY']) {
  if (!env[key]) missing.push(key)
}

if (missing.length) {
  console.error(`\n[env] Missing required env var(s): ${missing.join(', ')}`)
  console.error('Create .env.local from .env.example and fill values.')
  process.exit(1)
}

