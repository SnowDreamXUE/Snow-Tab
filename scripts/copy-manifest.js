import { copyFileSync, mkdirSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const rootDir = join(__dirname, '..')

// Copy manifest.json to dist folder
try {
  copyFileSync(
    join(rootDir, 'public', 'manifest.json'),
    join(rootDir, 'dist', 'manifest.json')
  )
  console.log('✓ manifest.json copied to dist/')
  
  // Copy Nekoha.png to dist folder for icons
  copyFileSync(
    join(rootDir, 'public', 'Nekoha.png'),
    join(rootDir, 'dist', 'Nekoha.png')
  )
  console.log('✓ Nekoha.png copied to dist/')
  
  console.log('\n✓ Chrome extension build complete!')
  console.log('Load the extension from the dist/ folder in Chrome:')
  console.log('1. Open chrome://extensions/')
  console.log('2. Enable "Developer mode"')
  console.log('3. Click "Load unpacked"')
  console.log('4. Select the dist/ folder')
} catch (error) {
  console.error('Error copying files:', error)
  process.exit(1)
}
