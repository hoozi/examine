import React, { useContext } from 'react';
import { View, SafeAreaView, StatusBar, Text } from 'react-native';
import { Button } from '@ant-design/react-native';
import { useDispatch } from 'react-redux';
import { AuthContext, navigate } from '../../navigation';
import { color } from '../../constants/theme';

export default () => {
  const { user } = useDispatch<any>();
  const { forceRender } = useContext(AuthContext);
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{backgroundColor: 'red'}}>
        <Text>Home</Text>
      </View>
    </SafeAreaView>
  )
}