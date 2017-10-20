var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');
const BabiliPlugin = require("babili-webpack-plugin");

module.exports = {
  devServer: {
    historyApiFallback:true
  },

  context: path.join(__dirname),
  devtool: "source-map",
  entry: {
    app:"./src/js/root.js",
    vendor:['react']
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'env'],
          plugins: ['react-html-attrs',
                    ["import", { "libraryName": "antd", "style": "css" }]
                   ] //添加组件的插件配置
        }
      },
      //下面是使用 ant-design 的配置文件
      { test: /\.css$/, 
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.less$/,
        use: [{
            loader: "style-loader" // creates style nodes from JS strings 
        }, {
            loader: "css-loader" // translates CSS into CommonJS 
        }, {
            loader: "less-loader" // compiles Less to CSS 
        }]
      }
    ]
  },
  output: {
    path: __dirname,
    filename: "[name].js"
  },
  plugins: [
    new BabiliPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name:'vendor' 
    })
  ],
};
