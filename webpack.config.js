const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {

    const devMode = argv.mode !== 'production';

    return {
        entry: './src/index.jsx',
        output:{
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.js',
            chunkFilename: '[id].js',
            publicPath: devMode ? '/' : './'
        },
        devtool: 'source-map',
        resolve: {
            extensions: ['.js', '.jsx']
        },
        mode: argv.mode,
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/
                },
                {
                    test: /\.jsx$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/
                },
                {
                    test: /\.css$/i,
                    use: ['style-loader', 'css-loader'],
                },
                {
                    test: /\.(png|jpe?g|gif)$/,
                    loader: 'url-loader?limit=10000&name=img/[name].[ext]'
                }
            ]
        },
        devServer: {
            historyApiFallback: true,
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: __dirname + '/src/index.html',
                filename: 'index.html',
                inject: 'body',
                favicon: "./src/favicon.ico"
            })
        ]
    }

};