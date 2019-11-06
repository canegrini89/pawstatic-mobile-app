import React, {useState, useEffect} from 'react';
import {Text, StatusBar, Button} from 'react-native';
import styles from './tabBarNavigation.style';
import firebase from 'react-native-firebase';
import Profile from '../../screens/profile'
import Friends from '../../screens/friends'
import Pets from '../../screens/pets'
import { GoogleSignin } from 'react-native-google-signin';

import {TabBar, Icon} from '@ant-design/react-native';

const TabBarNavigation = (props) => {
  const [selectedTab, setSelectedTab] = useState('Home');
  const [notifications, setNotification] =useState([])

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      firebase.database().ref('users').child(user.uid + '/notifications').on('value', (snap => {
        if (snap.val()) {
        let toArray = []
        Object.keys(snap.val()).forEach((item) => {
          toArray.push(snap.val()[item]);
        });
        setNotification(toArray)
      }
      })
    )
    })
  }, [])

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
          icon={<Icon name="home" />}
          selected={selectedTab === 'Home'}
          data-seed="logId"
          onPress={() => handleChangePage('Home')}>
          <Button title="Log Out" onPress={() => logOut()} />
        </TabBar.Item>
        <TabBar.Item
          title="Pets"
          key="Pets"
          icon={<Icon name="smile" />}
          selected={selectedTab === 'Pets'}
          data-seed="logId1"
          onPress={() => handleChangePage('Pets')}>
          <Pets/>
        </TabBar.Item>
        <TabBar.Item
          title="Plus"
          key="Plus"
          icon={<Icon name="plus-circle" />}
          selected={selectedTab === 'Plus'}
          data-seed="logId1"
          onPress={() => handleChangePage('Plus')}>
          <Text>Koubei</Text>
        </TabBar.Item>
        <TabBar.Item
          title="Friend"
          key="Friend"
          icon={<Icon name="heart" />}
          dot
          selected={selectedTab === 'Friend'}
          onPress={() => handleChangePage('Friend')}>
          <Friends/>
        </TabBar.Item>
        <TabBar.Item
          title="Profile"
          key="Profile"
          dot
          badge={notifications.length}
          icon={<Icon name="user" />}
          selected={selectedTab === 'Profile'}
          onPress={() => handleChangePage('Profile')}>
            <Profile />          
        </TabBar.Item>
      </TabBar>
    </>
  );
};

export default TabBarNavigation;
