import { ScrollView, Text, StyleSheet } from "react-native";

export default function BackendScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        ⚙️ Backend Development
      </Text>

      <Text style={styles.heading}>
        What is Backend?
      </Text>

      <Text style={styles.text}>
        Backend development handles the server,
        database and business logic of applications.
      </Text>

      <Text style={styles.heading}>
        Technologies
      </Text>

      <Text style={styles.text}>
        🐍 Python
        {"\n"}⚡ FastAPI
        {"\n"}🗄 PostgreSQL
      </Text>

      <Text style={styles.heading}>
        Roadmap
      </Text>

      <Text style={styles.text}>
        1. Python Basics
        {"\n"}2. Functions
        {"\n"}3. OOP
        {"\n"}4. APIs
        {"\n"}5. FastAPI
        {"\n"}6. Databases
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 50,
    marginBottom: 20,
  },

  heading: {
    fontSize: 22,
    fontWeight: "600",
    marginTop: 20,
  },

  text: {
    fontSize: 16,
    lineHeight: 25,
    marginTop: 10,
  },
});