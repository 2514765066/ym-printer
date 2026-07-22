/**
 * @type {import('electron-builder').Configuration}
 */
module.exports = {
  appId: `com.2514765066.ym-printer`,
  artifactName: 'ym-printer',
  productName: 'ym-printer',
  files: [
    'out',
    'resources/pdfium.dll',
    'resources/printer.exe',
    'resources/getPrinters.ps1',
    'resources/getPrinterTasks.ps1',
    'resources/test-black.pdf',
    'resources/test-color.pdf',
  ],
  asar: false,
  electronLanguages: ['zh-CN'],
  directories: {
    output: 'dist',
  },
  icon: 'build/icon.png',

  nsis: {
    differentialPackage: false,
    oneClick: false,
    allowToChangeInstallationDirectory: true,
    artifactName: '${productName}-${version}.${ext}',
    shortcutName: 'Ym Printer',
    uninstallDisplayName: 'Ym Printer',
    deleteAppDataOnUninstall: true,
  },
};
