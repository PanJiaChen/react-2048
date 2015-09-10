//var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack')
var path = require('path')
var node_modules = path.resolve(__dirname, './node_modules');
var build_path=path.resolve(__dirname, './demo/');
console.log(node_modules);
//npm path
var deps = [
    'react/dist/react.min.js'
];
config = {
    cache:true,
    entry: {
        App:'./src/index.jsx'
    },
    resolve: {
        alias: {}
    },
    output: {
        filename: "[name].js",
        chunkFilename:'[name].js',
        path: build_path+"/build_js",
        publicPath:'/demo/build_js'
    },
    // externals:{
    //     'react': {
    //         root: 'React',
    //         commonjs2: 'react',
    //         commonjs: 'react',
    //         amd: 'react'
    //     },
    //     'jquery': {
    //         root: 'jQuery',
    //         commonjs2: 'jquery',
    //         commonjs: 'jquery',
    //         amd: 'jquery'
    //     }
    // },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: "babel-loader?stage=0"
            },
            { test: /\.css$/, loader: "style!css" },
            {
                test: /\.less$/,
                loader: "style-loader!css-loader!less-loader"
            },
            {
                test: path.resolve(node_modules, deps[0]),
                loader: "expose?React"
            }
        ],
        noParse: []
    },
    plugins: [
        //new ExtractTextPlugin("[name].css")
        //new webpack.HotModuleReplacementPlugin()
        new webpack.optimize.DedupePlugin()
    ]
}

deps.forEach(function(dep) {
    var depPath = path.resolve(node_modules, dep);
    config.resolve.alias[dep.split('/')[0]] = depPath;
    config.module.noParse.push(depPath);
});

module.exports = config;