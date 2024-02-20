const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { entryPath, htmlTemPath, outputPath, jsIncludePath, cssIncludePath } = require('./path.js');




module.exports = (isDev) => ({
    entry: {
        app: entryPath,
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Production',
            template: htmlTemPath,
            scriptLoading: 'blocking'
        }),
        new MiniCssExtractPlugin({ // 添加插件
            filename: '[name].[hash:8].css'
        }),
    ],
    output: {
        filename: '[name].bundle.js',
        path: outputPath,
        clean: true,
        publicPath: "/",
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '../../'),
            '@pages': path.resolve(__dirname, '../../pages'),
            '@sihui': path.resolve(__dirname, '../core')
        },
        extensions: ['.js', '.tsx', '.jsx', '.ts'],
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
                test: /\.(js|jsx|tsx)$/,
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
                                ],
                                "@babel/preset-react",
                            ],

                        },
                    }],
                include: jsIncludePath
            },
            {
                oneOf: [
                    {
                        test: /\.modules.less$/i,
                        use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, { loader: 'css-loader', options: { modules: true } }, 'postcss-loader', 'less-loader'],
                        include: cssIncludePath
                    },
                    {
                        test: /\.modules.css$/i,
                        use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, { loader: 'css-loader', options: { modules: true } }],
                        include: cssIncludePath
                    },
                    {
                        test: /\.less$/i,
                        use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader'],
                        include: cssIncludePath
                    },
                    {
                        test: /\.css$/i,
                        use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader'],
                include: cssIncludePath
            },
                ]
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