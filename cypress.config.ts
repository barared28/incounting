import { defineConfig } from "cypress";

export default defineConfig({
  videosFolder: "cypress/videos",
  screenshotsFolder: "cypress/screenshots",
  e2e: {
    setupNodeEvents(on, config) {},
    baseUrl: "http://localhost:8080",
    supportFile: false,
    defaultCommandTimeout: 1000 * 60 * 3,
  },
  viewportWidth: 1440,
  viewportHeight: 906,
  videoCompression: 10,
});
