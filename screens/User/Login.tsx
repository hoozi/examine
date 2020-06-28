import React, { useCallback, forwardRef, useMemo, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TextInputProps, TextInput, SafeAreaView, ImageBackground } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Toast } from '@ant-design/react-native';
import { createForm, PropsWithForm, GetFieldPropsOptions, ValidateErrors } from 'rc-form';
import WhenFocusStatusBar from '../../components/WhenFocusStatusBar';
import { AuthContext, navigate } from '../../navigation';
import { hasError } from '../../shared/utils';
import CaiNiao from '../../icon/CaiNiao';
import { ILoginPayload } from '../../store/models/user';
import styles from './style';
import { color } from '../../constants/theme';


interface IInputProps {
  name: string;
  icon: string;
  props: TextInputProps;
  options: GetFieldPropsOptions;
}

interface ILoginItemProps {
  item: IInputProps;
  onChange?: (value: string) => void;
  ref?: React.Ref<any>;
  value?: string;
}

const inputPropsMap: IInputProps[] = [
  {
    name: 'username',
    icon: 'yonghu',
    props: {
      placeholder: '请输入用户名'
    },
    options: {
      rules: [
        {
          required: true,
          message: '请输入用户名'
        }
      ],
    }
  },
  {
    name: 'password',
    icon: 'suoding',
    props: {
      placeholder: '请输入密码'
    },
    options: {
      rules: [
        {
          required: true,
          message: '请输入密码'
        }
      ],
    }
  }
]

const LoginItem:React.FC<ILoginItemProps> = forwardRef((props, ref) => {
  const { item, onChange, value } = props;
  const input = useMemo(() => (
    <TextInput
      ref={ref}
      style={styles.textInput}
      value={value || ''}
      onChangeText={onChange}
      secureTextEntry={item.name==='password'} 
      underlineColorAndroid='transparent'
      placeholderTextColor='#999'
      returnKeyLabel='确定'
      returnKeyType='done'
      {...item.props}
    />
  ), 
  [value, item, onChange])
  return input
});

const Login:React.FC<PropsWithForm<any, any>> = ({ form }) => {
  const { getFieldDecorator, getFieldsError, validateFields } = form;
  const { user } = useDispatch<any>();
  const { loading } = useSelector((state:{[key:string]:any}) => state);
  const { forceRender } = useContext(AuthContext);
  const disabled:boolean = hasError(getFieldsError()) || loading.effects.user.login;
  useEffect(() => {
    validateFields();
    return;
  }, [validateFields]);
  const handleLoginSubmit = useCallback(() => {
    validateFields((error: ValidateErrors, values:ILoginPayload) => {
      if(error) return Toast.fail('用户名或密码必填!');
      user.login({
        ...values,
        callback(tk:string) {
          forceRender(tk);
        }
      })
    })
  }, [validateFields]);
  return (
    <SafeAreaView style={styles.container}>
      <WhenFocusStatusBar barStyle='dark-content' backgroundColor='transparent'/>
      <ImageBackground style={styles.loginForm} source={require('../../static/bg.png')} resizeMode='contain'>
        <Text style={styles.loginTitle}>账号登录</Text>
        {
          inputPropsMap.map(props => 
            <View style={styles.loginItem} key={props.name}>
              <CaiNiao name={props.icon} size={20} color={'#999'}/>
              {getFieldDecorator(props.name, {...props.options})(<LoginItem item={props}/>)}
            </View>
          )
        }
        <Button 
          type='primary' 
          disabled={disabled} 
          style={styles.loginButton}
          onPress={handleLoginSubmit}
        >登 录</Button>
      </ImageBackground>
    </SafeAreaView>  
  )
}

export default createForm()(Login);