import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 30,
    textAlign: 'center',
  },

  input: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
  },

  button: {
    backgroundColor: '#006400',
    paddingHorizontal: 20,
    paddingVertical: 7,
    marginVertical: 10,
    borderRadius: 7,
  },

  background: {
    flex: 1,
    backgroundColor: '#fff',
  },

  logo: {
    width: 250,
    height: 150,
    marginBottom: 40,
    marginTop: 40,
  },

  text: {
    fontSize: 18,
    color: '#fff',
  },

  listItem: {
    padding: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 10,
    width: '100%',
  },
});

export default styles;
