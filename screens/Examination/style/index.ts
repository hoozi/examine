  
import { StyleSheet, ViewStyle } from 'react-native';
import { color } from '../../../constants/theme';

interface IExaminationStyle {
  container: ViewStyle;
  topBar: ViewStyle;
  scrollView: ViewStyle
}

export default StyleSheet.create<IExaminationStyle>({
  container: {
    flex: 1, 
    backgroundColor: color.brand_color
  },
  topBar: {
    height: 52, 
    paddingVertical: 8
  },
  scrollView: {
    flex: 1, 
    backgroundColor: color.fill_color
  }
})