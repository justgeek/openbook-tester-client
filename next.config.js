const withPlugins = require("next-compose-plugins");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = withPlugins([], {
  reactStrictMode: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Find and remove NextJS css rules.
    const cssRulesIdx = config.module.rules.findIndex((r) => r.oneOf);
    if (cssRulesIdx === -1) {
      throw new Error("Could not find NextJS CSS rule to overwrite.");
    }
    config.module.rules.splice(cssRulesIdx, 1);

    // Add a simpler rule for global css anywhere.
    config.plugins.push(
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: "static/chunks/pages/[contenthash].css",
        chunkFilename: "static/chunks/pages/[contenthash].css",
      }),
    );

    config.module.rules.push({
      test: /\.(sa|sc|c)ss$/i,
      use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
    });

    config.module.rules.push({
      test: /\.t(s|sx)$/i,
      use: [defaultLoaders.babel],
    });

    return config;
  },
});
