var gulp = require('gulp')
var gutil = require('gulp-util');

//webpack
var webpack = require('webpack');
var WebpackDevServer = require("webpack-dev-server");
var webpackConfig = require('./webpack.config.js');
gulp.task('webpack-dev',function(callback){
    var config = Object.create(webpackConfig)

    config.devtool = "sourcemap";
    config.debug = true;
    webpack(config,function(err,stats){
        if(err) {
            throw new gutil.PluginError("webpack-dev", err);
        }
        //gutil.log("[webpack:build]", stats.toString({
        //    colors: true
        //}));
        if(typeof callback=='function'){
            callback();
        }
    })
})

gulp.task('webpack-dev-server',function(cb){
    var config = Object.create(webpackConfig);
    config.debug = true;
    config.devtool = 'source-map'
    config.output.sourceMapFilename='[name].map'
    new WebpackDevServer(webpack(config),{
        publicPath:config.output.publicPath,
        stats:{
            colors:true
        }
    }).listen(8080,'localhost',function(err){
            if(err) throw new gutil.PluginError('webpack-dev-server',err);
        })
})