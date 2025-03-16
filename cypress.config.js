const { defineConfig } = require("cypress");

const cypressSplit = require("cypress-split");

module.exports = defineConfig({
  viewportHeight: 880,
  viewportWidth: 1200,
  e2e: {
    baseUrl: "https://cypress-playground.s3.eu-central-1.amazonaws.com/",
    fixturesFolder: false,
    setupNodeEvents(on, config) {
      cypressSplit(on, config);
      return config;
    },
  },
});
