const WasmPackPlugin = require('@wasm-tool/wasm-pack-plugin');
const CracoLessPlugin = require('craco-less');
const path = require('path');

const reactSrcDir = path.resolve(__dirname, 'src');
const wasmSrcDir = path.resolve(__dirname, 'crate');

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
  },
};
