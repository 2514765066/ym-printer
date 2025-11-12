const { name } = require("./package.json");

/**
 * @type {import('electron-builder').Configuration}
 */
module.exports = {
  appId: `com.2514765066.${name}`,
  productName: name,
  files: ["out", "resources"],
  asar: false,
  electronLanguages: ["zh-CN"],
  directories: {
    output: "dist",
  },
  icon: "src/renderer/src/assets/icon.png",

  nsis: {
    differentialPackage: false,
    oneClick: false,
    allowToChangeInstallationDirectory: true,
    artifactName: "${productName}-${version}.${ext}",
    shortcutName: "${productName}",
    uninstallDisplayName: "${productName}",
    deleteAppDataOnUninstall: true,
  },
};
