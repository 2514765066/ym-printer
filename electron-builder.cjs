/**
 * @type {import('electron-builder').Configuration}
 */
module.exports = {
  appId: `com.2514765066.ym-printer`,
  artifactName: "ym-printer",
  productName: "ym-printer",
  files: [
    "out",
    "resources/pdfium.dll",
    "resources/printer.exe",
    "resources/test.pdf",
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
