import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView
} from 'react-native';
import {
  List,
  InputItem,
  Switch,
  ActivityIndicator,
  Picker,
} from '@ant-design/react-native';
import { createForm, createFormField, ValidateErrors, Field } from 'rc-form';
import { useSelector, useDispatch, connect } from 'react-redux';
import { compose } from 'redux';
import { RematchDispatch,Models, ModelEffects } from '@rematch/core';
import { ICtnOwner } from '../../store/models/common';
import { color } from '../../constants/theme';
import styles from './style';
import btStyles from '../BottomButton/style';
import CaiNiao from '../../icon/CaiNiao';
import BreakageList from './BreakageList';
import BottomButton from '../BottomButton';
import { toFixed2 } from '../../shared/utils';
import { IPostAndPutModel } from '../../store/models/examine';

interface IExaminationFormProps {
  onSubmit?(value?:any):void;
  onSave?(value?:any):void;
  form?: any;
  data?: any;
  fetchRateByCtnOwner?(payload?:any):void;
  fetchApplyByCtnNo?(payload?:any):void;
  changeFields?(payload?:{[key: string]:any}):any;
}
interface IPriceProps {
  price?:string | number;
}

const Price:React.FC<IPriceProps> = ({
  price=0
}:IPriceProps) => (
  <Text style={btStyles.extraText}>
    <Text style={{fontSize:12}}>¥ </Text>
    {toFixed2(price)}
  </Text>
)

const ExaminationForm:React.FC<IExaminationFormProps> = ({
  //onSubmit,
  fetchApplyByCtnNo,
  fetchRateByCtnOwner,
  onSave,
  data,
  form
}:IExaminationFormProps):React.ReactElement => {
  const { getFieldProps, getFieldValue, validateFields, /* setFieldsValue */ } = form;
  const { common } = useSelector((state:{[key:string]:any}) => state);
  const { loading } = useSelector((state:{[key:string]:any}) => state);
  const [switchChecked, setSwitchChecked] = useState<boolean>(data?.normalFlag === 'N');
  const applySearching = loading.effects.examine.fetchApplyByCtnNo
  const ctnOwerData: Array<{label:string; value:string}> = common.ctnOwner.map((owner:ICtnOwner) => ({
    label:owner.customerBrief,
    value:owner.customerCode
  }))??[];
  const handleSwitchChange = useCallback((checked:boolean) => {
    if(switchChecked!==checked) {
      setSwitchChecked(checked);
    }
  }, [setSwitchChecked, switchChecked]);
  const handleSaveExamine = useCallback<any>(() => {
    validateFields((error:ValidateErrors,values:IPostAndPutModel) => {
      if(!error) {
        const params: IPostAndPutModel = {
          ...data,
          ...values,
          normalFlag:normalFlags[Number(values.normalFlag)],
          ctnOwner: values.ctnOwner[0]
        }
        onSave && onSave(params)
      }
    })
  }, [data, validateFields]);

  const handleSearchApply = useCallback<any>(() => {
    const ctnNo = getFieldValue('ctnNo');
    fetchApplyByCtnNo && fetchApplyByCtnNo({
      ctnNo
    });  
  },[fetchApplyByCtnNo]);

  const handleCtnOwnerChange = useCallback<any>((selected:string[]) => {
    fetchRateByCtnOwner && fetchRateByCtnOwner(selected[0]);
  }, [fetchRateByCtnOwner]);

  return (
    <View style={styles.container}>
      <ScrollView style={{flex:1,marginBottom: 16}} keyboardShouldPersistTaps='always'>
        <List renderHeader='基本信息'>
          <InputItem 
            placeholder='请输入' 
            returnKeyType='search'
            onSubmitEditing={handleSearchApply}
            clear
            {
              ...getFieldProps('ctnNo', {
                initialValue: data.ctnNo
              })
            }
            extra={
              applySearching ? 
              <ActivityIndicator size='small' color={color.brand_color}/> :
              null
            }
          >
            <Text style={styles.name}>箱号</Text>
          </InputItem>
          <InputItem 
            placeholder='请输入'
            clear
            {
              ...getFieldProps('numberPlate', {
                initialValue: data.numberPlate
              })
            }
          >
            <Text style={styles.name}>车号</Text>
          </InputItem>
          <Picker
            data={ctnOwerData}
            {
              ...getFieldProps('ctnOwner', {
                initialValue: [data.ctnOwner],
                onChange: handleCtnOwnerChange
              })
            }
            itemStyle={{
              paddingVertical: 6
            }}
            actionTextUnderlayColor='#f5f5f5'
            cols={1}
          >
            <List.Item arrow='empty'>
              <Text style={styles.name}>箱主</Text>
            </List.Item>
          </Picker>
          <List.Item
            extra={
              <Switch
                color={color.brand_color}
                value={switchChecked}
                {
                  ...getFieldProps('normalFlag',{
                    valuePropName:'checked',
                    initialValue: data.normalFlag === 'N',
                    onChange: handleSwitchChange
                  })
                }
              />
            }
          >
            <Text style={styles.name}>好坏箱</Text>
          </List.Item>
        </List>
        {
          switchChecked ? <BreakageList /> : null
        }
      </ScrollView>
      <BottomButton extra={<Price price='200'/>}
        buttons={[
          {
            text:<Text style={{fontSize: 14}}>验箱保存</Text>,
            type: 'primary',
            onPress: handleSaveExamine,
            style: {
              borderRadius: 0
            }
          }
        ]}
      />
    </View>
  )
}

const normalFlags:string[] = ['Y', 'N'];

const mapStateToProps = ({examine}:{[key:string]:any}) => ({...examine});

const mapDispatchToProps = ({examine}:{[key:string]:any}) => ({...examine})


export default compose<React.FunctionComponent<IExaminationFormProps>>(
  connect(mapStateToProps, mapDispatchToProps),
  createForm<IExaminationFormProps>({
    mapPropsToFields(props) {
      const retureValue:Field = {};
      const { data } = props;
      Object.keys(data).forEach((fieldName:string) => {
        if(data[fieldName]) {
          retureValue[fieldName] = createFormField(
              fieldName === 'normalFlag' ? 
              data[fieldName] !== 'Y' : 
                fieldName === 'ctnOwner' ?
                [data[fieldName]] :
              data[fieldName]
          );
        }
      });
      return retureValue;
    },
    onFieldsChange(props, fields) {
      const { changeFields } = props;
      Object.keys(fields).forEach(name => {
        let value:string = name === 'normalFlag' ? 
        normalFlags[Number(fields[name].value)] : 
          name === 'ctnOwner' ?
          fields[name].value[0] :
        fields[name].value;
        changeFields && changeFields({
          [name]: value
        })
      });
    } 
  })
)(ExaminationForm);


