import * as React from 'react';
import AppNavigation from './navigation';
import { Provider as AntdProvider } from '@ant-design/react-native';
import { Provider } from 'react-redux';
import theme from './constants/theme';
import store from './store';

export default () => {
  return (
    <Provider store={store}>
      <AntdProvider theme={theme}>
        <AppNavigation/>
      </AntdProvider>
    </Provider>
  );
};

