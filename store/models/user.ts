import { stringify } from 'qs';
import { ModelEffects, ModelReducers } from '@rematch/core';
import request from '../../shared/request';
import { setToken, removeToken } from '../../shared/token';
import { encryption } from '../../shared/utils';
import { navigate } from '../../navigation';
import { TApi } from './api.type';

interface ISysUser {
  avatar: string;
  createTime: string;
  delFlag:string;
  deptId: number;
  lockFlag: string;
  password: string;
  phone: string;
  qqOpenid: string;
  tenantId: number;
  updateTime: string;
  userId: number;
  username: string;
  wxOpenid: string
}

export interface IUserToken {
  access_token: string;
  refresh_token: string;
}

export interface IUser {
  permissions: string[];
  sysUser:Partial<ISysUser>;
  roles: number[];
}

export interface ILoginPayload {
  username: string;
  password: string;
  code: string;
  randomStr?: number;
  callback?():void;
  [key: string]:any;
}

interface IParams extends ILoginPayload {
  grant_type: string
  scope: string
}

const api:TApi = {
  async queryToken(params:ILoginPayload) {
    return request<IUserToken>(`/auth/oauth/token?${stringify(params)}`, {
      method: 'POST',
      loadingText: '登录中...'
    });
  },
  async queryCurrentUser() {
    return request<IUser>('/admin/user/info', { onlyData: true })
  }
}

const state:Partial<IUser> = {
  permissions: [''],
  sysUser:{},
  roles: [-999]
}
const reducers:ModelReducers<Partial<IUser>> = {
  save(state:Object, payload:Object) {
    return Object.assign(state, payload)
  }
}
const effects:ModelEffects<Partial<IUser>> = {
  async login(payload:ILoginPayload) {
    const { callback, ...restPayload } = payload;
    const randomStr = Number(Date.now());
    const encryptioned:ILoginPayload = encryption({
      data:{ ...restPayload, randomStr},
      key:'weihuangweihuang',
      param: ['password']
    });
    const params:IParams = {
      ...restPayload,
      randomStr,
      grant_type: 'password',
      scope: 'server',
      password: encryptioned.password
    }
    const token:IUserToken = await api.queryToken(params);
    if(token) {
      await setToken(token.access_token);
      this.fetchCurrentUser();
      callback && callback()
    }
  },
  async fetchCurrentUser()  {
    const currentUser:IUser = await api.queryCurrentUser();
    if(currentUser) {
      this.save(currentUser);
    }
  },
  async logout(callback) {
    await removeToken();
    callback && callback()
  }
}

export default {
  state,
  reducers,
  effects
}