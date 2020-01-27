const path = require("path");
const fs = require("fs");
const nodeBuiltins = require("builtin-modules");

const lambdaNames = fs
  .readdirSync(path.join(__dirname, "src/"))
  .filter(name => !name.match(/utils|coverage$/));

module.exports = {
  mode: "development",
  entry: lambdaNames.reduce((entryMap, lambdaName) => {
    entryMap[lambdaName] = [
      "source-map-support/register",
      path.join(__dirname, `src/${lambdaName}/index.ts`)
    ];
    return entryMap;
  }, {}),
  externals: ["aws-sdk"]
    .concat(nodeBuiltins)
    .reduce((externalsMap, moduleName) => {
      externalsMap[moduleName] = moduleName;
      return externalsMap;
    }, {}),

  output: {
    path: path.join(__dirname, "build"),
    libraryTarget: "commonjs",
    filename: "[name]/index.js"
  },

  target: "node",

  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: [],
        use: "ts-loader"
      }
    ]
  },

  devtool: "source-map",
  resolve: {
    extensions: [".ts", ".js"]
  }
};
