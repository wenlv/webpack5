const { merge } = require('webpack-merge');
const commonConfig = require("./webpack.config.common");
const prodConfig = require("./webpack.config.prod");
const devConfig = require("./webpack.config.dev");

module.exports = (env) => {
    switch (true) {
        case env.production:
            return merge(commonConfig, prodConfig);

        case env.development:
            return merge(commonConfig, devConfig);

        default:
            return new Error('no config');
    }
}