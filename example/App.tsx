import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import * as ExpoGuidedAccess from 'expo-guided-access';
import { Subscription } from 'expo-modules-core';
import { addChangeListener, isGuidedAccessEnabled } from 'expo-guided-access';
import { useEffect, useState } from 'react';

export default function App() {
  const [guidedAccessEnabled, setGuidedAccessEnabled] = useState<boolean>();
  const [subscription, setSubscription] = useState<Subscription>();

  useEffect(() => {
    (async () => {
      const guidedAccessEnabled = await isGuidedAccessEnabled();
      setGuidedAccessEnabled(guidedAccessEnabled);

      setSubscription(
        addChangeListener(({ guidedAccessEnabled }) => {
          setGuidedAccessEnabled(guidedAccessEnabled);
        }),
      );
    })();

    return () => {
      subscription && subscription.remove();
      setSubscription(undefined);
    };
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          padding: 16,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: '#97c3f0',
          marginBottom: 40,
        }}
        onPress={async () => {
          const isGuidedAccessEnabled = await ExpoGuidedAccess.isGuidedAccessEnabled();

          Alert.alert('isGuidedAccessEnabled: ' + isGuidedAccessEnabled);
        }}
      >
        <Text style={{ color: '#0b6bcb', fontWeight: 'bold' }}>Call isGuidedAccessEnabled()</Text>
      </TouchableOpacity>

      <View
        style={{
          padding: 16,
          borderRadius: 8,
          backgroundColor: '#fbfcfd',
          borderColor: '#cdd7e1',
          borderWidth: 2,
        }}
      >
        <Text style={{ color: '#32383e', textAlign: 'center' }}>
          isGuidedAccessEnabled Subscription{'\n'}
          {guidedAccessEnabled?.toString()}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
