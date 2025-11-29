const { name } = require("./package.json");

/**
 * @type {import('electron-builder').Configuration}
 */
module.exports = {
  appId: `com.2514765066.${name}`,
  artifactName: name,
  productName: name,
  files: ["out", "resources/pdfium.dll", "resources/printer.exe"],
  asar: false,
  electronLanguages: ["zh-CN"],
  directories: {
    output: "dist",
  },
  icon: "build/icon.png",

  nsis: {
    differentialPackage: false,
    oneClick: false,
    allowToChangeInstallationDirectory: true,
    artifactName: "${productName}-${version}.${ext}",
    shortcutName: "${productName}",
    uninstallDisplayName: "${productName}",
    deleteAppDataOnUninstall: true,
  },

  fileAssociations: [
    {
      ext: ["doc", "docx", "pdf", "wps"],
      name: "ym-printer",
      role: "Shell",
    },
  ],

  generateUpdatesFilesForAllChannels: false,
};
