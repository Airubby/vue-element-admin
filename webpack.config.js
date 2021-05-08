const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    mode: 'production',
    // entry: path.resolve(__dirname, './src/package/AirSys/Index.vue'),
    entry: path.resolve(__dirname, './package/main.js'),
    output: {
        path: path.resolve(__dirname, './package/dist'),
        filename: '[name].js',
        // chunkFilename: '[name].js',
        // library: 'libraryName'
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
                test: /\.(png|jpe?g|gif|svg)$/,
                use: ['file-loader'],
                // exclude:  [path.resolve(__dirname,'./src/icons')]
            }
        ]
    },
    plugins: [
        new ProgressBarPlugin(),
        new VueLoaderPlugin()
    ]
}