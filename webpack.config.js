const path = require('path');
const webpack = require('webpack');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const uglifier =  new UglifyJsPlugin({
                        test: /\.js($|\?)/i
                      });

const TARGET = process.env.npm_lifecycle_event;
console.log("target event is " + TARGET);

module.exports = {
    entry: {
        app: './src/entry/app.js'
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: 'js/[name].bundle.js'
    },
    resolve: {
         modules: [
            path.resolve('node_modules'), // NPM
          ],
          alias: {
            "bootstrap-sass$": "bootstrap-sass/assets/stylesheets/bootstrap",
            less: path.resolve(__dirname, "src/less"), // Where LESS resources are currently stored.
            css: path.resolve(__dirname, "dist/css"), // Where rendered CSS files reside.
            sass: path.resolve(__dirname, "src/sass")
          }
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {loader:"style-loader"},
                    {loader: "css-loader"},
                ]
            },

            {
                test: /\.(png|svg|jpg|gif)$/,
                exclude: /node-modules/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[hash].[ext]',
                        outputPath: 'assets/images/',
                        publicPath: '../'
                    }
                }]
            },

            // Font Management
            {
                test: /\.woff2?$|\.ttf$|\.eot$|\.svg$/,
                exclude: /images/,
                use: [{
                    loader: "file-loader",
                    options: {
                        name: '[hash].[ext]',
                        outputPath: 'assets/fonts/', // where the fonts will go
                        publicPath: '../' // override the default path
                    }
                }]
            },

            {
                test: /\.scss$/,
                use: [
                    {
                      loader: MiniCssExtractPlugin.loader,
                      options: {
                        publicPath: (resourcePath, context) => {
                          // publicPath is the relative path of the resource to the context
                          // e.g. for ./css/admin/main.css the publicPath will be ../../
                          // while for ./css/main.css the publicPath will be ../
                          return path.relative(path.dirname(resourcePath), context) + '/';
                        },
                      },
                    },
                    'css-loader',
                  ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['env']
                  }
                }
            }
        ]
    },
    plugins:[
        new MiniCssExtractPlugin({
            filename: '[name].min.css',
          }),
        uglifier,
        new webpack.ProvidePlugin({
          $: "jquery",
          jQuery: "jquery"
        })
    ],
};
