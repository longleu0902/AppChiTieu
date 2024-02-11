
import Nav from "./assets/component/Nav/Nav";
import AppRouter from "./assets/Router/AppRouter";
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';






export default function App() {
  return (
    <>
      <NavigationContainer>
        <View style={styles.container}>
          <View style={styles.content}>
            <AppRouter />
          </View>
          <Nav />
        </View>
      </NavigationContainer>
    </>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 2,
  },
});


