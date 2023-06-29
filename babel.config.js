module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "@babel/plugin-proposal-export-namespace-from",
      "react-native-reanimated/plugin",
      ["@babel/plugin-transform-private-methods", { "loose": true }],
      ['@babel/plugin-transform-flow-strip-types'], // newly added
      require.resolve("expo-router/babel"),
    ],
  };
};

