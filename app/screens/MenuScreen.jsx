import { Text, View } from "react-native";
import styles from "../lib/styles";
import Button from "../components/Button";
import TextField from "../components/TextField";


export default function MenuScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menu</Text>
      <Button
        onPress={() => navigation.navigate('Login')}
      >
        Ingresar
      </Button>
      <Button onPress={() => navigation.navigate('Users')}>
        Usuarios
      </Button>
    </View>
  );
}