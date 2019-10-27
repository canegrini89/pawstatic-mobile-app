/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDOLOZLbpgxat8YxLX5QzbtQBkInXyMJnw',
  authDomain: 'pawtastic-d95d8.firebaseapp.com',
  databaseURL: 'https://pawtastic-d95d8.firebaseio.com',
  projectId: 'pawtastic-d95d8',
  storageBucket: 'pawtastic-d95d8.appspot.com',
  messagingSenderId: '1083305317024',
  appId: '1:1083305317024:web:2a74457f3ad40a60cf6fc5',
  measurementId: 'G-QQFQXY0EF2',
};

firebase.initializeApp(firebaseConfig);

AppRegistry.registerComponent(appName, () => App);
