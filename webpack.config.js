const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CopyWebpackPlugin=require('copy-webpack-plugin');

let name="rack";

module.exports = {
    mode: 'production',
    entry: {
        // test:'./src/packages/rack/index.vue',
        [name]:`./src/packages/${name}/index.vue`
    },
    output: {
        path: path.resolve(__dirname, `lib/${name}`),
        filename: 'index.js',
        library: '[name]',
        libraryTarget:'commonjs-module'  //"var" | "assign" | "this" | "window" | "self" | "global" | "commonjs" | "commonjs2" | "commonjs-module" | "amd" | "amd-require" | "umd" | "umd2" | "jsonp" | "system"
        // jsonpFunction:'webpackJsonp'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            '@': path.resolve(__dirname, './src')
        },
        modules: ['node_modules']
    },
    plugins: [
        new VueLoaderPlugin(),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, `./src/packages/${name}/img`),
                to: './img',
                ignore: ['.*']
            }
        ])
    ],
    module: {
        rules: [
            {//vue 解析
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {//css 解析
                test: /\.(le|sa|sc|c)ss$/,
                use: ['vue-style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                use: ['file-loader'],
                // exclude:  [path.resolve(__dirname,'./src/icons')]
            },
            // {
            //     test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
            //     use: [
            //         {
            //             loader: 'url-loader',
            //             options: {
            //                 limit: 1024 * 4,
            //                 esModule: false,
            //                 fallback: {
            //                 loader: require.resolve('file-loader'),
            //                 options: {
            //                         name: `img/[name].[ext]`
            //                     }
            //                 }
            //             }
            //         }
            //     ]
            // },
        ]
    }
}
