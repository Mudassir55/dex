const webpack = require('webpack')

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.resolve = {
        ...webpackConfig.resolve,

        fallback: {
          ...webpackConfig.resolve.fallback,

          // Node.js core module polyfills for Webpack 5
          crypto: require.resolve('crypto-browserify'),
          stream: require.resolve('stream-browserify'),
          buffer: require.resolve('buffer/'),
          process: require.resolve('process/browser.js'),
          path: require.resolve('path-browserify'),

          // Optional safe fallbacks
          fs: false,
          net: false,
          tls: false,
        },

        alias: {
          ...webpackConfig.resolve.alias,

          // Fix strict ESM issue: process/browser -> process/browser.js
          'process/browser': require.resolve('process/browser.js'),
        },
      }

      webpackConfig.plugins = [
        ...webpackConfig.plugins,

        new webpack.ProvidePlugin({
          Buffer: ['buffer', 'Buffer'],
          process: 'process/browser.js',
        }),
      ]

      return webpackConfig
    },
  },
}
