import { useRouter } from 'expo-router';

import { LoginForm } from '@/components/login-form';
import { useAuth } from '@/core';
import { useLocalAuth } from '@/core/auth/use-local-auth';
import { useSoftKeyboardEffect } from '@/core/keyboard';
import { Button } from '@/ui';
import { FocusAwareStatusBar } from '@/ui';

export default function Login() {
  const router = useRouter();
  const signIn = useAuth.use.signIn();
  useSoftKeyboardEffect();
  const { isAuth, onAuth } = useLocalAuth();

  const onSubmit = () => {
    signIn({ access: 'access-token', refresh: 'refresh-token' });
    router.push('/');
  };
  return (
    <>
      <FocusAwareStatusBar />
      <LoginForm onSubmit={onSubmit}>
        {!isAuth && (
          <Button
            label="Phone auth"
            onPress={async () => {
              await onAuth(onSubmit);
            }}
          />
        )}
      </LoginForm>
    </>
  );
}
