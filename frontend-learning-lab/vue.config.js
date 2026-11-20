const fs = require('node:fs');
const path = require('node:path');
const { parseEnv } = require('node:util');
const { DefinePlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = (_env, argv) => {
  const mode = argv.mode ?? 'development';
  const envFile = path.join(__dirname, `.env.${mode}`);
  const { APP_TITLE } = parseEnv(fs.readFileSync(envFile, 'utf8'));

  return {
    mode,
    entry: './src/main.js',
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'js/[name].[contenthash:8].js',
      chunkFilename: 'js/[name].[contenthash:8].js',
      publicPath: '/',
      clean: true,
    },
    devtool: mode === 'development' ? 'eval-source-map' : false,
    module: {
      rules: [
        { test: /\.vue$/, loader: 'vue-loader' },
        { test: /\.css$/i, use: ['style-loader', 'css-loader'] },
        { test: /\.(png|jpe?g|gif|svg|webp|ico)$/i, type: 'asset/resource' },
      ],
    },
    plugins: [
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'public/index.html'),
        title: APP_TITLE,
      }),
      new DefinePlugin({
        __VUE_OPTIONS_API__: JSON.stringify(true),
        __VUE_PROD_DEVTOOLS__: JSON.stringify(false),
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false),
      }),
    ],
    devServer: {
      host: '127.0.0.1',
      port: 8080,
      static: false,
      historyApiFallback: true,
    },
  };
};
