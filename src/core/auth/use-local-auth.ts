import * as LocalAuthentication from 'expo-local-authentication';
import { useState } from 'react';
import { Alert } from 'react-native';

export const useLocalAuth = () => {
  const [isAuth, setIsAuth] = useState(false);

  const onAuth = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    if (!hasHardware) {
      Alert.alert('Error', 'Your device does not support Face ID or Touch ID.');
      return;
    }

    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    if (!isEnrolled) {
      Alert.alert('Error', 'No biometrics are enrolled on this device.');
      return;
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Authenticate',
      fallbackLabel: 'Enter Password',
    });

    if (result.success) {
      setIsAuth(true);
      Alert.alert('Success', 'Authentication successful!');
    } else {
      Alert.alert('Error', 'Authentication failed.');
    }
  };

  return { isAuth, onAuth };
};
