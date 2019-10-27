/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState} from 'react';
import {StatusBar} from 'react-native';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import TabBarNavigation from './src/components/tabBarNavigation';
import Loading from './src/components/loading';
import Login from './src/components/login';

const App = createAppContainer(
  createSwitchNavigator(
    {
      Loading,
      Login,
      // Signup,
      TabBarNavigation,
    },
    {
      initialRouteName: 'Loading',
    },
  ),
);

export default App;
