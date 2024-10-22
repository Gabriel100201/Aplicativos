import { Text, View } from "react-native";
import styles from "../lib/styles";
import Button from "../components/Button";
import Background from "../components/Background";

export default function MenuScreen({ navigation }) {
  return (
    <Background>
    <View style={styles.container}>
      <View style={styles.containerMenu}>
      <Text style={styles.title}>Menu</Text>
      <Button
        onPress={() => navigation.navigate('Tournaments')}
      >
        Torneos
      </Button>
      <Button onPress={() => navigation.navigate('Users')}>
        Usuarios
      </Button>
      </View>
    </View>
    </Background>
  );
}