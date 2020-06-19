import React, { useContext } from 'react';
import { View, SafeAreaView, StatusBar, Text } from 'react-native';
import { Button } from '@ant-design/react-native';
import { useDispatch } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { AuthContext } from '../../navigation';
import { color } from '../../constants/theme';

export default () => {
  const { user } = useDispatch<any>();
  const { forceRender } = useContext(AuthContext);
  useIsFocused() && StatusBar.setBarStyle('dark-content')
  return (
    <SafeAreaView style={{flex: 1}}>
      
      <View style={{backgroundColor: 'red'}}>
        <Text>History</Text>
      </View>
    </SafeAreaView>
  )
}