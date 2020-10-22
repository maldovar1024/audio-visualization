# 音频可视化—— Rust 与 WebAssembly

此分支是 Rust 与 WebAssembly 的试验，在这里记录一下需要的配置以及 Rust 中的相应的 API

## webpack 配置

webpack 插件 `@wasm-tool/wasm-pack-plugin` 可以实现监听 Rust 源文件的变化并实时编译成 WebAssembly 代码，同时所有生成的代码都默认支持 Typescript，这使得 Rust 代码的开发体验十分接近 Typescript。

具体 API 参考：https://www.npmjs.com/package/@wasm-tool/wasm-pack-plugin

安装插件：

```sh
yarn add -D @wasm-tool/wasm-pack-plugin
```

注意，要使用此插件，`wasm-pack` 必须在环境变量中，可以[在此下载](https://rustwasm.github.io/wasm-pack/installer/)

### 原生 webpack 配置

```js
const WasmPackPlugin = require('@wasm-tool/wasm-pack-plugin');

module.exports = {
  plugins: [
    new WasmPackPlugin({
      // Cargo.toml 所在的文件夹
      crateDirectory: wasmSrcDir,
      // 编译出的 WebAssembly 代码所在的文件夹
      outDir: path.resolve(reactSrcDir, 'wasm'),
    }),
  ]
};
```

### react 项目的配置（使用 craco）

```js
const { getLoader, loaderByName } = require('@craco/craco');
const WasmPackPlugin = require('@wasm-tool/wasm-pack-plugin');
const path = require('path');

const reactSrcDir = path.resolve(__dirname, 'src');
const wasmSrcDir = path.resolve(__dirname, 'crate');

const wasmExtension = /\.wasm$/;

module.exports = {
  webpack: {
    plugins: [
      new WasmPackPlugin({
        crateDirectory: wasmSrcDir,
        outDir: path.resolve(reactSrcDir, 'wasm'),
      }),
    ],
    /**
     * 必须把 .wasm 文件从默认的 file-loader 中排除，否则会出现加载错误的问题
     */
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
```

## Rust 的 API

`wasm-bindgen` 提供了 Rust 代码的 Web API，包括各种 Web API 的接口以及 Javascript 类型的映射。

具体文档参考[这里](https://rustwasm.github.io/wasm-bindgen/api/js_sys/index.html)，本项目中的示例代码在 [crate](crate) 文件夹中。