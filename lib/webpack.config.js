const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const outputDirectory = "dist";
module.exports = {
    entry: ["@babel/polyfill","./src/client/index.js"],
    output: {
        path: path.join(__dirname, outputDirectory),
        filename: "bundle.js",
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.(scss|css)$/,
                use: ["style-loader", "css-loader", 'sass-loader']
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg|jpg|json)$/,
                loader: "url-loader?limit=100000"
            }
        ]
    },
    devServer: {
        port: 3010,
        open: true,
        historyApiFallback: true,
        proxy: {
            '/api': {
                target: `http://localhost:8080`,
                secure: false,
                changeOrigin: true
            }
        },
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            favicon: "./public/favicon.ico"
        })
    ]
};
