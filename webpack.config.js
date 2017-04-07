const path = require('path');
const webpack = require('webpack');

module.exports = {
  // 入口文件
  entry: './src/main.js',
  output: {
    // 打包后输出的目录
    path: path.resolve(__dirname, './dist'),
    // 打包后资源文件的前缀
    publicPath: '/dist/',
    filename: 'build.js',
  },
  // 处理不同后缀的文件
  module: {
    rules: [
      {
        test: /\.vue$|\.js$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        exclude: /node_modules/,
        options: {
          formatter: require('eslint-friendly-formatter'),
          failOnError: true,
        },
      },
      {
        test: /\.vue$/,
        exclude: '/node_modules/',
        loader: 'vue-loader',
      }, {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      }, {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: 'vue-style-loader!css-loader',
      }, {
        test: /\.less$/,
        exclude: /node_modules/,
        loader: 'vue-style-loader!css-loader!less-loader',
      }, {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        query: {
          name: '[name].[ext]?[hash]',
        },
      },
    ],
  },
  resolve: {
    // require时省略的扩展名，如：require('module') 不需要module.js
    extensions: ['.json', '.js', '.vue'],
    // 别名
    alias: {
      vue$: 'vue/dist/vue.common.js',
      components: path.join(__dirname, './src/components'),
    },
  },
  // webpack-dev-server配置
  devServer: {
    historyApiFallback: true,
    noInfo: true,
  },
  // 开启source-map，webpack有多种source-map，在官网文档可以查到
  devtool: '#eval-source-map',
};

// 生产环境，运行npm run build则执行这里
if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map';
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    // 环境变量
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
    }),
    // 压缩代码
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
  ]);
}
