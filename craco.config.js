const CracoAntDesignPlugin = require('craco-antd');
const { getThemeVariables } = require('antd/dist/theme');

module.exports = {
  plugins: [
    {
      plugin: CracoAntDesignPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              ...getThemeVariables({
                dark: true,
              }),
              'border-color-base': '#847f7f',
            },
          },
        },
        babelPluginImportOptions: {
          libraryDirectory: 'es',
        },
      },
    },
  ],
};
