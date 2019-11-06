/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import firebase from 'react-native-firebase';

var firebaseConfig = {
  apiKey: "AIzaSyCIR1z2AWk8ItB8ufLMvEuYbCkPWDLeVQg",
  authDomain: "pawtasticapp.firebaseapp.com",
  databaseURL: "https://pawtasticapp.firebaseio.com",
  projectId: "pawtasticapp",
  storageBucket: "pawtasticapp.appspot.com",
  messagingSenderId: "1066314148302",
  appId: "1:1066314148302:web:631c3038bf4ec02fe4a39f",
  measurementId: "G-V056Q5Y9ZB"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

AppRegistry.registerComponent(appName, () => App);
