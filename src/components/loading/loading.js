import React, {useEffect} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import styles from './loading.style';

import firebase from 'firebase/app';
import 'firebase/auth';

const Loading = props => {
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      props.navigation.navigate(user ? 'TabBarNavigation' : 'Login');
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text>Loading</Text>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default Loading;
