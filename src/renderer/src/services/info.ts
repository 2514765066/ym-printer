declare global {
  const __APP_VERSION__: string;
  const __APP_NAME__: string;
  const __PRODUCT_NAME__: string;
}

export const appVersion = __APP_VERSION__;

export const appName = __APP_NAME__;

export const productName = __PRODUCT_NAME__;
