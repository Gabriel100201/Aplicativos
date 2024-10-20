import React, { useState } from "react";
import { createNavigationContainerRef, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Background from "./components/Background";
import LoginScreen from "./screens/LoginScreen";
import UsersScreen from "./screens/UsersScreen";
import UserScreen from "./screens/UserScreen";
import { Pressable, Text, View } from "react-native";
import { useEffect } from "react";
import { Api } from "./lib/api";
import MenuScreen from "./screens/MenuScreen";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

export default function App() {

  const navigationRef = createNavigationContainerRef();
  const [isLogged, setIsLogged] = useState(false);

  const headerRight = () => (
    <Pressable style={{ marginRight: 20 }} onPress={() => navigationRef.navigate('Menu')} title="Info" color="#fff">
      <Text>Menu</Text>
    </Pressable>
  );

  useEffect(() => {
    AsyncStorage.getItem("Authorization")
      .then(auth => {
        if (auth) {
          Api.defaultHeaders.Authorization = auth;
          setIsLogged(true);
        }
      })
      .catch(err => console.log(err));
  }, []);

  if (!isLogged) {
    return (
      <View style={{ flex: 1 }}>
        <LoginScreen setIsLogged={setIsLogged} />
      </View>
    );
  }

  return (
    <NavigationContainer ref={navigationRef}>
      <Background>
        <Stack.Navigator>
          <Stack.Screen 
            name="Menu"
            component={MenuScreen}
            options={{ title: 'Menu', headerRight }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ title: 'Login', headerRight }}
          />
          <Stack.Screen
            name="Users"
            component={UsersScreen}
            options={{ title: 'Usuarios', headerRight }}
          />
          <Stack.Screen
            name="User"
            component={UserScreen}
            options={{ title: 'Usuario', headerRight }}
          />
        </Stack.Navigator>
      </Background>
    </NavigationContainer>
  );
}
