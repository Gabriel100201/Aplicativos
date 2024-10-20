import { Pressable, View, Text } from "react-native";
import styles from "../lib/styles";

export default function Button({ onPress, children }) {
  return (
    <View>
      <Pressable
        onPress={onPress}
        style={styles.button}
      >
        <Text style={styles.text}>{children}</Text>
      </Pressable>
    </View>
  );
}