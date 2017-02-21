var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'cheap-module-eval-source-map', // Comment this when building for production
    entry: [
        'webpack-hot-middleware/client', // Comment this too
        './src/index'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'reactive-gallery.js',
        publicPath: '/static/',
        libraryTarget: 'var',
        library: 'reactiveGallery'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            comments: false,
            compress: {
                unused: true,
                dead_code: true,
                warnings: false, 
                drop_debugger: true,
                conditionals: true,
                evaluate: true,
                drop_console: true,
                sequences: true,
                booleans: true,
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ],
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loaders: ['react-hot-loader', 'babel-loader?presets[]=es2015,presets[]=react'],
            include: path.join(__dirname, 'src')
        },
        {
            test: /\.css$/, 
            loader: 'style-loader!css-loader?modules=true&localIdentName=[name]__[local]___[hash:base64:5]'
        },
        {
            test: /\.(jpe?g|png|gif|svg)$/i, 
            loader: "file-loader?name=images/[name].[ext]"
        }]
    }
};
