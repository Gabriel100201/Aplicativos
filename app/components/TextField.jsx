import { TextInput, View, Text } from "react-native";
import styles from "../lib/styles";

export default function TextField({ label, value, onChangeText, secureTextEntry, ...props }) {
  return (
    <View style={styles.field}>
      <Text style={{ ...styles.text, ...styles.TextInput }}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        {...props}
      />
    </View>
  )
}