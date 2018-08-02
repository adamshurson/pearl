var path = require('path');
module.exports = {
    entry: './src/pearl.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'index.js',
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src'),
                exclude: /(node_modules|bower_components|build)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            "es2015",
                            "stage-0",
                            "react"
                        ]
                    }
                }
            }
        ]
    }
};