  
import { StyleSheet, ViewStyle } from 'react-native';
import { color } from '../../../constants/theme';

interface ILoginStyle {
  container: ViewStyle;
  loginTitle: ViewStyle;
  loginForm: ViewStyle;
  textInput: ViewStyle;
  loginItem: ViewStyle;
  loginButton: ViewStyle;
}

export default StyleSheet.create<ILoginStyle>({
  container: {
    flex: 1,
    backgroundColor: color.fill_color
  },
  loginTitle: {
    fontSize: 32,
    color: color.text_base_color,
    marginBottom: 52,
    fontWeight: '600'
  },
  loginForm: {
    flex:1,
    justifyContent: 'center',
    paddingHorizontal: 26,
    alignItems: 'flex-start'
  },
  textInput: {
    paddingLeft: 4,
    flex:1,
    fontSize: 14,
    color: color.text_base_color
  },
  loginItem: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 100,
    marginTop: 18,
    paddingHorizontal: 15,
    backgroundColor: '#f0f0f0',
    height: 42
  },
  loginButton: {
    width: '100%',
    borderRadius: 100,
    marginTop: 52
  }
})