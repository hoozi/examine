import * as React from 'react';
import { CardStyleInterpolators,StackNavigationOptions, StackScreenProps } from '@react-navigation/stack';
import { RootParamsList, TabParamsList } from './index';

type TTabName = keyof TabParamsList;
type TRootName = keyof RootParamsList;
type TNavigationName = TTabName | TRootName;
type TOptionsForFunction = (opts: StackScreenProps<TabParamsList & RootParamsList, TNavigationName>)=>StackNavigationOptions
export interface INavigationProps extends StackNavigationOptions {
  name: TNavigationName;
  key: string;
  component: React.ComponentType<any>;
  initialParams?: any;
  modal?: boolean;
  options?: {} | StackNavigationOptions | TOptionsForFunction;
}

import Login from '../screens/User/Login';
import Examination from '../screens/Examination';
import History from '../screens/History';
import Logout from '../screens/Logout';
import Account from '../screens/Account';
import Camera from '../screens/Camera';

export const authorizedNavigationProps:INavigationProps[] = [
  {
    name: 'Examination',
    key: 'Examination',
    component: Examination,
    options: {
      title: '验箱'
    }
  },
  {
    name: 'History',
    key: 'History',
    component: History,
    options: {
      title: '历史'
    }
  },
  {
    name: 'Account',
    key: 'Account',
    component: Account,
    options: {
      title: '我的'
    }
  }
]

export const authorizedNotInTabNavigationProps:INavigationProps[] = [
  {
    name: 'Logout',
    key: 'Logout',
    component: Logout,
    options: {
      headerShown: false,
      cardStyleInterpolator: CardStyleInterpolators.forNoAnimation,
    }
  },
  {
    name: 'Camera',
    key: 'Camera',
    component: Camera,
    options: {
      headerShown: false,
      cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS
    }
  }
]


export const loginNavigationProps:INavigationProps = {
  name: 'Login',
  key: 'Login',
  component: Login,
  options: {
    headerShown: false,
    cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
  }
}

