import { NativeScriptConfig } from '@nativescript/core';

export default {
  id: 'org.nativescript.playstationgamemanager',
  appPath: 'app',
  appResourcesPath: 'App_Resources',
  android: {
    v8Flags: '--expose_gc',
    markingMode: 'none',
    codeCache: true,
    suppressCallJSMethodExceptions: false,
    minSdkVersion: 21,
    maxSdkVersion: null,
    targetSdkVersion: 33
  },
  ios: {
    discardUncaughtJsExceptions: false
  },
  webpackConfigPath: 'webpack.config.js',
  appVersion: '1.0.0'
} as NativeScriptConfig;