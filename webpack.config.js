var webpack = require('webpack')

module.exports = {
  // This is the "main" file which should include all other modules
  entry: __dirname + '/src/main.js',
  // Where should the compiled file go?
  output: {
    // To the `dist` folder
    path: __dirname + '/working-example/',
    // With the filename `build.js` so it's dist/build.js
    filename: 'build.js'
  },
  plugins: [
    // ...
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    })
  ],
  module: {
    // Special compilation rules
    loaders: [
      {
        // Ask webpack to check: If this file ends with .js, then apply some transforms
        test: /\.js$/,
        // Transform it with babel
        loader: 'babel-loader',
        // don't transform node_modules folder (which don't need to be compiled)
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  }
}