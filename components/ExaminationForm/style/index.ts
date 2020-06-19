  
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { color } from '../../../constants/theme';

interface IExaminationFormStyle {
  container: ViewStyle;
  item: ViewStyle;
  extra: ViewStyle;
  extraText: TextStyle;
  breakageList: ViewStyle;
  breakageListHeader: ViewStyle;
  breakageListTitle: TextStyle;
  breakageCard: ViewStyle;
  breakageCardHeader: ViewStyle;
  breakageCardTitle: TextStyle;
  breakageCardBody: ViewStyle;
  name: TextStyle;
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
  breakageListHeader: {
    height:42,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: color.border_color_base,
    alignItems: 'center'
  },
  breakageListTitle: {
    fontWeight: '900',
    fontSize: 14,
    color: color.text_base_color
  },
  breakageCard: {
    marginTop: 12,
    backgroundColor: '#fff',
    borderRadius: 4,
    borderColor: color.border_color_base,
    borderWidth: StyleSheet.hairlineWidth,
    flex:1
  },
  breakageCardHeader: {
    padding:12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: color.border_color_base
  },
  breakageCardTitle: {
    fontSize: 16,
    color: color.text_base_color
  },
  breakageCardBody: {
    padding: 12
  },
})