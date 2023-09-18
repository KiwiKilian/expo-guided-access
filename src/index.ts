import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

import ExpoGuidedAccessModule from './ExpoGuidedAccessModule';
import { GuidedAccessEnabledChangeEventPayload } from './ExpoGuidedAccess.types';

export async function isGuidedAccessEnabled(): Promise<boolean> {
  return await ExpoGuidedAccessModule.isGuidedAccessEnabled();
}

const emitter = new EventEmitter(ExpoGuidedAccessModule ?? NativeModulesProxy.ExpoGuidedAccess);

export function addChangeListener(listener: (event: GuidedAccessEnabledChangeEventPayload) => void): Subscription {
  return emitter.addListener<GuidedAccessEnabledChangeEventPayload>('Expo.guidedAccessEnabledChanged', listener);
}

export { GuidedAccessEnabledChangeEventPayload };
