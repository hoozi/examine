import { ViewStyle, FlexStyle } from 'react-native';
import { color as themeColor } from '../constants/theme';

const getBorderWidth = (widths:string[]): ViewStyle[] => [
  {
    borderWidth: 0
  },
  {
    borderWidth: Number(widths[0])
  },
  {
    borderTopWidth: Number(widths[0]),
    borderBottomWidth: Number(widths[0]),
    borderLeftWidth: Number(widths[1]),
    borderRightWidth: Number(widths[1])
  },
  {
    borderTopWidth: Number(widths[0]),
    borderBottomWidth: Number(widths[2]),
    borderLeftWidth: Number(widths[1]),
    borderRightWidth: Number(widths[1])
  },
  {
    borderTopWidth: Number(widths[0]),
    borderBottomWidth: Number(widths[2]),
    borderLeftWidth: Number(widths[3]),
    borderRightWidth: Number(widths[1])
  }
]

export const border = (width:string | number='', color:string=themeColor.border_color_base ): ViewStyle => {
  const splitedWidth:string[] = width.toString().split(' ');
  const retrunValue:ViewStyle = {};
  const spitedWidthLen = splitedWidth.length;
  retrunValue['borderColor'] = color;
  return {
    ...retrunValue,
    ...getBorderWidth(splitedWidth)[spitedWidthLen]
  };
}