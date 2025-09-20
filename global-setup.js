// global-setup.js
module.exports = async () => {
  if (typeof fetch === "undefined") {
    global.fetch = (...args) =>
      import("node-fetch").then(({ default: fetch }) => fetch(...args));
  }
};
