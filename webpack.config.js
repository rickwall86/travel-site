const currentTask = process.env.npm_lifecycle_event;

// We do not need to npm download 'path' as this is part of the node library
const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const postCSSPlugins = [
    require('postcss-import'),
    require('postcss-mixins'),
    require('postcss-simple-vars'),
    require('postcss-nested'),
    require('autoprefixer')
]

let cssConfig = {
    test: /\.css$/i,
    use: ['css-loader?url=false', {loader: 'postcss-loader', options: {plugins: postCSSPlugins}}]
};

let config = {
    entry: './app/assets/scripts/App.js',
    module: {
        rules: [
            cssConfig
        ]
    }
};

if (currentTask == 'dev') {
    cssConfig.use.unshift('style-loader');
    config.output = {
        filename: 'bundled.js', 
        // by using below path,, we make sure regardless of what operating system we use, that we have an absolute path to the correct directory
        path: path.resolve(__dirname, 'app')
    },
    config.devServer = {
        before: function (app, server) {
            server._watch('./app/**/*.html')
        },
        contentBase: path.join(__dirname, 'app'),
        hot: true,
        port: 3000,
        host: '0.0.0.0'
    },
    config.mode = 'development'
}

if (currentTask == 'build') {
    cssConfig.use.unshift(MiniCssExtractPlugin.loader);
    postCSSPlugins.push(require('cssnano'));
    config.output = {
        filename: '[name].[chunkhash].js', 
        chunkFilename: '[name].[chunkhash].js',
        // by using below path,, we make sure regardless of what operating system we use, that we have an absolute path to the correct directory
        path: path.resolve(__dirname, 'dist')
    },
    config.mode = 'production'
    config.optimization = {
        splitChunks: {chunks: 'all'}
    }

    config.plugins = [new CleanWebpackPlugin(), new MiniCssExtractPlugin({filename: 'styles.[chunkhash].css'})];
}

module.exports = config;