import { ViewStyle, FlexStyle } from 'react-native';

export const full:ViewStyle = {
  flex:1
}

export const fullCenter:ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center'
}

type TSpace = 2 | 4 | 6 | 8 | 10 | 12 | 14 | 16 | 18 | 20 | 22 | 24 | 32 | 36 | 42 | 48 | 52 | 64 | 72
const spaceMap:{[key:string]: string} = {
  'p': 'padding',
  'ph': 'paddingHorizontal',
  'pv': 'paddingVertical',
  'pt': 'paddingTop',
  'pb': 'paddingBottom',
  'pl': 'paddingLeft',
  'pr': 'paddingRight',
  'm': 'margin',
  'mh': 'marginHorizontal',
  'mv': 'marginVertical',
  'mt': 'marginTop',
  'mb': 'marginBottom',
  'ml': 'marginLeft',
  'mr': 'marginRight'
} 

interface ISpaceParams {
  [key: string]: number;
}

export const space = (params:ISpaceParams):FlexStyle | Object  => {
  let ret:FlexStyle & {[key:string]:number} = {};
  let k:string;
  for(k in params) {
    ret[spaceMap[k]] = params[k];
  }
  return ret
}

export const circle:ViewStyle = {
  borderRadius: 100
}