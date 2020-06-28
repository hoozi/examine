import { stringify } from 'qs';
import { ModelEffects, ModelReducers,RematchDispatch,Models } from '@rematch/core';
import request, {  } from '../../shared/request';
import { toHump } from '../../shared/utils';
import { TApi } from './api.type';

export interface ICtnOwner {
  id: number;
  bank: string;
  bankNo: string;
  contacts: string;
  contactsTel: string;
  createTime: string;
  createUser: string;
  customerBrief: string;
  customerCode: string;
  customerName: string;
  remark: string;
  superiorUnit: string;
  taxNo: string;
  updateTime: string;
  updateUser: string;
}

interface IState {
  ctnOwner?: Array<Partial<ICtnOwner>>
  images?:Array<string>
}

interface IGetDirParams {
  customerType:string;
}

interface IUploadPayload {
  formData: FormData;
  index:number
}

type TState = IState

const api:TApi = {
  async queryDir(params: IGetDirParams) {
    return request<ICtnOwner>(`/oms/customer/list?${stringify(params)}`, { onlyData:true });
  },
  async upload(params: FormData) {
    return request<Array<string>>('/yms/ctn-repair/appUpload', {
      method: 'POST',
      body: params,
      headers: {
        'Content-Type': 'multipart/form-data;'
      },
      onlyData: true,
      loadingText: '照片上传中...'
    })
  },
  async download(name: string) {
    return request<string>(`/yms/ctn-repair/getFile/${name}`)
  }
}

const state:Partial<TState> = {
  ctnOwner:[],
  images: []
}
const reducers:ModelReducers<Partial<TState>> = {
  save(state, payload) {
    return Object.assign(state, payload)
  }
}
const effects = (dispatch:RematchDispatch<Models>):ModelEffects<Partial<TState>> => ({
  async fetchDirByType(customerType:string) {
    const response:Array<Partial<ICtnOwner>> = await api.queryDir({customerType});
    if(response) {
      this.save({[`${toHump(customerType)}`]:response})
    }
  },
  async upload(payload:IUploadPayload) {
    const { formData, index } = payload;
    const response:Array<string> = await api.upload(formData);
    if(response) {
      dispatch.examine.changeBreakage({
        index,
        photos: [...response]
      })
    }
  },
  async downloadImage(name:string) {
    const response = await api.download(name);
    return response
  }
})

export default {
  state,
  reducers,
  effects
}