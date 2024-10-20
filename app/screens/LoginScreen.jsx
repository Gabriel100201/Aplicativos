import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import styles from '../lib/styles';
import { Api } from '../lib/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ setIsLogged }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (status) => {
    setIsLogged(status);
  };

  function Login() {
    console.log('Login pressed');
    const body = {
      username: username,
      password: password
    };

    Api.post('login', { body, authCheck: false })
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          AsyncStorage.removeItem('Authorization');
          handleLogin(false);
        } else {
          const auth = `Bearer ${res.authorizationToken}`;
          const roles = res.roles || [];

          Api.defaultHeaders.Authorization = auth;
          AsyncStorage.setItem('Authorization', auth);
          AsyncStorage.setItem('roles', JSON.stringify(roles));
          handleLogin(true);
        }
      })
      .catch(err => {
        console.log(err);
        handleLogin(false);
      });
  }


  return (
    <View style={styles.container}>

      <Image
        source={require('../assets/Logo-app.png')}
        style={styles.logo}
      />

      <Text style={styles.title}>Iniciar Sesión</Text>

      <TextInput
        label="Usuario"
        value={username}
        mode="outlined"
        onChangeText={setUsername}
        style={styles.input}
        theme={{ colors: { text: '#000', placeholder: '#fff' } }}
      />

      <TextInput
        label="Contraseña"
        value={password}
        mode="outlined"
        secureTextEntry
        onChangeText={setPassword}
        style={styles.input}
        theme={{ colors: { text: '#000', placeholder: '#999' } }}
      />

      <Button
        mode="contained"
        onPress={Login}
        style={styles.button}
        labelStyle={{ color: '#fff', fontWeight: 'bold' }}
      >
        Iniciar Sesión
      </Button>
    </View>
  );
}
