import { useIsFocused } from '@react-navigation/native';
import { useColorScheme } from 'nativewind';
import type { ComponentProps } from 'react';
import { StatusBar } from 'react-native';

type Props = ComponentProps<typeof StatusBar>;
export const FocusAwareStatusBar = (props: Props) => {
  const isFocused = useIsFocused();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const barStyle = isDark ? 'light-content' : 'dark-content';

  return isFocused ? <StatusBar barStyle={barStyle} {...props} /> : null;
};
