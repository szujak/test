const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const htmlWebpackPlugin = new HtmlWebpackPlugin({
    mobile: true,
    inject: false,
    template: require('html-webpack-template-pug'),
    appMountId: 'root',
})

module.exports = {
    entry: './src/app/index.jsx',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'src/server/dist')
    },
    module: {
        rules: [
            {
                test: /\.js?x$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    plugins: [htmlWebpackPlugin]
}
