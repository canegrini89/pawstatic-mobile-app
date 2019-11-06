import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, TextInput, View, Button} from 'react-native';
import {styles} from './login.style';
import firebase from 'react-native-firebase';
import {WhiteSpace} from '@ant-design/react-native';
import {Input} from 'react-native-elements';
import { GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';

const Login = props => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');


  const handleLogin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, pass)
      .then(() => props.navigation.navigate('TabBarNavigation'))
      .catch(error => setError(error.message));
  };

  const googleLogin = async () => {
    try {
      // Add any configuration settings here:

      await GoogleSignin.configure({
        scopes: ['https://www.googleapis.com/auth/drive.readonly'], // whsat API you want to access on behalf of the user, default is email and profile
        webClientId: '1066314148302-1kitgf4tq27dd0e5idu2gnmivg3ppnlq.apps.googleusercontent.com',
      });
  
      const data = await GoogleSignin.signIn();
  
      // create a new firebase credential with the token
      const credential = await firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken)
      // login with credential
      const currentUser = await firebase.auth().signInWithCredential(credential);
      props.navigation.navigate('TabBarNavigation')
      console.log(currentUser)
      firebase.database().ref('users/'+ currentUser.user._user.uid+ '/profile').set({
        name: currentUser.user._user.displayName,
        email: currentUser.user._user.email,
        id: currentUser.user._user.uid,
        backPicture: "https://logoajes.files.wordpress.com/2014/03/fondo-celeste.jpg?w=900",
        picture: currentUser.user._user.photoURL,
        description: '',
      })
    } catch (e) {
      console.error(e);
    }
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
        onPress={() => googleLogin()}
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
