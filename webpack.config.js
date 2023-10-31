const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (env) => {
  console.log(process.env.NODE_ENV)
  const isDev = process.env.NODE_ENV === 'development'
  return {
    mode: isDev ? 'development' : 'production',
    entry: {
      app: path.resolve('src/index.js')
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[contenthash].js',
      clean: true
    },
    devtool: isDev ? 'source-map' : false,
    module: {
      rules: [
        {
          test: /\.s[ac]ss|css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    debug: true,
                    useBuiltIns: 'usage',
                    corejs: '3.33.2 '
                  }
                ]
              ]
            }
          }
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Webpack',
        filename: 'index.html',
        template: 'src/template.html'
      }),
      new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' })
    ],
    devServer: {
      static: {
        directory: 'dist'
      },
      port: 3000,
      open: true,
      hot: true,
      compress: true,
      historyApiFallback: true
    }
  }
}
