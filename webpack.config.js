const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CopyWebpackPlugin=require('copy-webpack-plugin');

let name="rack",name1="test",name2="test1";

let array=["rack","test","test1"],entry={},assets=[];
array.forEach(element => {
    entry[element]=`./src/packages/${element}/index.vue`
    assets.push({
        from: path.resolve(__dirname, `./src/packages/${element}/images`),
        to: `./lib/${element}/images`,
        ignore: ['.*']
    })
});

module.exports = {
    mode: 'production',
    // entry: {
    //     [name]:`./src/packages/${name}/index.vue`,
    //     [name1]:`./src/packages/${name1}/index.vue`,
    //     [name2]:`./src/packages/${name2}/index.vue`
    // },
    entry: entry,
    output: {
        // path: path.resolve(__dirname, `lib/${name}`),
        path: __dirname,
        filename: `./lib/[name]/index.js`,
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
        new CopyWebpackPlugin(assets)
        // new CopyWebpackPlugin([
        //     {
        //         from: path.resolve(__dirname, `./src/packages/${name1}/images`),
        //         to: `./lib/${name1}/images`,
        //         ignore: ['.*']
        //     },
        //     {
        //         from: path.resolve(__dirname, `./src/packages/${name2}/images`),
        //         to: `./lib/${name2}/images`,
        //         ignore: ['.*']
        //     }
        // ])
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
