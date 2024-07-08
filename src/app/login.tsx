import { useRouter } from 'expo-router';
import { Button, Text } from 'react-native';

import type { LoginFormProps } from '@/components/login-form';
import { LoginForm } from '@/components/login-form';
import { useAuth } from '@/core';
import { useLocalAuth } from '@/core/auth/use-local-auth';
import { useSoftKeyboardEffect } from '@/core/keyboard';
import { FocusAwareStatusBar } from '@/ui';

export default function Login() {
  const router = useRouter();
  const signIn = useAuth.use.signIn();
  useSoftKeyboardEffect();
  const { isAuth, onAuth } = useLocalAuth();

  const onSubmit: LoginFormProps['onSubmit'] = (data) => {
    console.log(data);
    signIn({ access: 'access-token', refresh: 'refresh-token' });
    router.push('/');
  };
  return (
    <>
      <Text>{isAuth ? 'Authenticated!' : 'Please authenticate'}</Text>
      {!isAuth && <Button title="phone auth" onPress={onAuth} />}
      <FocusAwareStatusBar />
      <LoginForm onSubmit={onSubmit} />
    </>
  );
}
