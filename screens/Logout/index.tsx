import React, { useContext, useCallback } from 'react';
import { SafeAreaView } from 'react-native';
import { ActivityIndicator } from '@ant-design/react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import WhenFocusStatusBar from '../../components/WhenFocusStatusBar';
import { AuthContext } from '../../navigation';
import { color } from '../../constants/theme';

const Logout:React.FC<any> = ():React.ReactElement => {
  const { forceRender } = useContext<any>(AuthContext);
  const { user } = useDispatch<any>();
 useFocusEffect(
   useCallback(() => {
    user.logout(() => {
      forceRender(null);
    })
   }, [user,forceRender])
 )
  return (
    <SafeAreaView style={{flex:1,justifyContent: 'center', alignItems: 'center'}}>
      <WhenFocusStatusBar barStyle='dark-content' backgroundColor={color.fill_color}/>
      <ActivityIndicator color={color.brand_color} text='请稍候...'/>
    </SafeAreaView>
  )
}

export default Logout