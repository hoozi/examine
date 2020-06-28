import * as React from 'react';
import {
  View,
  Text
} from 'react-native';
import { Button } from '@ant-design/react-native';
import { ButtonProps } from '@ant-design/react-native/lib/button';
import styles from './style';

interface IButtonProps extends ButtonProps {
  text?:React.ReactElement | string;
}

interface IBottomButton {
  extra?: React.ReactNode | string;
  buttons?: IButtonProps[]
}

export default ({extra, buttons}:IBottomButton):React.ReactElement => {
  return (
    <View style={styles.container}>
      { extra ? 
          typeof extra === 'string' ?  
          <Text style={styles.extraText}>{extra}</Text> :
          extra
        : null
      }
      <View style={styles.buttonGroup}>
        {
          buttons?.map((props, index) => {
            const { text, ...restProps } = props;
            return <Button key={index} {...restProps}>{text}</Button>
          })
        }
      </View>
    </View>
  )
}