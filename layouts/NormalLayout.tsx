import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { full } from '../styles/common';

export default (props:React.PropsWithChildren<React.ReactNode>) => (
  <View style={styles.container}>
    {props.children}
  </View>
);

const styles = StyleSheet.create({
  container: {
    ...full
  }
})

