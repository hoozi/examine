import React from 'react';
import {
  View,
  Text
} from 'react-native';
import { Button } from '@ant-design/react-native';
import WhenFocusStatusBar from '../../components/WhenFocusStatusBar';
import { navigate } from '../../navigation';
import { color } from '../../constants/theme';

export default () => (
  <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
    <WhenFocusStatusBar barStyle='light-content' backgroundColor={color.brand_color}/>
    <Button onPress={() => navigate('Logout')}>退出</Button>
  </View>
)