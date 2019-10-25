const path = require('path');
const webpack = require('webpack')

// const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: 'development',
    entry:'./src/index.js',
    output:{
        path: path.resolve(__dirname, 'dist'),
        filename:'build.js',
    },
    module: {
        rules:[
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use:{
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env',],
                        sourceMap:true
                      }
                }
            },
          

        ]
    },
    plugins: [
        // new HtmlWebpackPlugin({ template:'./src/index.html'})
     ],
     devtool: 'source-map',

    devServer: {
        stats: {
            children: false,
            maxModules: 0
        },
        
        port: 3000
    }
}