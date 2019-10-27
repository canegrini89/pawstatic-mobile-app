/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState} from 'react';
import {Text, StatusBar, Button} from 'react-native';
import styles from './tabBarNavigation.style';
import firebase from 'firebase/app';
import 'firebase/auth';

import {TabBar} from '@ant-design/react-native';

const TabBarNavigation = () => {
  const [selectedTab, setSelectedTab] = useState('Life');

  const handleChangePage = text => {
    setSelectedTab(text);
  };

  const logOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {})
      .catch(error => error);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <TabBar
        unselectedTintColor="#949494"
        tintColor="#33A3F4"
        barTintColor="#000000">
        <TabBar.Item
          title="Life"
          key="Life"
          selected={selectedTab === 'Life'}
          data-seed="logId"
          onPress={() => handleChangePage('Life')}>
          <Button title="Log Out" onPress={() => logOut()} />
        </TabBar.Item>
        <TabBar.Item
          title="Koubei"
          key="Koubei"
          selected={selectedTab === 'Koubei'}
          data-seed="logId1"
          onPress={() => handleChangePage('Koubei')}>
          <Text>Koubei</Text>
        </TabBar.Item>
        <TabBar.Item
          title="Friend"
          key="Friend"
          dot
          selected={selectedTab === 'Friend'}
          onPress={() => handleChangePage('Friend')}>
          <Text>Friend</Text>
        </TabBar.Item>
        <TabBar.Item
          title="Home"
          key="Home"
          dot
          selected={selectedTab === 'Home'}
          onPress={() => handleChangePage('Home')}>
          <Text>Friend</Text>
        </TabBar.Item>
      </TabBar>
    </>
  );
};

export default TabBarNavigation;
