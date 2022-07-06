const path = require('path');

module.exports = {
  target: 'node',

  entry: {
    main: path.resolve(__dirname, './src/index.ts'),
  },

  output: {
    filename: 'output.js',
    path: path.resolve(__dirname, './build')
  },

  resolve: {
    extensions: ['.ts', '.js']
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          'ts-loader',
        ],
      },
    ],
  },
}