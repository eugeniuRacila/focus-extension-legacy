module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      removeCssFileNameHash(webpackConfig);

      return {
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
      };
    },
  },
};

const removeCssFileNameHash = (webpackConfig) => {
  const miniCssExtractPlugin = webpackConfig.plugins.find(
    (plugin) => plugin.constructor.name === 'MiniCssExtractPlugin'
  );

  if (miniCssExtractPlugin) {
    miniCssExtractPlugin.options.filename = 'static/css/[name].css';
  }
};
