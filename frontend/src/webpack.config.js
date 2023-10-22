const webpack = require('webpack');

module.exports = {
  // Other Webpack configuration settings

  resolve: {
    fallback: {
        "crypto": require.resolve('crypto-browserify'),
    }
  }
};
