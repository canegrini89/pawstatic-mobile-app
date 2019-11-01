import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, TextInput, View, Button} from 'react-native';
import {styles} from './login.style';
import firebase from 'firebase/app';
import 'firebase/auth';
import {WhiteSpace} from '@ant-design/react-native';
import {Input} from 'react-native-elements';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';

const Login = props => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const [state, setState] = useState({})

  useEffect(() => {
    GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })
    .then(() => {
    })
    .catch(err => {
        console.log('Play services error', err.code, err.message);
    });

    GoogleSignin.configure();

    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'], // whsat API you want to access on behalf of the user, default is email and profile
      webClientId: '1066314148302-aogvioragbo0elbk4knthu56arrvi7rp.apps.googleusercontent.com',
       // client ID of type WEB for your server (needed to verify user ID and offline access)
   });
  }, [])

  const handleLogin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, pass)
      .then(() => props.navigation.navigate('TabBarNavigation'))
      .catch(error => setError(error.message));
  };

  const signIn = () => {
    GoogleSignin.signIn()
      .then((data) => {
        // Create a new Firebase credential with the token
        const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);
        // Login with the credential
        return firebase.auth().signInWithCredential(credential);
      })
      .then((user) => {
        props.navigation.navigate('TabBarNavigation')
      })
      .catch((error) => {
        const { code, message } = error;
        console.log(error)
      });
  }
  
  return (
    <View style={styles.container}>
      <Text>Login</Text>
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
      <Button title="Login" onPress={() => handleLogin()} />
      <WhiteSpace />
      <GoogleSigninButton
        style={{ width: 192, height: 48 }}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={() => signIn()}
      />
      <WhiteSpace />
      <Button
        title="Don't have an account? Sign Up"
        onPress={() => props.navigation.navigate('UserRegister')}
      />
      <WhiteSpace />
    </View>
  );
};

export default Login;
