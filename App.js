
import Nav from "./assets/component/Nav/Nav";
import AppRouter from "./assets/Router/AppRouter";
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import store from "./assets/Redux/store";






export default function App() {
  return (
    <>
      <Provider store={store}>
        <NavigationContainer>
          <View style={styles.container}>
            <View style={styles.content}>
              <AppRouter />
            </View>
            <Nav />
          </View>
        </NavigationContainer>
      </Provider>
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


