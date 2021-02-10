const postcssPresetEnv = require('postcss-preset-env');
const postcssImport = require('postcss-import');
const postcsseasings = require('postcss-easings');
const importUrl = require('postcss-import-url');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');

module.exports = {
  plugins: [
    importUrl(),
    postcssImport({
      path: 'src/css',
    }),
    tailwindcss(),
    autoprefixer(),
    postcsseasings(),
    postcssPresetEnv({
      stage: 0,
    }),
  ]
};