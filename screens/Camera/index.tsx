import React from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { useDispatch } from 'react-redux';
import { RematchDispatch,Models } from '@rematch/core';
import { goBack } from '../../navigation';
import CaiNiao from '../../icon/CaiNiao';
import { color } from '../../constants/theme';

interface IProps {
  route?:any
}

export default ({route}:IProps):React.ReactElement => {
  const { index } = route.params;
  const { common } = useDispatch<RematchDispatch<Models>>()
  const takePicture = async function (camera:RNCamera) {
    const options = { quality: 0.6, base64: false };
    const data = await camera.takePictureAsync(options);
    //  eslint-disable-next-line
    const { uri } = data;
    const formData = new FormData();
    formData.append('file', {uri, name: uri, type: 'image/jpeg'});
    common.upload({
      formData,
      uri,
      index
    });
    goBack();
  }
  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.preview}
        autoFocus={RNCamera.Constants.AutoFocus.on}
        type={RNCamera.Constants.Type.back}
      >
        {({ camera, status }) => {
          if (status !== 'READY') return <Text>waiting</Text>;
          return (
            <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
              <TouchableHighlight underlayColor='#f5f5f5' style={styles.capture} onPress={() => takePicture(camera)}>
                <CaiNiao name='paizhao' size={48} color={color.text_base_color}/>
              </TouchableHighlight>
            </View>
          );
        }}
      </RNCamera>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    width: 72,
    height: 72,
    padding: 8,
    alignSelf: 'center',
    margin: 20,
  }
});