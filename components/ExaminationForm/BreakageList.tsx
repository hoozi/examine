import React from 'react';
import {
  View,
  Text,
  ScrollView
} from 'react-native';
import CaiNiao from '../../icon/CaiNiao';
import { color } from '../../constants/theme';
import styles from './style';

const BreakageCard:React.FC<any> = props => (
  <View style={{...styles.breakageCard,...props.style??{}}}>
    <View style={styles.breakageCardHeader}>
      <Text style={styles.breakageCardTitle}>xxx/xx/xx</Text>
      <CaiNiao name='xiayiyeqianjinchakangengduo' size={18} color='#999'/>
    </View> 
    <View style={styles.breakageCardBody}>
      <View style={{height: 90, justifyContent: 'center', alignItems: 'center'}}>
        <CaiNiao name='paizhao-xianxing' color='#e0e0e0' size={64} />
        <Text style={{color:'#e0e0e0', marginBottom: 8}}>请拍摄残损部位照片</Text>
      </View>
    </View>
  </View>
)

export default ():React.ReactElement => {
  return (
    <View style={styles.breakageList}>
      <View style={styles.breakageListHeader}>
          <Text style={styles.breakageListTitle}>残损信息</Text>
          <CaiNiao name='jia' color={color.brand_color} size={18} onPress={() => console.log('add breakage')}/>
        </View>
        <ScrollView style={{flex:1, backgroundColor: color.fill_color, paddingHorizontal: 12}}>
           <BreakageCard/>
        </ScrollView>
    </View>
  )
}