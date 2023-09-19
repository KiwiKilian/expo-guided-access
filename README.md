# Expo Guided Access

An Expo Module to check if a device is in guided access mode.

> [!IMPORTANT]  
> This package is **not** part of the Expo SDK. It will only work with [development builds](https://docs.expo.dev/develop/development-builds/introduction/) and **not** with Expo Go.

> [!NOTE]  
> Currently only iOS is supported.

## Installation

### Installation in Expo Projects with Development Builds

```
npm install expo-guided-access
```

As the module uses custom native code, create a new development build after installation.

### Installation in bare React Native Projects

For bare React Native projects, you must ensure that you have [installed and configured the `expo` package](https://docs.expo.dev/bare/installing-expo-modules/) before continuing.

#### Add the Package to your npm dependencies

```
npm install expo-guided-access
```

#### Configure for iOS

Run `npx pod-install` after installing the npm package.

## Usage

For applied usage see the [example app](example/App.tsx).

### Get Status

```tsx
const isGuidedAccessEnabled = await ExpoGuidedAccess.isGuidedAccessEnabled();
```

### Watch

```tsx
import * as ExpoGuidedAccess from 'expo-guided-access';
import { Subscription } from 'expo-modules-core';
import { useEffect, useState } from 'react';

// ...

const [guidedAccessEnabled, setGuidedAccessEnabled] = useState<boolean>();
const [subscription, setSubscription] = useState<Subscription>();

useEffect(() => {
  (async () => {
    const guidedAccessEnabled = await ExpoGuidedAccess.isGuidedAccessEnabled();
    setGuidedAccessEnabled(guidedAccessEnabled);

    setSubscription(
      ExpoGuidedAccess.addChangeListener(({ guidedAccessEnabled }) => {
        setGuidedAccessEnabled(guidedAccessEnabled);
      }),
    );
  })();

  return () => {
    subscription && subscription.remove();
    setSubscription(undefined);
  };
}, []);
```
