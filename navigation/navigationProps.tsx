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
  isTab?:boolean;
  modal?: boolean;
  options?: {} | StackNavigationOptions | TOptionsForFunction;
}

import Login from '../screens/User/Login';
import Home from '../screens/Home';
import Examination from '../screens/Examination';
import History from '../screens/History';

const authorizedNavigationProps:INavigationProps[] = [
  {
    name: 'Home',
    key: 'Home',
    component: Home,
    options: {
      title: '验箱'
    }
  },
  {
    name: 'Examination',
    key: 'Examination',
    component: Examination,
    isTab: true,
    options: {
      title: '验箱'
    }
  },
  {
    name: 'History',
    key: 'History',
    component: History,
    isTab: true,
    options: {
      title: '历史'
    }
  },
  {
    name: 'Account',
    key: 'Account',
    component: Examination,
    isTab: true,
    options: {
      title: '我的'
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

export default authorizedNavigationProps