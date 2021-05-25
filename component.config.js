const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const glob = require('glob');
//glob.sync('./src/packages/**/*.vue')  /**/是packages下面所有的文件夹；/*/是packages下面一级的文件夹
const files = glob.sync('./src/views/pages/sysconfig/baseconfig/sysparams/**/*.vue');
// const files = glob.sync('./src/packages/test/**/*.vue');
let entry={};


if(files.length>0){
    files.forEach(str => {
        console.log(str,"!!!!!!!!!!!!!!!!!")
        // str './src/packages/rack/index.vue',  element:rack;comname:index
        let matchstr=str.match(/\.\/src\/(\S*)\/(\S*)\.vue/)
        let element = matchstr[1].replace(/\//g,"-");
        let comname= matchstr[2];
        if(comname!="index"){
            element=element+"-"+comname;
        }
        console.log(element,comname)
        entry[element]=str
    });
}

module.exports = {
    mode: 'production',
    entry: entry,
    output: {
        path: path.resolve(__dirname, `com`),
        // path: __dirname,
        filename: `[name].js`,  //[name]:  test/index
        library: '[name]',
        // libraryTarget:'commonjs-module'  //"var" | "assign" | "this" | "window" | "self" | "global" | "commonjs" | "commonjs2" | "commonjs-module" | "amd" | "amd-require" | "umd" | "umd2" | "jsonp" | "system"
        jsonpFunction:'webpackJsonp'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            '@': path.resolve(__dirname, './src')
        },
        modules: ['node_modules']
    },
    plugins: [
        new VueLoaderPlugin()
    ],
    module: {
        rules: [
            {//vue 解析
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {//css 解析
                test: /\.(le|sa|sc|c)ss$/,
                use: ['vue-style-loader', 'css-loader','less-loader']
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                use: [{
                    loader:'file-loader',
                    options:{
                        limit: 1024*4,
                        name: `./[name][hash].[ext]`,
                        outputPath: `./img`
                    }
                }],
                // exclude:  [path.resolve(__dirname,'./src/packages')]
            },
        ]
    }
}
