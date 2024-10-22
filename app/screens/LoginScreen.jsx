import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import styles from '../lib/styles';
import { Api } from '../lib/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TextField from '../components/TextField'; // Importa el nuevo componente
import Button from '../components/Button';

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

      <TextField
        label="Usuario"
        value={username}
        onChangeText={setUsername}
        style={styles.inputField}
      />

      <TextField
        label="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        style={styles.inputField}
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
