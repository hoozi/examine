import { Toast, Portal } from '@ant-design/react-native';
import { getToken } from './token';
import { SERVICE_URL } from '../constants';

interface ICodeMessage {
  [code: string]: string;
}

export interface IResponseData<T = any>  {
  code?:number;
  msg?:string;
  data?:T
};

export interface IApiOptions {
  onlyData?:boolean;
  isAuth?:boolean;
  loadingText?:string;
}

export type TResultData<T> = 
 | T
 | T[]
 | IResponseData<T[]>
 | IResponseData<T>
 | IResponseData

export type TOptions = RequestInit & IApiOptions;

const codeMessage:ICodeMessage = {
  '200': '操作成功',
  '401': '用户没有权限',
  '403': '访问被禁止',
  '404': '资源不存在',
  '426': '用户名或密码错误',
  '428': '缺少请求参数',
  '500': '服务器发生错误',
  '502': '网关错误',
  '504': '网关超时',
  '999': '未知错误'
};

function checkStatus(response: Response): Response {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const errortext:string = codeMessage[response.status??999] || response.statusText;
  response.status != 401 && Toast.fail(`${errortext}(${response.status??999})`);
  throw response;
}

function prv(text:string, options?:TOptions):number {
  return Toast.loading(text, 0);
}

function parseData<T>(response: IResponseData, options?:IApiOptions):TResultData<T> {
  if(!response) {
    return {};
  } else {
    if(!response.data) {
      return response
    } else {
      return options?.onlyData ? response.data : response
    }
  }
  return response;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default async function request<T>(url: string, options?: TOptions): Promise<T> {
  let toastKey:number = -1;
  if(options?.loadingText) {
    toastKey = prv(options?.loadingText, options)
  }
  const token = await getToken();
  const newOptions: RequestInit = {
    credentials: 'include', 
    ...options
  };
  if (newOptions.method === 'POST' || newOptions.method === 'PUT') {
    if (!(newOptions.body instanceof FormData)) {
      newOptions.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        ...newOptions.headers,
      };
      newOptions.body = JSON.stringify(newOptions.body);
    } else {
      newOptions.headers = {
        Accept: 'application/json',
        ...newOptions.headers,
      };
    }
  }
  newOptions.headers = {
    ...newOptions.headers,
    Authorization: token ? `Bearer ${token}` : 'Basic YXBwOmFwcA=='
  }
  return fetch(`${SERVICE_URL}${url}`, newOptions)
    .then(checkStatus)
    .then(async (response:Response):Promise<any> => {
      Portal.remove(toastKey);
      try {
        const _response =  await response.json();
        return parseData<T>(_response, options)
      } catch(e) {
        return e;
      }  
    })
    .catch((response: Response) => {
      Portal.remove(toastKey);
      const { status } = response;
      if (status === 401 || status === 403) {
        
      }
    });
}