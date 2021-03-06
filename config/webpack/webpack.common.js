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
                test: /\.ts$/,
                exclude: [/node_modules/,/\.test.ts$/],
                use: [{ loader: 'ts-loader', options: { appendTsSuffixTo: [/\.vue$/] } }],
            },
            {
                test: /\.vue$/,
                use: ["vue-loader"]
            },
            {
                test: /\.css$/,
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
                test: /\.s(c|a)ss$/,
                use: [
                    'vue-style-loader',
                    {loader:'css-loader', options: {esModule:false}},
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation:require('sass')

                        }
                    }
              
                    
                ]
            }
        ]
       

    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: INDEX_HTML,
        })
     
    ]

}