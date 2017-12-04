const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const autoprefixer = require('autoprefixer');

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const NpmInstallPlugin = require('npm-install-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

// Extractors
const extractCSS = new ExtractTextPlugin('css/[name].min.css');
const extractLESS = new ExtractTextPlugin('css/[name].min.css');
const extractSASS = new ExtractTextPlugin('css/[name].min.css');

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


            // LESS Handler
            {
                test: /\.less$/,
                use: extractLESS.extract({
                    use: [
                        {loader:"css-loader"},
                        {loader:"less-loader"}
                    ],
                    fallback: "style-loader"
                })
            },

            {
                test: /\.scss$/,
                use: extractSASS.extract({
                    use: [{
                        loader: "css-loader" // translates CSS into CommonJS
                    }, {
                        loader: "sass-loader" // compiles Sass to CSS
                    }],
                    fallback: "style-loader"
                })
            },
            {
                test: /\.js$/,
                use: "babel-loader",
                exclude: /node_modules/
            }
        ]
    },
    plugins:[
        extractSASS,
        extractLESS,
        extractCSS,
        uglifier,
        new webpack.ProvidePlugin({
          $: "jquery",
          jQuery: "jquery"
        })
    ],
};
