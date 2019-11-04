import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  Modal,
  FlatList,
} from 'react-native';
import { Badge } from '@ant-design/react-native';
import styles from './options.styles'
import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
import 'firebase/storage'

const Options = (props) =>{

  const [modalVisible, setModal]= useState(false)
  const [notificationList, setNotificationList] = useState([])
  const [currentUser, setCurrentUser] =useState({})
  const [userPciture, setUserPicture] = useState('')


  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setCurrentUser(user)
      firebase.database().ref('users').child(user.uid + '/notifications').on('value', (snap => {
        if (snap.val()) {
        let toArray = []
        Object.keys(snap.val()).forEach((item) => {
          toArray.push(snap.val()[item]);
        });
        setNotificationList(toArray)
      }
      }))
      firebase.database().ref('users').child(currentUser.uid + '/picture').on('value', (snap) => {
        setUserPicture(snap.val())
      })
    })
  }, [])
  
  const clickEventListener = () => {
    setModalVisible(true)
  }
  const setModalVisible = (visible) => {
    setModal(visible)
  }
  const sendInvitation = (item) => {
    firebase.database().ref('users/'+ currentUser.uid + '/notifications/'+ item.from.id).remove()
    firebase.database().ref('users/'+ item.from.id + '/followers/'+ currentUser.uid).set({
      name: currentUser.displayName,
      email: currentUser.email,
      id: currentUser.uid,
      picture: userPciture,
    })
    firebase.database().ref('users/'+ currentUser.uid + '/following/'+ item.from.id).set({
      name:item.from.name,
      email: item.from.email,
      id: item.from.id,
      picture: item.from.picture
    })
  }

  return (
    <View style={styles.container}>
    <View style={styles.body}>
      <View style={styles.bodyContent}>
        <TouchableOpacity style={styles.menuBox} onPress={() => clickEventListener()}>
          <Badge
            text={2}
            size='large'
          >
            <Image style={styles.icon} source={{uri: 'https://cdn2.iconfinder.com/data/icons/icontober/64/Inkcontober_United-128.png'}}/>
            <Text style={styles.info}>Friends</Text>
          </Badge>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuBox}>
          <Badge>
            <Image style={styles.icon} source={{uri: 'https://cdn2.iconfinder.com/data/icons/icontober/64/Inkcontober_Squeak-128.png'}}/>
            <Text style={styles.info}>Pets</Text>
          </Badge>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuBox}>
          <Badge>
            <Image style={styles.icon} source={{uri: 'https://cdn1.iconfinder.com/data/icons/ecommerce-61/48/eccomerce_-_receipt-128.png'}}/>
            <Text style={styles.info}>Mentions</Text>
          </Badge>
        </TouchableOpacity>
      </View>
  </View>

  <Modal
    animationType={'fade'}
    transparent={true}
    onRequestClose={() => setModal(false)}
    visible={modalVisible}>
      <View style={styles.popupOverlay}>
        <FlatList 
          style={styles.userList}
          data={notificationList}
          keyExtractor= {(item) => item.id}
          renderItem={({item}) => {
          return (
            <TouchableOpacity style={styles.card} 
            // onPress={() => {clickEventListener(item)}}
            >
              <Image style={styles.image} source={{uri: item.from.picture}}/>
              <View style={styles.cardContent}>
                <View style={styles.contText}>
                  <Text style={styles.name}>{item.from.name}</Text>
                  <Text style={styles.position}>{item.from.email}</Text>
                </View>
                <View style={styles.contButon}>
                  <TouchableOpacity style={styles.followButton} 
                    onPress={()=> sendInvitation(item)}
                  >
                    <Text style={styles.followButtonText}>Follow</Text>  
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          )}}/>
          <View style={styles.popupButtons}>
            <TouchableOpacity onPress={() => {setModalVisible(false) }} style={styles.btnClose}>
              <Text style={styles.txtClose}>Close</Text>
            </TouchableOpacity>
          </View>
      </View>



  </Modal>
</View>
  );


}

export default Options