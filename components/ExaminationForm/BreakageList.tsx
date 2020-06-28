import React, { useCallback,useReducer, useContext } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  TextInput,
  Image,
  StyleProp,
  ViewStyle,
  ImageSourcePropType
} from 'react-native';
import { ActivityIndicator, Button, Picker } from '@ant-design/react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RematchDispatch, Models } from '@rematch/core';
import { navigate, AuthContext } from '../../navigation';
import CaiNiao from '../../icon/CaiNiao';
import { color } from '../../constants/theme';
import { IBreakage } from '../../store/models/examine';
import styles from './style';
import { SERVICE_URL } from '../../constants';

interface IBreakageCardProps {
  onCardDelete?(id?:number):void;
  onBreakageChange?(values?:Array<string | number>, index?:number):void;
  onDeletePhoto?(photo:string, index:number):void;
  style?:ViewStyle;
  rate?:any[]
  data:IBreakage;
  index:number
}

const BreakageCard:React.FC<IBreakageCardProps> = ({
  data,
  style,
  rate,
  index,
  onCardDelete,
  onBreakageChange,
  onDeletePhoto
}:IBreakageCardProps) => {
  const { token } = useContext<{[key:string]:any}>(AuthContext)
  return (
    <View style={{...styles.breakageCard,...style??{}}}>
      <View style={styles.breakageCardHeader}>
        <Picker
          itemStyle={{
            paddingVertical: 6
          }}
          data={rate??[]}
          value={
            [
              data.componentCname??'',
              data.repairName??'',
              `${data.length}x${data.width}`??''
            ]
          }
          cols={3}
          onChange={v => onBreakageChange && onBreakageChange(v, index)}
          cascade
        >
          <TouchableOpacity>
            <View style={{flexDirection: 'row', height: '100%', alignItems:'center'}}>
              <Text style={styles.breakageCardTitle}>{`${data.componentCname || '部位'}/${data.repairName || '维修方式'}/${data.length || '长'}x${data.width || '宽'}`}</Text>
              <CaiNiao name='xiayiyeqianjinchakangengduo' size={16} color='#999'/>
            </View>
          </TouchableOpacity>
        </Picker>
        <CaiNiao name='cuowuguanbiquxiao' color='#999' size={24} onPress={() => onCardDelete && onCardDelete(data.id)}/>
      </View> 
      <View style={styles.breakageCardBody}>
        <View style={{flexDirection: 'row'}}>
          <View style={{flexDirection: 'row'}}>
            {
              data.photos?.map((photo:string)=>{
                const remote:ImageSourcePropType = {
                  uri: `${SERVICE_URL}/yms/ctn-repair/getFile/${photo}`,
                  headers: {
                    Authorization: `Bearer ${token}`
                  }
                }
                return (
                  <View style={styles.breakageImageContainer} key={photo}>
                    <Image
                      source={remote} 
                      style={styles.breakageImage}
                    />
                    <TouchableOpacity style={styles.deleteImage} onPress={() => onDeletePhoto && onDeletePhoto(photo, index)}>
                       <CaiNiao name='cuowuguanbiquxiao' color='#fff' size={18}/>
                    </TouchableOpacity>
                  </View>
                )
              })
            }
          </View>
          {
            (data.photos.length <=3) &&
            <TouchableHighlight style={styles.breakageAddImage} underlayColor='#f5f5f5' onPress={() => navigate('Camera', {index})}>
              <>
                <CaiNiao name='paizhao-xianxing' size={36} color='#e6e6e6'/>
                <Text style={{fontSize: 12, color: '#dedede'}}>{data.photos.length}/4</Text>
              </>
            </TouchableHighlight>
          }
        </View>
      </View>
      <View style={styles.breakageCardFooter}>
        <Text>描述说明</Text>
        <TextInput style={styles.breakageRemark} placeholder='请输入'/>
      </View>
    </View>
  )
}

const repairComponentParams:string[] = [
  'componentCname',
  'repairName',
  'length',
  'width'
]

export default ():React.ReactElement => {
  const [_, forceRender] = useReducer((s:any,a:any) => s+1,0)
  const { loading, examine } = useSelector((state:{[key:string]:any}) => state);
  const { examine: disaptchExamine } = useDispatch<RematchDispatch<Models>>();
  const fetchRateByCtnOwnering = loading.effects.examine.fetchRateByCtnOwner;
  const { breakList } = examine.data;
  const handleDeleteBreakage = useCallback((id:number) => {
    disaptchExamine.deleteBreakage({id});
    forceRender(1);
  },[disaptchExamine]);
  const handleAddBreakage = useCallback(() => {
    if(fetchRateByCtnOwnering) return;
    disaptchExamine.addBreakage({
      id:Date.now(),
      componentCname: '',
      repairName: '',
      length:0,
      width:0,
      costRate:0,
      photos:[]
    });
    forceRender(1);
  },[disaptchExamine]);
  const handleBreakageChange = useCallback((v, index) => {
    if(!v.length) return;
    const size:string[] = v[2].split('x');
    v.splice(2,1,...size);
    const params:Partial<IBreakage> = {};
    repairComponentParams.forEach((name, index) => {
      params[name] = v[index]
    });
    disaptchExamine.changeBreakage({
      index,
      ...params
    });
    forceRender(1);
  }, [disaptchExamine]);
  const handleDeletePhoto = useCallback((photos, index) => {
    disaptchExamine.changeBreakage({
      index,
      photos,
      photoType: 'delete'
    });
    forceRender(1);
  }, [disaptchExamine]);
  return (
    <View style={styles.breakageList}>
      <TouchableHighlight style={{marginTop: 12}} underlayColor='#dedede' onPress={handleAddBreakage}>
        <View style={styles.breakageListAdd}>
          {
            fetchRateByCtnOwnering ? 
            <ActivityIndicator size='small' color={color.warning_color}/> :
            <>
              <CaiNiao name='jia' color={color.warning_color} size={18}/>
              <Text style={styles.breakageListAddText}>添加残损信息</Text>
            </>
          }
        </View>
      </TouchableHighlight>
      <View>
        {
          breakList.map((breakage:IBreakage, index:number) => (
            <BreakageCard 
              data={breakage} 
              index={index}
              key={breakage.id} 
              onCardDelete={handleDeleteBreakage} 
              onBreakageChange={handleBreakageChange}
              onDeletePhoto={handleDeletePhoto}
              rate={examine.rate}
            />
          ))
        }
      </View>
    </View>
  )
}