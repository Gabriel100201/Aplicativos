import { Text, View } from "react-native";
import FormTitle from "../components/FormTitle";
import styles from "../lib/styles";

export default function User({ route }) {
  return (
    <View style={styles.container}>
      <FormTitle>Editar un usuario</FormTitle>
      <Text>{route.params.userId}</Text>
    </View>
  );
}