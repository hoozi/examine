import React,{ useEffect, useReducer, createContext } from 'react';
import { Platform, StatusBar } from 'react-native';
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useDispatch } from 'react-redux';
import { RematchDispatch, Models } from '@rematch/core';
import CaiNiao from '../icon/CaiNiao';
import { 
  createStackNavigator, 
  StackNavigationOptions, 
  CardStyleInterpolators, 
  HeaderStyleInterpolators 
} from '@react-navigation/stack';
import { loginNavigationProps,authorizedNotInTabNavigationProps,authorizedNavigationProps } from './navigationProps';
import { color } from '../constants/theme';
import { getToken } from '../shared/token';

export const AuthContext:React.Context<any> = createContext({});

const headerOptions:StackNavigationOptions = {
  headerStyle: {
    backgroundColor: color.brand_color
  },
  headerTintColor: color.tint_color,
  headerTitleAlign: 'center'
}

export type RootParamsList = {
  Main: undefined,
  Login: undefined,
  Logout: undefined,
  Camera: undefined
}

export type TabParamsList = {
  Examination: undefined,
  History: undefined,
  Account: undefined
}

type TIconNameMap = {
  [key:string]: string[]
}

const RootStack = createStackNavigator<RootParamsList & TabParamsList>();
const TabStack = createBottomTabNavigator<TabParamsList>();
const iconNameMap:TIconNameMap = {
  'Examination': ['jiankongshexiangtou-xianxing', 'jiankongshexiangtou'],
  'History': ['danju-xianxing', 'danju'],
  'Account': ['yonghu-xianxing', 'yonghu']
}

const TabNavigation:React.FC<{}> = () => (
  <TabStack.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon({ focused, color, size }) {
        return <CaiNiao name={iconNameMap[route.name][Number(focused)]} color={color} size={size}/>
      }
    })}
    tabBarOptions={{
      style: {
        elevation:0,
        borderTopColor:color.border_color_base,
        paddingBottom:2
      },  
      labelStyle: {
        marginTop:-4
      },
      activeTintColor: color.brand_color,
      inactiveTintColor: '#d7d8dd',
      safeAreaInsets: Platform.OS === 'android' ? {
        bottom: 0
      } : {}
    }}
  >
    {
      authorizedNavigationProps.map(props => <RootStack.Screen {...props}/>)
    }
  </TabStack.Navigator>
);


const AppNavigation:React.FC<{}> = () => {
  const { common } = useDispatch<RematchDispatch<Models>>();
  const [token, forceRender] = useReducer(function (s:string | null,tk:string | null) {
    return tk;
  }, `${Date.now()}`);
  useEffect(() => {
    async function checkToken(): Promise<void> {
      try {
        const _token:string | null = await getToken();
        if(_token) {
          common.fetchDirByType('CTN_OWNER');
        }
        if(_token !== token) {
          forceRender(_token);
        }
      } catch(e) {
        return e
      }
    }
    checkToken();
    //return;
  },[forceRender]);
  return (
    <AuthContext.Provider value={{forceRender, token}}>
      <NavigationContainer ref={navigationRef}>
        <RootStack.Navigator 
          screenOptions={
            {
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
              headerStyleInterpolator: HeaderStyleInterpolators.forSlideLeft,
              ...headerOptions
            }
          }
        >
          {
            token ? 
            <>
              <RootStack.Screen 
                name='Main' 
                component={TabNavigation} 
                options={{
                  headerShown: false,
                  headerStatusBarHeight: Platform.OS === 'android' ? 0 : StatusBar.currentHeight,
                  cardStyleInterpolator: CardStyleInterpolators.forNoAnimation
                }}
              />
              {
                authorizedNotInTabNavigationProps.map(props => <RootStack.Screen {...props}/>)
              }
            </> : 
            <RootStack.Screen {...loginNavigationProps}/>
          }
        </RootStack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  )
}

const navigationRef:React.RefObject<NavigationContainerRef> = React.createRef();

export function navigate(name:string, params?: any) {
  navigationRef.current?.navigate(name, params);
}
export function goBack() {
  navigationRef.current?.goBack();
}

export default AppNavigation