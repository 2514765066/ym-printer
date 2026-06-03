export const appVersion = __APP_VERSION__;

export const appName = __APP_NAME__;

export const appNameUpperCase = appName
  .split("-")
  .map(item => item.charAt(0).toUpperCase() + item.slice(1))
  .join(" ");
