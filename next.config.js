module.exports = {
  poweredByHeader: false,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: require.resolve("graphql-tag/loader"),
    });
    return config;
  },
};
