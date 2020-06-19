import React, { useState, useCallback } from 'react';
import {
  View,
  TextInput
} from 'react-native';
import CaiNiao from '../../icon/CaiNiao';
import styles from './style';

interface IProps {
  placeholder?: string;
  onSearch?(value:string): void;
  onScan?(value: string): void;
}

export default ({
  placeholder='EIR号',
  onSearch,
  onScan
}:IProps):React.ReactElement => {
  const [value, setInputValue] = useState<string>('');
  const handleTextChange = useCallback((text:string) => {
    if(value !== text) {
      setInputValue(text);
    }
  }, [setInputValue, value])
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.barTextInput}
        value={value}
        placeholder={placeholder}
        placeholderTextColor='#999'
        onChangeText={handleTextChange}
        returnKeyType='search'
        underlineColorAndroid='transparent'
        onSubmitEditing={() => console.log('search')}
        textAlignVertical='center'
      />
      <CaiNiao 
        name='saomiao' 
        size={24} 
        color='#999' 
        onPress={() => console.log('scan')}
      />
    </View>
  )
}