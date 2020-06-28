import { init, Plugin, Middleware, RematchStore } from '@rematch/core';
import { Reducer } from 'redux';
import createLoadingPlugin, { LoadingConfig } from '@rematch/loading';

interface IRootReducer {
  [key:string]: Reducer<any, any>
}
export interface IRedux {
  middlewares?:Middleware[];
  reducers?:IRootReducer
}

const options:LoadingConfig = {};

const loadingPlugin:Plugin = createLoadingPlugin(options)

import user from './models/user';
import examine from './models/examine';
import common from './models/common';

const store:RematchStore = init({
  models: {
    user,
    examine,
    common
  },
  plugins: [loadingPlugin]
});

export default store;