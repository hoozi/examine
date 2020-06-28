  
import { StyleSheet, ViewStyle, TextStyle, ImageStyle, View } from 'react-native';
import { border } from '../../../style/common';
import { color } from '../../../constants/theme';

interface IExaminationFormStyle {
  container: ViewStyle;
  item: ViewStyle;
  extra: ViewStyle;
  extraText: TextStyle;
  breakageList: ViewStyle;
  breakageListAdd: ViewStyle;
  breakageListAddText: TextStyle;
  breakageCard: ViewStyle;
  breakageCardHeader: ViewStyle;
  breakageCardTitle: TextStyle;
  breakageCardBody: ViewStyle;
  breakageCardDelete: TextStyle;
  breakageAddImage: ViewStyle;
  breakageImage: ImageStyle;
  breakageImageContainer: ViewStyle;
  breakageCardFooter: ViewStyle;
  breakageRemark: TextStyle;
  deleteImage: ViewStyle;
  name: TextStyle;
}

const imageStyle:ImageStyle = {
  borderRadius:4,
  width: 62,
  height: 62
}

export default StyleSheet.create<IExaminationFormStyle>({
  container: {
    flex:1
  },
  item: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  extra: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  extraText: {
    color: '#999'
  },
  name: {
    fontSize: 14, 
    color: color.text_base_color
  },
  breakageList: {
    flex: 1,
    paddingBottom: 40,
  },
  breakageListAdd: {
    height:42,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    ...border(`${StyleSheet.hairlineWidth} 0 ${StyleSheet.hairlineWidth}`),
    alignItems: 'center'
  },
  breakageListAddText: {
    fontWeight: '900',
    fontSize: 16,
    marginLeft: 4,
    color: color.warning_color
  },
  breakageCard: {
    marginTop: 12,
    backgroundColor: '#fff',
    borderColor: color.border_color_base,
    borderWidth: StyleSheet.hairlineWidth
  },
  breakageCardHeader: {
    paddingHorizontal:12,
    height: 36,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: color.border_color_base,
    backgroundColor: '#f9f9f9'
  },
  breakageCardTitle: {
    fontSize: 14,
    color: color.text_base_color
  },
  breakageCardDelete: {
    color: color.warning_color
  },
  breakageCardBody: {
    padding: 12
  },
  breakageAddImage: {
    ...imageStyle,
    justifyContent: 'center',
    alignItems: 'center',
    ...border(StyleSheet.hairlineWidth)
  },
  breakageImageContainer: {
    ...imageStyle,
    marginRight: 8,
    
  },
  breakageImage: {
    ...imageStyle
  },
  deleteImage: {
    width: 20,
    height: 20,
    borderRadius: 100,
    backgroundColor: '#ff5b05',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -8,
    right: -8
  },
  breakageCardFooter: {
    ...border(`${StyleSheet.hairlineWidth} 0 0 0`),
    paddingVertical: 8,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center'
  },
  breakageRemark: {
    flex:1,
    height: 24,
    padding: 0,
    marginLeft: 8
  }
})