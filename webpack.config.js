const modeDev = process.env.NODE_ENV !== 'production'
const webpack = require('webpack')
const MinicssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimezeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
    mode: modeDev ? 'development' : 'production',
    entry: './src/principal.js',
    output: {
        filename: 'principal.js',
        path: __dirname + '/public'
    },
    plugins: [
        new MinicssExtractPlugin({
            filename: "estilo.css"
        })
    ],
    devServer: {
        contentBase: './public',
        port: 8080
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true, 
                parallel: true
            }),
            new OptimezeCSSAssetsPlugin({})
        ]
    },
    module: {
        rules: [{
            test: /\.s?[ac]ss$/,
            use: [
                MinicssExtractPlugin.loader,
                // 'style-loader',
                'css-loader',
                'sass-loader'
            ]
        },
        {
            test: /\.(png|svg|jpg|gif)$/,
            use: ['file-loader']
        }]  
    }
}