import { Button, Text, View } from "react-native";
import styles from "../lib/styles";

export default function Menu({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menu</Text>
      <Button
        title="Ir a usuarios"
        onPress={() => navigation.navigate('Users')}
      />
    </View>
  );
}