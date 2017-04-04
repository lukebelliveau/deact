var nodeExternals = require('webpack-node-externals');

module.exports = {
  target: 'node',
  externals: [nodeExternals()],

  resolve: {
    extensions: [".js", ".jsx"],
  },

  module: {
    loaders: [
      { test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/ },
      { test: /\.jsx$/,
        loader: 'babel-loader',
        exclude: /node_modules/ },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      }
    ]
  }
};