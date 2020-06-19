import React, { useContext } from 'react';
import { View, SafeAreaView, ScrollView } from 'react-native';
import styles from './style';
import { color } from '../../constants/theme';
import ScanSearchBar from '../../components/ScanSearchBar';
import WhenFocusStatusBar from '../../components/WhenFocusStatusBar';
import ExaminationForm from '../../components/ExaminationForm';

export default () => {
  return (
    <SafeAreaView style={styles.container}>
      <WhenFocusStatusBar barStyle='light-content' backgroundColor={color.brand_color}/>
      <View style={styles.topBar}>
        <ScanSearchBar/>
      </View>
      <View style={styles.scrollView}>
        <ExaminationForm/>
      </View>
    </SafeAreaView>
  )
}


