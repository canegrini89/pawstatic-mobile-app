import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View, Button} from 'react-native';
import {styles} from './userRegiter.style';
import firebase from 'react-native-firebase';
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
        return result.user.updateProfile({
          displayName: name,
        })
      .then(function() {
        firebase.database().ref('users/'+ result.user.uid+ '/profile').set({
          name,
          password: pass,
          email,
          id: result.user.uid,
        })
        firebase.database().ref('users/'+ result.user.uid).set({
          picture:'https://www.travelcontinuously.com/wp-content/uploads/2018/04/empty-avatar.png',
          backPicture: 'https://logoajes.files.wordpress.com/2014/03/fondo-celeste.jpg?w=900',
          notifications: '',
        })
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
