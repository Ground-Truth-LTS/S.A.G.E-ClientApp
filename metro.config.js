const { getDefaultConfig } = require("expo/metro-config");
const { withTamagui } = require("@tamagui/metro-plugin");

const config = getDefaultConfig(__dirname);

config.resolver.sourceExts = [...config.resolver.sourceExts, 'mjs', 'ts', 'tsx'];


module.exports = withTamagui(config, {
  components: ["tamagui"],
  config: "./tamagui.config.ts",
});