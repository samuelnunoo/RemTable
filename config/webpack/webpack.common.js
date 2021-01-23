const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CopyPlugin = require("copy-webpack-plugin")
const VueLoaderPlugin = require("vue-loader/lib/plugin")
const SRC = path.resolve(__dirname,"../../src")
const DIST = path.resolve(__dirname, "../../dist")
const ENTRY = path.resolve(__dirname, "../../src/vue/index.ts")
const STATIC = path.resolve(__dirname, "../../public/static")
const INDEX_HTML = path.resolve(__dirname, "../../public/index.html")

module.exports = {
    entry: [ENTRY],
    resolve: {
        extensions: [".js",".ts",".json",".vue"]
    },
    module:{
        rules: [
            {
                test: /\.vue$/,
                use: ["vue-loader"]
            },
            {
                test: /\.css$/,
                exclude:/node_modules/,
                use: [
                    'vue-style-loader',
                    {
                        loader:"css-loader",
                        options: {
                            esModule: false
                        }
                    },
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'vue-style-loader',
                    {loader:'css-loader', options: {esModule:false}},
                        'sass-loader'
                ]
            }
        ]
       

    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: INDEX_HTML,
            minify: {
                collapseWhitespace: true,
                removeComments: true 
                    }
        })
     
    ]

}