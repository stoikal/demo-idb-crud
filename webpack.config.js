const { merge } = require('webpack-merge');

const commonConfig = require('./build-utils/webpack.common.js');

const getAddons = (addonsArgs) => {
  const addons = Array.isArray(addonsArgs)
    ? addonsArgs
    : [addonsArgs];

  return addons
    .filter(Boolean)
    .map((name) => require(`./build-utils/addons/webpack.${name}.js`));
};

module.exports = ({ env, addon }) => {
  const envConfig = require(`./build-utils/webpack.${env}.js`);

  return merge(commonConfig, envConfig, ...getAddons(addon));
};
