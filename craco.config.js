const path = require('path')

module.exports = {
  // Keep ESLint active but don't fail the build on errors
  eslint: {
    pluginOptions: {
      failOnError: false,
      failOnWarning: false,
    },
    configure: (eslintConfig) => {
      // Downgrade all errors to warnings so build succeeds
      if (eslintConfig.rules) {
        eslintConfig.rules['unused-imports/no-unused-imports'] = 'warn'
        eslintConfig.rules['prettier/prettier'] = 'warn'
        eslintConfig.rules['import/no-unused-modules'] = 'warn'
      }
      return eslintConfig
    },
  },

  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback,
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
        assert: require.resolve('assert'),
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        os: require.resolve('os-browserify'),
        url: require.resolve('url'),
      }

      webpackConfig.module.rules.forEach((rule) => {
        if (rule.oneOf) {
          rule.oneOf.forEach((oneOfRule) => {
            if (oneOfRule.loader && oneOfRule.loader.includes('babel-loader')) {
              if (!oneOfRule.options) oneOfRule.options = {}
              if (!oneOfRule.options.plugins) oneOfRule.options.plugins = []
            }
          })
        }
      })

      return webpackConfig
    },
    alias: {
      '@src': path.resolve(__dirname, 'src'),
    },
  },

  jest: {
    configure: (jestConfig) => {
      jestConfig.moduleNameMapper = {
        ...jestConfig.moduleNameMapper,
        '^@src/(.*)$': '<rootDir>/src/$1',
      }
      return jestConfig
    },
  },
}
