const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  assetsDir: './',
  css: {
    extract: true,
    sourceMap: true,
  }
})
