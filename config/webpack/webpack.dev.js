const path = require('path')
const merge = require("webpack-merge")
const common = require('./webpack.common')
const DIST = path.resolve(__dirname,"../../dist")


module.exports = merge.merge(common, {
    mode:'development',
    output: {
        path: DIST,
        filename: 'rem-table.js',
        publicPath: '/'
    },
    devServer: {
        hot: true,
        inline:true,
        overlay: true,
        disableHostCheck:true,
        historyApiFallback: true,
        watchOptions: {
            poll:true 
        },
        stats: {children: false}
    },
    devtool: "eval-cheap-module-source-map"
})