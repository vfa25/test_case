const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

var config = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader', 'css-loader'
        ]
      }
    ]
  },
  plugins: []
};

module.exports = (env, argv) => {
  config.entry = fs.readdirSync(__dirname).reduce((entries, dir) => {
    const fullDir = path.join(__dirname, dir)
    const entry = path.join(fullDir, 'client.js')
    if (fs.statSync(fullDir).isDirectory() && fs.existsSync(entry)) {
      if (argv.mode === 'development') {
        entries[dir] = ['webpack-hot-middleware/client', entry]
      } else {
        entries[dir] = entry
      }
    }
    return entries
  }, {})

  config.plugins = fs.readdirSync(__dirname).reduce((entries, dir) => {
    const fullDir = path.join(__dirname, dir)
    const entry = path.join(fullDir, 'index.html')
    if (fs.statSync(fullDir).isDirectory() && fs.existsSync(entry)) {
      entries.push(new HtmlWebpackPlugin({
        filename: dir + '/index.html',
        template: entry
      }))
    }
    return entries
  }, [])
  

  if (argv.mode === 'development') {
    config.mode = 'development'
    config.devtool = '#cheap-module-eval-source-map'

    config.output = {
      path: path.join(__dirname, '__build__'),
      filename: '[name].js',
      publicPath: '/__build__/'
    }
    config.plugins = config.plugins.concat[
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    ]
  }

  if (argv.mode === 'production') {
    config.mode = 'production'
    config.devtool = 'source-map'

    config.output = {
      path: path.join(__dirname, './dist'),
      publicPath: '/',
      filename: '[name]/[name].[hash].js'
    }
    config.plugins.push(
      new CleanWebpackPlugin({
        cleanAfterEveryBuildPatterns: ['dist']
      })
    )
    
  }

  return config;
};


