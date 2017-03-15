const NODE_ENV = process.env.NODE_ENV || 'development';

const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = {};

config.context = path.join(__dirname, '/src');

config.entry = {
  app: './index.js',
  vendor: [
    'vue',
    'vuex'
  ],
};

config.resolve = {
  extensions: ['.js', '.vue', '.json'],
  alias: {
    'vue$': 'vue/dist/vue.esm.js'
  }
};

config.module = {
  loaders: [
    {
      test: /\.(jpg|png|svg)$/,
      use: 'file-loader',
      options: {
        name: '[path][name].[ext]',
      },
    },
  ],
  rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: 'babel-loader'
    },
    {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        loaders: {
          css: ExtractTextPlugin.extract({
            use: 'css-loader',
            fallback: 'vue-style-loader'
          })
        }
      }
    }
  ],
};

config.plugins = [
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'index.html'
  }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(NODE_ENV),
    },
  }),
  new ExtractTextPlugin('styles.css')
];


// Development

if (NODE_ENV === 'development') {
  config.output = {
    path: path.join(__dirname, './dist/'),
    filename: '[name].js',
  };

  config.plugins.push(
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.js' })
  );

  config.devServer = {
    contentBase: path.join(__dirname, 'dist'),
    watchContentBase: true
    // hot: true
  }

  config.devtool = 'cheap-source-map';
}

// Production

if (NODE_ENV === 'production') {
  config.output = {
    path: path.join(__dirname, './dist/'),
    filename: '[name].min.js',
  };

  config.plugins.push(
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.js' })
  );

  config.plugins.push(
    new CopyWebpackPlugin([
      { from: 'assets', to: 'assets' },
    ], {
      copyUnmodified: false,
    })
  );


  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      compress: {
        dead_code: true, // eslint-disable-line camelcase
        screw_ie8: true, // eslint-disable-line camelcase
        unused: true,
        warnings: false,
      },
      mangle: {
        screw_ie8: true,  // eslint-disable-line camelcase
      },
    })
  );
}

module.exports = config;
