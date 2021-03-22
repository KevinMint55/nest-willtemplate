const path = require('path');
const fs = require('fs');
const nodeExternals = require('webpack-node-externals');
const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const resolve = function (dir) {
  if (fs.existsSync(path.resolve(dir))) {
    return path.resolve(dir);
  } else {
    return '';
  }
};

module.exports = function (options, webpack) {
  return {
    ...options,
    entry: ['webpack/hot/poll?100', options.entry],
    watch: true,
    externals: [
      nodeExternals({
        allowlist: ['webpack/hot/poll?100'],
      }),
    ],
    plugins: [
      ...options.plugins,
      new webpack.HotModuleReplacementPlugin(),
      new webpack.WatchIgnorePlugin({
        paths: [/\.js$/, /\.d\.ts$/],
      }),
      new RunScriptWebpackPlugin({ name: options.output.filename }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: resolve('config.local.yml') || resolve('config.yml'),
            to: 'config.yml',
          },
        ],
      }),
    ],
  };
};
