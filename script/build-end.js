const { copyFile } = require('fs/promises')
const { resolve } = require('path')

copyPluginFile('preload.js')
copyPluginFile('plugin.json')
copyPluginFile('logo.png')

function copyPluginFile(fileName) {
  const rootDir = resolve(__dirname, '..')
  const outDir = resolve(rootDir, 'dist')

  copyFile(resolve(rootDir, fileName), resolve(outDir, fileName))
}
