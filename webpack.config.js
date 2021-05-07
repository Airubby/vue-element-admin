const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: path.resolve(__dirname, './src/views/pages/dashboard/index.vue'),
    output: {
        path: path.resolve(__dirname, 'lib'),
        filename: 'bundle.js',
        library: 'views-pages-dashboard'
    },
    
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            '@': path.resolve(__dirname, './src')
        },
        // modules: ['node_modules']
    },
    optimization: {
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
    },
    module: {
        rules: [
            {//vue 解析
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {//css 解析
                test: /\.(le|sa|sc|c)ss$/,
                use: ['vue-style-loader', 'css-loader']
            },
            // {//js 解析
            //     test: /\.js$/,
            //     use: ['vue-style-loader', 'css-loader']
            // }
        ]
    },
    plugins: [
        new ProgressBarPlugin(),
        new VueLoaderPlugin()
    ]
}