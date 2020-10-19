const { getLoader, loaderByName } = require('@craco/craco');
const WasmPackPlugin = require('@wasm-tool/wasm-pack-plugin');
const CracoLessPlugin = require('craco-less');
const path = require('path');

const reactSrcDir = path.resolve(__dirname, 'src');
const wasmSrcDir = path.resolve(__dirname, 'crate');

const wasmExtension = /\.wasm$/;

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  webpack: {
    plugins: [
      new WasmPackPlugin({
        crateDirectory: wasmSrcDir,
        outDir: path.resolve(reactSrcDir, 'wasm'),
      }),
    ],
    configure(webpackConfig) {
      const { isFound, match: fileLoaderMatch } = getLoader(
        webpackConfig,
        loaderByName('file-loader')
      );

      if (isFound) {
        fileLoaderMatch.loader.exclude.push(wasmExtension);
      }

      return webpackConfig;
    },
  },
};
