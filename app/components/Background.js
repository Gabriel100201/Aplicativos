import { StyleSheet, Text, View } from 'react-native';

export default function Background({children}) {
  return (
    <Background>
        <View style={styles.container}>
            <Text>Hola mundo!</Text>
            [children]
        </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
