const path = require('path')
const merge = require("webpack-merge")
const common = require('./webpack.common')
const DIST = path.resolve(__dirname,"../../dist")


module.exports = merge.merge(common, {
    mode:'production',
    output: {
        path: DIST,
        filename: 'rem-table.js',
        publicPath: './'
    }
})