import React, {useState} from 'react';
import {Text, StatusBar, Button} from 'react-native';
import styles from './tabBarNavigation.style';
import firebase from 'firebase/app';
import 'firebase/auth';
import Profile from '../../screens/profile'

import {TabBar} from '@ant-design/react-native';

const TabBarNavigation = () => {
  const [selectedTab, setSelectedTab] = useState('Home');

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
          title="Home"
          key="Home"
          selected={selectedTab === 'Home'}
          data-seed="logId"
          onPress={() => handleChangePage('Home')}>
          <Button title="Log Out" onPress={() => logOut()} />
        </TabBar.Item>
        <TabBar.Item
          title="Pets"
          key="Pets"
          selected={selectedTab === 'Pets'}
          data-seed="logId1"
          onPress={() => handleChangePage('Pets')}>
          <Text>Koubei</Text>
        </TabBar.Item>
        <TabBar.Item
          title="Plus"
          key="Plus"
          selected={selectedTab === 'Plus'}
          data-seed="logId1"
          onPress={() => handleChangePage('Plus')}>
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
          title="Profile"
          key="Profile"
          dot
          selected={selectedTab === 'Profile'}
          onPress={() => handleChangePage('Profile')}>
            <Profile />          
        </TabBar.Item>
      </TabBar>
    </>
  );
};

export default TabBarNavigation;
