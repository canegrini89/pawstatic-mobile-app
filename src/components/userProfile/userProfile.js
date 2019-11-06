import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
  ImageBackground,
  TextInput,
  Button
} from 'react-native';
import ImagePicker from 'react-native-image-picker'
import styles from './userProfile.style'
import firebase from 'react-native-firebase'
import RNFetchBlob from 'rn-fetch-blob'

 const UserProfile = (props) => {
  const [user, setUser] = useState({})
  const [picture, setPicture] = useState('')
  const [backPicture, setBackPicture] = useState('')
  const [currentDescription, setCurrentDescription] = useState('')
  const [valueInput, setValueInput] = useState('')
 

    useEffect(() => {
      firebase.auth().onAuthStateChanged((user) => {
        if(user) {
          setUser(user._user)
          firebase.database().ref('users/'+ user._user.uid).on('value', (snap => {
            if(snap.val().description) {
              setCurrentDescription(snap.val().description)
              setValueInput(snap.val().description)
            }
            if(snap.val().picture) {
              setPicture(snap.val().picture)
            }else {
              setPicture('https://www.travelcontinuously.com/wp-content/uploads/2018/04/empty-avatar.png')
            }
            if(snap.val().backPicture){
              setBackPicture(snap.val().backPicture)
            }
          })
        )}
        
      })
    }, [props])

    const uploadImage = (uri, imageName, mime = 'image/jpg') => {
      const Blob = RNFetchBlob.polyfill.Blob
      const fs = RNFetchBlob.fs
      window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
      window.Blob = Blob

      return new Promise((resolve, reject) => {
        const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
          let uploadBlob = null
          const imageRef = firebase.storage().ref('profile').child(user._user.uid).child(imageName+user.displayName)
          fs.readFile(uploadUri, 'base64')
          .then((data) => {
            return Blob.build(data, { type: `${mime};BASE64` })
          })
          .then((blob) => {
            uploadBlob = blob
            return imageRef.put(blob, { contentType: mime })
          })
          .then(() => {
            uploadBlob.close()
            return imageRef.getDownloadURL()
          })
          .then((url) => {
            resolve(url)
             firebase.database().ref('users/'+ user.uid+ '/profile').update({
               picture : url
            })
          })
          .catch((error) => {
            reject(error)
          })
      })
  }

  const uploadImageBackground = (uri, imageName, mime = 'image/jpg') => {
    const Blob = RNFetchBlob.polyfill.Blob
    const fs = RNFetchBlob.fs
    window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
    window.Blob = Blob

    return new Promise((resolve, reject) => {
      const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
        let uploadBlob = null
        const imageRef = firebase.storage().ref('profile').child(user.uid).child(imageName+user.uid)
        fs.readFile(uploadUri, 'base64')
        .then((data) => {
          return Blob.build(data, { type: `${mime};BASE64` })
        })
        .then((blob) => {
          uploadBlob = blob
          return imageRef.put(blob, { contentType: mime })
        })
        .then(() => {
          uploadBlob.close()
          return imageRef.getDownloadURL()
        })
        .then((url) => {
          resolve(url)
           firebase.database().ref('users/'+ user.uid).update({
             backPicture : url
          })
        })
        .catch((error) => {
          reject(error)
        })
    })
}

  const onUpload = () => {
    ImagePicker.showImagePicker((response) => {
        uploadImage(response.uri, response.fileName)
    })
  }
  const onUploadBackPicture = () => {
    ImagePicker.showImagePicker((response) => {
      uploadImageBackground(response.uri, response.fileName)
    })
  }

  const onChangeDescription = (text) => {
    firebase.database().ref('users/'+ user.uid).update({
      description: text
    })
  }
  const editDescription = () => {
   setCurrentDescription('')
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onUploadBackPicture}>
        <ImageBackground  source={{uri :backPicture}} style={{ height: 200}}>
        </ImageBackground >
      </TouchableOpacity>
        <TouchableOpacity style={styles.contAvatar} onPress={onUpload}>
          <Image style={styles.avatar} source={{uri: picture}} />
        </TouchableOpacity>
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <Text style={styles.name}>{user.displayName}</Text>
            <Text style={styles.info}>{user.email}</Text>
            {
              !currentDescription ? 
              <TextInput
                style={styles.description}
                placeholder='Add Description'
                onChangeText={text => setValueInput(text)}
                maxLength={300}
                value={currentDescription ? currentDescription : valueInput}
                onBlur={() => onChangeDescription(valueInput)}
              />
            :
            <TouchableOpacity onPress={editDescription} style={styles.text}>
              <Text style={styles.descriptionText}>{currentDescription}</Text>
            </TouchableOpacity>
            }
          </View>
      </View>
    </View>
  );
}
export default UserProfile

