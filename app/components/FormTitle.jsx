import { Text, View } from "react-native";
import styles from "../lib/styles";

export default function FormTitle({ children }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{children}</Text>
    </View>
  );
}