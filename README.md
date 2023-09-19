# Expo Guided Access

An Expo Module to check if a device is in guided access mode.

> [!IMPORTANT]  
> This package is **not** part of the Expo SDK. It will only work with [development builds](https://docs.expo.dev/develop/development-builds/introduction/) and **not** with Expo Go.

> [!NOTE]  
> Currently only iOS is supported.

## Installation in Expo Projects with Development Builds

```
npm install expo-guided-access
```

As the module uses custom native code, create a new development build after installation.

## Installation in bare React Native Projects

For bare React Native projects, you must ensure that you have [installed and configured the `expo` package](https://docs.expo.dev/bare/installing-expo-modules/) before continuing.

### Add the Package to your npm dependencies

```
npm install expo-guided-access
```

### Configure for iOS

Run `npx pod-install` after installing the npm package.
