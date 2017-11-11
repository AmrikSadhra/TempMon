module.exports = {
    entry: "./src/index.tsx",
    output: {
        filename: "bundle.js",
        publicPath: "/build/",
        path: __dirname + "/public/build/"
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    devServer: {
        contentBase: "./public",
        hot: true,
        proxy: {
            '/api': {
                target: 'http://localhost:3001',
                secure: false
            }
        }
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
            { test: /\.css$/, use: ['style-loader', 'css-loader'] }
        ]
    },
};