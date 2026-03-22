const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, _config) {
      on("task", {
        log(message) {
          console.log(message);
          return null;
        },
        table(message) {
          console.table(message);
          return null;
        },
      });
    },
    baseUrl: "https://conecta-bem-front.vercel.app/",
    testIsolation: false,
    retries: { runMode: 2, openMode: 0 },
  },
});
