import React, { useCallback,useState,useRef } from 'react';
import { View, SafeAreaView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RematchDispatch, Models } from '@rematch/core';
import { navigate } from '../../navigation';
import { color } from '../../constants/theme';
import ScanSearchBar from '../../components/ScanSearchBar';
import WhenFocusStatusBar from '../../components/WhenFocusStatusBar';
import ExaminationForm from '../../components/ExaminationForm';
import styles from './style';
const Examination:React.FC<any> = ():React.ReactElement => {
  const { examine } = useDispatch<RematchDispatch<Models>>();
  const handleSaveExamination = useCallback((values) => {
    examine.postExamine(values);
  },[])
  return (
    <SafeAreaView style={styles.container}>
      <WhenFocusStatusBar barStyle='light-content' backgroundColor={color.brand_color}/>
      <View style={styles.topBar}>
        <ScanSearchBar/>
      </View>
      <View style={styles.scrollView}>
        <ExaminationForm 
          onSave={handleSaveExamination} 
        />
      </View>
    </SafeAreaView>
  )
}

export default Examination

