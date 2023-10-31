const path = require("path")

module.exports = {
    mode: "production",
    entry: {
        app: path.resolve("src/index.js"),
    },

    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js",
    },
}
