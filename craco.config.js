const CracoAntDesignPlugin = require('craco-antd');

module.exports = {
  plugins: [
    {
      plugin: CracoAntDesignPlugin,
      options: {
        babelPluginImportOptions: {
          libraryDirectory: 'es',
        },
      },
    },
  ],
};
