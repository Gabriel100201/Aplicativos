import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginVertical: 20,
  },

  containerMenu: {
    borderRadius: 40,
    backgroundColor: "#e0e0e0",
    boxShadow: "15px 15px 30px #bebebe, -15px -15px 30px #ffffff",
    paddingVertical: 70,
    paddingHorizontal: 30,
    width: "90%",
  },

  containerTorneo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    width: "100%",
    overflow: "auto",
  },

  containerDetalleTorneo: {
    borderRadius: 40,
    width: "90%",
    backgroundColor: "#e0e0e0",
    boxShadow: "15px 15px 30px #bebebe, -15px -15px 30px #ffffff",
    padding: 50,
    marginTop: 200,
    marginBottom: 30,
  },

  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },

  label: {
    fontSize: 16,
    color: "#222",
    marginBottom: 10,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#222",
    marginVertical: 30,
    textAlign: "center",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#333",
  },

  button: {
    backgroundColor: "#006400",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 7,
  },

  background: {
    flex: 1,
    backgroundColor: "#e0e0e0",
  },

  logo: {
    width: 250,
    height: 150,
    marginBottom: 40,
    marginTop: 40,
  },

  text: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
  },

  buttonList: {
    backgroundColor: "#006400",
    paddingVertical: 5,
    marginVertical: 10,
    borderRadius: 10,
  },

  listItem: {
    padding: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 10,
    width: "100%",
  },

  userText: {
    fontSize: 18,
    marginBottom: 5,
    color: "#222",
  },

  field: {
    marginBottom: 15,
  },

  inputField: {
    marginBottom: 15,
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#333",
  },
});

export default styles;
