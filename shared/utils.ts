import * as CryptoJS from 'crypto-js';
/* import isEmpty from 'lodash/isEmpty';
import isArray from 'lodash/isArray';
import isString from 'lodash/isString';
import isFunction from 'lodash/isFunction';
import indexOf from 'lodash/indexOf'; */
import { ILoginPayload } from '../store/models/user';

interface IEncryptionParams {
  data: Partial<ILoginPayload>;
  key: string;
  param: string[];
}

export type TAuthorities = string | string[] | Function

export function isType(obj:any, type:string):boolean {
  return Object.prototype.toString.call(obj) === `[object ${type}]`
}

export function encryption(params:IEncryptionParams):ILoginPayload {
  let {
    data,
    param,
    key
  } = params;
  const result:ILoginPayload = JSON.parse(JSON.stringify(data));
  param.forEach((p:string) => {
    const _data:string = result[p]
    const _key:any = CryptoJS.enc.Latin1.parse(key)
    const iv:any = _key
    // 加密
    const encrypted:CryptoJS.WordArray = CryptoJS.AES.encrypt(
      _data,
      _key, 
      {
        iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.ZeroPadding
      }
    )
    result[p] = encrypted.toString()
  });
  return result
}

export const hasError = (fieldsError:any):boolean => Object.keys(fieldsError).some(field => fieldsError[field]);

/* export function checkPermissions(authorities?:TAuthorities, permissions:string=window.localStorage.getItem('permissions')??''):boolean {
  if (isEmpty(permissions)) {
    return true;
  }
  if (isArray(authorities)) {
    for (let i = 0; i < authorities.length; i += 1) {
      if (indexOf(permissions, authorities[i]) !== -1) {
        return true;
      }
    }
    return false;
  }

  if (isString(authorities)) {
    return indexOf(permissions, authorities) !== -1;
  }

  if (isFunction(authorities)) {
    return authorities(permissions);
  }

  throw new Error('Unsupport type of authorities.');
}; */