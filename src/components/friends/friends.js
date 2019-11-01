import React, { Component, useState, useEffect } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  Modal,
  FlatList,
  ImageBackground
} from 'react-native';
import { SearchBar } from 'react-native-elements'
import {styles} from './friends.styles'
import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
import 'firebase/storage'


const UserList = (props) => {

  const [newData, setData] = useState([])
  const [filterData, setFilterData] = useState(null)
  const [text, setText] = useState('')
  const [currentUser, setCurrentUser] = useState(null)
  const [userPciture, setUserPicture] = useState('')
  const [modalVisible, setModal]= useState(false)
  const [userSelected, setUserSelected] = useState([])

    useEffect(() => {
      firebase.auth().onAuthStateChanged((user) => {
      setCurrentUser(user)
      firebase.database().ref('users').on('value',(snap) =>{
        if(snap.val()) {
          const toArray = [];
          
          Object.keys(snap.val()).forEach((item) => {
            if(item !== user.uid) {
              toArray.push(snap.val()[item]);
            }
          });
          setData(toArray)
        }
      })
      firebase.database().ref('users').child(currentUser.uid + '/picture').on('value', (snap) => {
        setUserPicture(snap.val())
      })
      // firebase.database().ref('users').child(currentUser.uid + '/notifications').on('value', (snap => {
      //   if (snap.val()) {
      //   let toArray = []
      //   Object.keys(snap.val()).forEach((item) => {
      //     toArray.push(snap.val()[item]);
      //   });
      //   setNotification(toArray)
      // }
      // }))
    })
    },[])

  const filterList = (search) => {
    setText(search)
    let items = newData;
    items = items.filter((item) => {
      return item.name.toLowerCase().search(search.toLowerCase()) !== -1;
    });
    setFilterData(items);
  }

  const sendInvitation = (item) => {
    firebase.database().ref('users/'+ item.id + '/notifications').push({
      from: {
        name: currentUser.displayName,
        email: currentUser.email,
        id: currentUser.uid,
        picture: userPciture,
      },
      to: {
        name:item.name,
        email: item.email,
        id: item.id,
        picture: item.picture
      }
    })
  }


  const clickEventListener = (item) => {
    console.log(item)
    setUserSelected(item)
    setModalVisible(true)
  }
  const setModalVisible = (visible) => {
    setModal(visible)
  }

  return (
    <View style={styles.container}>
      <SearchBar 
        onChangeText={filterList}
        value={text}
        onClear={text => filterList('')}
        placeholder="Type Name of Friends..."
      />
      <FlatList 
        style={styles.userList}
        data={filterData ? filterData : newData}
        keyExtractor= {(item) => item.id}
        renderItem={({item}) => {
        return (
          <TouchableOpacity style={styles.card} onPress={() => {clickEventListener(item)}}>
            <Image style={styles.image} source={{uri: item.picture}}/>
            <View style={styles.cardContent}>
              <View style={styles.contText}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.position}>{item.email}</Text>
              </View>
              <View style={styles.contButon}>
                <TouchableOpacity style={styles.followButton} onPress={()=> sendInvitation(item)}>
                  <Text style={styles.followButtonText}>Follow</Text>  
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        )}}/>

        <Modal
          animationType={'fade'}
          transparent={true}
          onRequestClose={() => setModal(false)}
          visible={modalVisible}>
         
         <View style={styles.popupOverlay}>
            <View style={styles.popup}>
              <View style={styles.popupContent}>
                <View style={styles.containerModal}>
                  <ImageBackground  source={{uri :userSelected.backPicture}} style={{ height: 200}}>
                  </ImageBackground >
                  <Image style={styles.avatarModal} source={{uri: userSelected.picture}}/>
                  <View style={styles.bodyModal}>
                    <View style={styles.bodyContentModal}>
                      <Text style={styles.nameModal}>{userSelected.name}</Text>
                      <Text style={styles.infoModal}>{userSelected.email}</Text>
                      <Text style={styles.descriptionModal}>{userSelected.description}</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.popupButtons}>
                <TouchableOpacity onPress={() => {setModalVisible(false) }} style={styles.btnClose}>
                  <Text style={styles.txtClose}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
                {/* <View style={styles.containerModal}>
                  <ImageBackground  source={{uri :userSelected.backPicture}} style={{ height: 200}}>
                  </ImageBackground >
                  <Image style={styles.avatarModal} source={{uri: userSelected.picture}}/>
                  <View style={styles.bodyModal}>
                    <View style={styles.bodyContentModal}>
                      <Text style={styles.nameModal}>{userSelected.name}</Text>
                      <Text style={styles.infoModal}>{userSelected.email}</Text>
                      <Text style={styles.descriptionModal}>{userSelected.description}</Text>
                    </View>
                  </View>
                </View> */}

        </Modal>
    </View>
  );
}

export default UserList