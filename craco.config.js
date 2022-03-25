const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      const modifiedWebpackConfig = {
        ...webpackConfig,
        entry: {
          main: [
            env === 'development' &&
              require.resolve('react-dev-utils/webpackHotDevClient'),
            paths.appIndexJs,
          ].filter(Boolean),
          content: './src/services/chromium/content-scripts.tsx',
        },
        output: {
          ...webpackConfig.output,
          filename: 'static/js/[name].js',
        },
        optimization: {
          ...webpackConfig.optimization,
          runtimeChunk: false,
        },
        resolve: {
          ...webpackConfig.resolve,
          fallback: { url: require.resolve('url/') },
        },
      };

      setMainEntityChuncks(['main'], modifiedWebpackConfig);
      addHtmlWebpackPluginEntity(
        'options',
        `${paths.appSrc}/options.tsx`,
        ['options'],
        modifiedWebpackConfig,
        env,
        paths
      );
      removeCssFileNameHash(modifiedWebpackConfig);

      return modifiedWebpackConfig;
    },
  },
};

const addHtmlWebpackPluginEntity = (
  entryName,
  entryPath,
  chuncks,
  webpackConfig,
  env,
  paths
) => {
  webpackConfig.entry[entryName] = entryPath;
  webpackConfig.plugins.splice(
    1,
    0,
    new HtmlWebpackPlugin({
      chunks: chuncks,
      filename: `${entryName}.html`,
      inject: true,
      minify: env === 'production',
      template: `${paths.appPublic}/${entryName}.html`,
    })
  );
};

const removeCssFileNameHash = (webpackConfig) => {
  const miniCssExtractPlugin = webpackConfig.plugins.find(
    (plugin) => plugin.constructor.name === 'MiniCssExtractPlugin'
  );

  if (miniCssExtractPlugin) {
    miniCssExtractPlugin.options.filename = 'static/css/[name].css';
  }
};

const setMainEntityChuncks = (chuncks, webpackConfig) => {
  webpackConfig.plugins[0].userOptions['chunks'] = chuncks;
};
