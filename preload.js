// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

const { desktopCapturer, contextBridge } = require("electron");
const { readFileSync } = require("fs");
const { join } = require("path");

// inject renderer.js into the web page
window.addEventListener("DOMContentLoaded", () => {
  const rendererScript = document.createElement("script");
  rendererScript.text = readFileSync(join(__dirname, "renderer.js"), "utf8");
  document.body.appendChild(rendererScript);
});

contextBridge.exposeInMainWorld("myCustomGetDisplayMedia", async () => {
  const sources = await desktopCapturer.getSources({
    types: ["window", "screen"],
  });

  // you should create some kind of UI to prompt the user
  // to select the correct source like Google Chrome does
  const selectedSource = sources[0]; // this is just for testing purposes

  return selectedSource;
});
