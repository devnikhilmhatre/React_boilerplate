const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true // set to true if you want JS source maps
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    devtool: 'eval-source-map',
    entry: {
        main: __dirname + "/app/main.js",
        sw: __dirname + "/sw.js",
    },
    output: {
        path: __dirname + "/public",
        filename: "[name].js"
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [
                    /node_module/,
                    /^sw\.js$/
                ],
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
                // use: [
                //     'style-loader',
                //     'css-loader'
                // ]
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + "/index.html",
            favicon:__dirname + "/favicon.ico",
            // inject:false
            excludeChunks:['sw']
        }),
        new MiniCssExtractPlugin({
            filename: "main.css",
        })
    ],
    devServer: {
        contentBase: __dirname + "/public",
        port: 3000,
        compress: true,
        historyApiFallback: true,
        inline: true,
        // hot: true
    }
}
