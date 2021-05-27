const webpack = require('webpack');
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    mode: 'production',
    // entry: {
    //     'views-pages-sysconfig-baseconfig-sysparams':'./src/views/pages/sysconfig/baseconfig/sysparams/index.vue'
    // },
    entry: path.resolve(__dirname, './src/config.js'),
    output: {
        path: path.resolve(__dirname, './packages'),
        filename: '[name].js',
        // chunkFilename: '[name].js',
        jsonpFunction:'webpackJsonp'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            '@': path.resolve(__dirname, './src')
        },
        modules: ['node_modules']
    },
    optimization: {
        namedChunks: true,
        moduleIds: 'named', //"natural" | "named" | "hashed" | "size" | "total-size" | false
        chunkIds:"named",
        minimize: false,
        minimizer: [
            new TerserPlugin({ 
                terserOptions: { 
                    compress: { 
                        drop_console: true,
                        drop_debugger: true,
                    },
                    output:{
                        comments: false
                    } 
               }
            })
        ],
        splitChunks:{
            chunks: 'all',
        },
        runtimeChunk: {
            name: 'manifest'
        },
    },
    module: {
        rules: [
            {//vue 解析
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {//css 解析
                test: /\.(le|sa|sc|c)ss$/,
                use: ['vue-style-loader', 'css-loader','less-loader']
            },
            {
                test: /\.svg$/,
                loader:'svg-sprite-loader',
                include:[path.resolve(__dirname,'./src/icons')],
                options:{  symbolId: 'icon-[name]'  }   
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                use: ['file-loader'],
                exclude:  [path.resolve(__dirname,'./src/icons')]
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                loader: 'file-loader'
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new webpack.HashedModuleIdsPlugin({//生成稳定的模块id
            hashFunction: 'sha256',
            hashDigest: 'hex',
            hashDigestLength: 20
        })
    ]
}