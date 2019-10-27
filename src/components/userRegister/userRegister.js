import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View, Button} from 'react-native';
import {styles} from './login.style';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import {WhiteSpace} from '@ant-design/react-native';
import {Input} from 'react-native-elements';

const UserRegister = props => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');

  const handleRegister = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, pass)
      .then(() => props.navigation.navigate('TabBarNavigation'))
      .catch(error => setError(error.message));
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
        placeholder="Password"
        onChangeText={password => setPass(password)}
        value={pass}
        label="Password"
        secureTextEntry
        errorMessage={error}
        errorStyle={{color: 'red'}}
      />
      <WhiteSpace />
      <Button title="Login" onPress={() => handleRegister()} />
      <WhiteSpace />
    </View>
  );
};

export default UserRegister;
