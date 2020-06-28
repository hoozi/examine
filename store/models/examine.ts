import { stringify } from 'qs';
import { ModelEffects, ModelReducers } from '@rematch/core';
import groupBy from 'lodash/groupBy';
import request, { TResultData } from '../../shared/request';
import { TApi } from './api.type';

interface IRate {
  label: string;
  value: string;
  children?:IRateChildren[]
}

interface IRateChildren {
  label: string;
  value: string;
  price?:number;
  children?: IRateChildren[];
}

export interface IPostAndPutModel {
  id?:number;
  ctnNo:string;
  ctnOwner:string;
  numberPlate: string;
  eir: string;
  normalFlag: string;
  breakList?: Array<IBreakage>;
  [key:string]: string | number | Array<IBreakage> | undefined
}

export interface IBreakage {
  id?:number;
  componentCname: string;
  repairName: string;
  length: number;
  width:number;
  costRate?:number;
  photos: Array<string>;
  [key:string]: any;
}

/* export interface IPhoto {
  id: number;
  uri: string
} */

interface IGetApplyParams {
  ctnNo: string;
}

interface IGetRateParams {
  shipownerName: string
}

interface IState {
  data?:Partial<IPostAndPutModel>,
  rate?:Array<IBreakage>
}

export type TState = IState

const api:TApi = {
  async postExamine(body:IPostAndPutModel) {
    return request<IPostAndPutModel>('/yms/ctn-apply/appCheck', {
      method: 'POST',
      loadingText: '正在保存...',
      body
    });
  },
  async queryRateByCtnOwner(params:IGetRateParams) {
    return request<IBreakage>(`/bms/fee-shipowner-rate/getList?${stringify(params)}`, { onlyData: true });
  },
  async queryApplyByCtnNo(params: IGetApplyParams) {
    return request<IPostAndPutModel>(`/yms/ctn-apply/getApply?${stringify(params)}`, { onlyData: true });
  }
}

const state:Partial<TState> = {
  data:{
    id:undefined,
    ctnNo:'',
    numberPlate: '',
    eir: '',
    normalFlag: 'Y',
    breakList: []
  },
  rate:[]
}
const reducers:ModelReducers<Partial<TState>> = {
  save(state, payload) {
    return Object.assign(state, payload)
  },
  changeFields(state, payload) {
    const newData:{[key:string]:Partial<IPostAndPutModel>} = {
      data: {
        ...state.data,
        ...payload
      }
    }
    return Object.assign(state, newData)
  },
  addBreakage(state, payload) {
    const newData:{[key:string]:Partial<IPostAndPutModel>} = {
      data: {
        ...state.data,
        breakList: [payload,...state.data?.breakList??[]]
      }
    }
    return Object.assign(state, newData)
  },
  deleteBreakage(state, payload) {
    const breakList = state.data?.breakList?.filter((item:IBreakage) => {
      return item.id!==payload.id
    });
    const newData:{[key:string]:Partial<IPostAndPutModel>} = {
      data: {
        ...state.data,
        breakList
      }
    }
    return Object.assign(state, newData) 
  },
  changeBreakage(state, payload) {
    const {index, photos=[], photoType='add', ...restPayload} = payload;
    
    const current:Partial<IBreakage> = state.data?.breakList ? 
        state.data?.breakList[index] : 
        {};
    const newPhotos = photoType === 'add' ? 
      [...current.photos??[], ...photos] : 
      current.photos?.filter(p => p!=photos);
    const newCurrent:IBreakage = {
      ...current,
      ...restPayload,
      photos: newPhotos
    }
    state.data?.breakList?.splice(index,1,newCurrent)
    const newData:{[key:string]:Partial<IPostAndPutModel>} = {
      data: {
        ...state.data,
        breakList: state.data?.breakList
      }
    }
    return Object.assign(state, newData) 
  }
}
const effects:ModelEffects<Partial<TState>> = {
  async fetchApplyByCtnNo(payload:IGetApplyParams) {
    const response:IPostAndPutModel = await api.queryApplyByCtnNo(payload);
    if(response) {
      this.save({data:response});
      if(response.ctnOwner) {
        this.fetchRateByCtnOwner(response.ctnOwner);
      }
    }
  },
  async fetchRateByCtnOwner(shipownerCode:string) {
    const response:IBreakage[] = await api.queryRateByCtnOwner({shipownerCode});
    let rate: Array<IRate> = [];
    if(response && response.length) {
      const componentGroup = groupBy(response, 'componentCode');
      for(let c in componentGroup) {
        const componentItem = componentGroup[c];
        const repairGroup = groupBy(componentItem, 'repairCode');
        rate.push({
          label: componentItem[0].componentCname,
          value: componentItem[0].componentCname,
          children: []
        })
        for(let r in repairGroup) {
          const repairItem = repairGroup[r];
          rate[rate.length-1].children?.push({
            label: repairItem[0].repairName,
            value: repairItem[0].repairName,
            children: repairItem.map(rep => {
              return {
                label:`${rep.length}x${rep.width}`,
                value:`${rep.length}x${rep.width}`
              }
            })
          })
        }
      }
    }
    this.save({rate})
  },
  async postExamine(payload:IPostAndPutModel) {
    await api.postExamine(payload);
  }
}

export default {
  state,
  reducers,
  effects
}