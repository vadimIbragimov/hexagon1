const path = require('path')//для работы с путями
const HTMLWebpackPlugin = require('html-webpack-plugin') // для создания html на основе тех что в src
const {CleanWebpackPlugin} = require('clean-webpack-plugin') // для очистки при пересбоке
const CopyWebpackPlugin = require('copy-webpack-plugin') //для копирования из src в dist при билде
const MiniCssExtractPlugin = require('mini-css-extract-plugin') //минимизация css
const TerserPlugin = require('terser-webpack-plugin') //минимизация js
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin') //оптимизация создания css (например когда один и тот же код используется в разных местах)
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer') // для анализа и оптимизации бандлов

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all'
        }
    }
    if(isProd){
        config.minimizer = [
            new OptimizeCssAssetsPlugin(),
            new TerserPlugin()
        ]
    }
    return config
}

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`

const cssLoaders = extra => {
    let loaders = [{
        loader: MiniCssExtractPlugin.loader,
        options: {
            hmr: isDev,
            reloadAll: true
        }
    },'css-loader']
    if (extra) {
        loaders.push(extra)
    }
    return loaders
}

const babelOptions = preset => {
    const options = {
        presets: [
            '@babel/preset-env'
        ],
        plugins: [
            '@babel/plugin-proposal-class-properties'
        ]
    }
    if(preset){
        options.presets.push(preset)
    }

    return options
}

const jsLoaders = () => {
    const loaders = [{
        loader: 'babel-loader',
        options: babelOptions()
    }]
    if(isDev){
        loaders.push('eslint-loader')
    }
    return loaders
}

const plugins = () => {
    const base = [
        new HTMLWebpackPlugin({
            template: './html/template.html',
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/icons/favicon.ico'),
                    to: path.resolve(__dirname, 'dist')
                }
            ]
        }),
        new MiniCssExtractPlugin({
            filename: filename('css')
        })
    ]
    if(isProd){
        base.push(new BundleAnalyzerPlugin())
    }
    return base
}
//console.log(path.resolve(__dirname, 'src/favicon.ico'), path.resolve(__dirname, 'dist'))

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    resolve: {
        //extensions: ['.js', '.jsx', '.json', '.csv'],
        alias: {
            '@ico' : path.resolve(__dirname, 'src/icons'),
            '@css' : path.resolve(__dirname, 'src/css'),
            '@html' : path.resolve(__dirname, 'src/html'),
            '@scripts': path.resolve(__dirname, 'src/scripts'),
            '@': path.resolve(__dirname, 'src')
        }
    },
    optimization: optimization(),
    devtool: isDev ? 'source-map' : '',
    devServer: {
        port: 4200,
        hot: isDev
    },
    entry: {
        main: ['@babel/polyfill','./scripts/index.jsx'],
    },
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist')
    },
    plugins: plugins(),
    module: {
        rules: [
            {
                test: /\.css$/,
                use: cssLoaders()
            },
            {
                test: /\.less$/,
                use: cssLoaders('less-loader')
            },
            {
                test: /\.s[ac]ss$/,
                use: cssLoaders('sass-loader')
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: ['file-loader']
            },
            {
                test: /\.xml$/,
                use: ['xml-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: jsLoaders()
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                loader: {
                    loader: 'babel-loader',
                    options: babelOptions('@babel/preset-typescript')
                }
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                loader: {
                    loader: 'babel-loader',
                    options: babelOptions('@babel/preset-react')
                }
            }
        ]
    }
}