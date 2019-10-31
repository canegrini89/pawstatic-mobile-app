import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View, Button} from 'react-native';
import {styles} from './userRegiter.style';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import {WhiteSpace} from '@ant-design/react-native';
import {Input} from 'react-native-elements';

const UserRegister = props => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const [name, setName] = useState('')

  const handleRegister = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, pass)
      .then((result) => {
        console.log('entre:', result)
        return result.user.updateProfile({
          displayName: name,
        })
      .then(function() {
        firebase.database().ref('users/'+ result.user.uid).set({
          name,
          password: pass,
          email,
          id: result.user.uid,
          picture:''
        })
        console.log('update succes')
      }).catch(function(error) {
        console.log('update failed')        // An error happened.
      });
      })
      .catch(error => {
        if(error) {
          setError(error.message)
        }else {
          props.navigation.navigate('TabBarNavigation')
        }
      })
  };


  return (
    <View style={styles.container}>
      <Text>Register</Text>
      <Input
        placeholder="Email"
        onChangeText={email => setEmail(email)}
        value={email}
        label="Email"
        errorMessage={error}
        errorStyle={{color: 'red'}}
      />
      <WhiteSpace />
      <Input
        placeholder="Name"
        onChangeText={name => setName(name)}
        value={name}
        label="Name"
        errorMessage={error}
        errorStyle={{color: 'red'}}
      />
      <WhiteSpace />
      <Input
        placeholder="Password"
        onChangeText={password => setPass(password)}
        value={pass}
        label="Password"
        secureTextEntry
        errorMessage={error}
        errorStyle={{color: 'red'}}
      />
      <WhiteSpace />
      <Button title="Register" onPress={() => handleRegister()} />
      <WhiteSpace />
      <Button title="Go To Login" onPress={() => props.navigation.navigate('Login')} />
      <WhiteSpace />
    </View>
  );
};

export default UserRegister;
