const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (isDev) => ({
    entry: {
        app: './src/.sihui/index.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Production',
        }),
        new MiniCssExtractPlugin({ // 添加插件
            filename: '[name].[hash:8].css'
        }),
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, '../../dist'),
        clean: true,
    },
    optimization: {
        // usedExports: true,
        // 此处经过测试，不加这个配置也会有同样的效果
        moduleIds: 'deterministic',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            },
            chunks: 'all',
            // minSize: 1
        },
        runtimeChunk: 'single'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use:
                    [{
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                [
                                    '@babel/preset-env', {
                                        useBuiltIns: 'usage',
                                        // 指定core-js版本
                                        corejs: 3,
                                        // 指定兼容性做到那个版本浏览器
                                        targets: {
                                            chrome: '60',
                                            firefox: '60',
                                            ie: '9',
                                            safari: '10',
                                            edge: 17
                                        }
                                    }
                                ]
                            ],
                        }
                    }],
                include: path.resolve(__dirname, 'src/.sihui')
            },
            {
                test: /\.less$/i,
                use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader'],
                // include: path.resolve(__dirname, 'src/.sihui')
            },
            {
                test: /\.css$/i,
                use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader'],
                // include: path.resolve(__dirname, 'src/.sihui')
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource'
            },
            // {
            //     test: /\.(woff|woff2|eot|ttf|otf)$/i,
            //     type: 'asset/resource'
            // }
        ]
    }
});