  
import { StyleSheet, ViewStyle } from 'react-native';

interface IScanSearchBarStyle {
  container: ViewStyle,
  barTextInput: ViewStyle
}

export default StyleSheet.create<IScanSearchBarStyle>({
  container: {
    borderRadius: 100,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 12,
    paddingHorizontal: 12,
    height: 32
  },
  barTextInput: {
    flex:1,
    paddingVertical:0,
    fontSize: 14
  }
})