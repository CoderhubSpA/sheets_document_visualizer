const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  assetsDir: './',
  css: {
    extract: true,
    sourceMap: true,
  },
  configureWebpack: (config) => {
    // Sólo aplica cuando estás construyendo la librería
    // ajusta el if según el script que uses
    if ((process.env.npm_lifecycle_event || '').includes('build')) {
      if (!config.output) config.output = {};

      // Asegura formato de librería
      config.output.libraryTarget = 'umd';

      // 👇 Esto es clave para que el "global" no sea undefined
      // dentro de otro bundle Webpack
      config.output.globalObject = 'self'; // o 'self' si sólo te importa browser
    }
  },
})





module.exports = {
  // Si usas vue-cli-service build --target lib ...

};
