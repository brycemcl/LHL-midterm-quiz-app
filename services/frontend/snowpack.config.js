/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    // public: { url: '/', static: true },
    src: { url: '/' },
  },
  plugins: [
    "@snowpack/plugin-postcss",
    "@snowpack/plugin-babel"
  ],
  routes: [
    /* Enable an SPA Fallback in development: */
    // {"match": "routes", "src": ".*", "dest": "/index.html"},
  ],
  optimize: {
    // preload: true,
    bundle: true,
    splitting: true,
    treeshake: true,
    manifest: true,
    minify: true,
    target: 'es2018'
  },
  packageOptions: {
    /* ... */
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    /* ... */
  },
};