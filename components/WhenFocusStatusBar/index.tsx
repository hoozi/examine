import * as React from 'react';
import { StatusBar,StatusBarProps } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

export default function WhenFocusStatusBar(props:StatusBarProps):React.ReactElement | null {
  const isFocused = useIsFocused();
  return isFocused ? <StatusBar {...props} /> : null;;
}