const { name } = require("./package.json");

/**
 * @type {import('electron-builder').Configuration}
 */
module.exports = {
  appId: `com.2514765066.${name}`,
  artifactName: name,
  productName: name,
  files: [
    "out",
    "resources/SumatraPDF-3.5.2-32.exe",
    "resources/SumatraPDF-settings.txt",
  ],
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
