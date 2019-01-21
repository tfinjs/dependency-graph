const { readFileSync } = require('fs');
const { resolve } = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: {
    main: './src/index.js',
  },
  output: {
    filename: './dist/index.js',
    path: __dirname,
    libraryTarget: 'commonjs2',
  },
  externals: nodeExternals({
    whitelist: ['lodash/camelCase', 'lodash/set'],
  }),
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: JSON.parse(readFileSync(resolve(__dirname, '.babelrc'))),
        },
      },
    ],
  },
  target: 'node',
};
