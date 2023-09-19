import * as ExpoGuidedAccess from 'expo-guided-access';
import { Subscription } from 'expo-modules-core';
import { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  sheetBase: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
  button: {
    borderColor: '#97c3f0',
  },
  buttonText: {
    color: '#0b6bcb',
    fontWeight: 'bold',
  },
  sheet: {
    backgroundColor: '#fbfcfd',
    borderColor: '#cdd7e1',
  },
  sheetText: {
    color: '#32383e',
    textAlign: 'center',
  },
  sheetValue: {
    fontWeight: 'bold',
  },
});

export default function App() {
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

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.sheetBase, styles.button]}
        onPress={async () => {
          const isGuidedAccessEnabled = await ExpoGuidedAccess.isGuidedAccessEnabled();

          Alert.alert('isGuidedAccessEnabled:\n\n' + isGuidedAccessEnabled);
        }}
      >
        <Text style={styles.buttonText}>Call isGuidedAccessEnabled()</Text>
      </TouchableOpacity>

      <View style={[styles.sheetBase, styles.sheet]}>
        <Text style={styles.sheetText}>
          isGuidedAccessEnabled Subscription{'\n\n'}
          <Text style={styles.sheetValue}>{guidedAccessEnabled?.toString()}</Text>
        </Text>
      </View>
    </View>
  );
}
