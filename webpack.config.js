var path = require("path");
var webpack = require('webpack');
var fs = require("fs");

var nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function (x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function (mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });
//环境判断
var plugins = [
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': 1,
        }
    })
];

module.exports = {
    entry: {
        main: path.resolve(__dirname, './app.js'),
    },
    output: {
        // 将构建打包输出的app.js放到build目录下
        path: path.join(__dirname, "/build"),
        // webpack构建输出的临时文件存放到内存中，而且是以publicPath作为相对路径。
        // publicPath并不会影响输出目录
        // 此外，如果指定路径下已经存在了相同文件，webpack会优先使用内存的临时文件
        // publicPath: "/static/",
        // 可以对构建输出的app.js进行二次定制化命名，比如加时间戳等
        filename: "pie_[name].js",
    },
    module: {
        loaders: [
            // 使用babel,编译ES6语法
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: path.resolve(__dirname, 'node_modules'),
                query: {
                    presets: ["es2015", "stage-2"]
                },
            },
            // 内联 base64 URLs, 限定 <=10k 的图片, 其他的用 URL
            {
                test: /\.(png|jpe?g|gif)(\?.*)?$/,
                loader: 'url',
                query: {
                    limit: 10000,
                    name: 'images/[name].[ext]?[hash:10]'
                }
            }
        ]
    },
    plugins: plugins,
    target: 'node',
    externals: nodeModules,
};