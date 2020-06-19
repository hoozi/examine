import React, { useState, useCallback, useRef } from 'react';
import {
  View,
  Text,
} from 'react-native';
import {
  List,
  InputItem,
  Switch,
  Button
} from '@ant-design/react-native';

import { color } from '../../constants/theme';
import styles from './style';
import CaiNiao from '../../icon/CaiNiao';
import BreakageList from './BreakageList';

interface IProps {
  placeholder?: string;
  onSearch?(value:string): void;
  onScan?(value: string): void;
}

export default ():React.ReactElement => {
  const [switchChecked, setSwitchChecked] = useState<boolean>(false);
  const handleSwitchChange = useCallback((checked:boolean) => {
    if(switchChecked !== checked) {
      setSwitchChecked(checked);
    }
  }, [setSwitchChecked, switchChecked])
  return (
    <View style={styles.container}>
      <List>
        <InputItem placeholder='请输入'>
          <Text style={styles.name}>箱号</Text>
        </InputItem>
        <InputItem placeholder='请输入'>
          <Text style={styles.name}>车号</Text>
        </InputItem>
        <List.Item onPress={() => console.log('picke owner')}>
          <View style={styles.item}>
            <Text style={styles.name}>箱主</Text>
            <View style={styles.extra}>
              <Text style={styles.extraText}>请选择</Text>
              <CaiNiao name='xiayiyeqianjinchakangengduo' size={18} color='#999'/>
            </View>
          </View>
        </List.Item>
        <List.Item
          extra={
            <Switch
              checked	={switchChecked}
              color={color.brand_color}
              onChange={handleSwitchChange}
            />
          }
        >
          <Text style={styles.name}>好坏箱</Text>
        </List.Item>
      </List>
      {
        switchChecked ? <BreakageList/> : null
      }
      <View style={{flexDirection: 'row', position: 'absolute', bottom:0, backgroundColor: '#fff',width:'100%', justifyContent: 'flex-end'}}>
        <Button type='primary' style={{borderRadius:0}}>保存</Button>
        <Button type='warning' style={{borderRadius:0}}>进门</Button>
      </View>
    </View>
  )
}
