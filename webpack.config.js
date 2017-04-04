const path = require('path');
module.exports = {
  entry: './src/renderDOM.jsx',
  output: {
    path: path.resolve('dist'),
    filename: 'app.bundle.js',
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  },
};
