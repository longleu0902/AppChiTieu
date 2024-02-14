

import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import store from "./assets/Redux/store";
import LayOut from './assets/layout/layOut';






export default function App() {

  return (
    <>
      <Provider store={store}>
        <NavigationContainer>
          <View style={styles.container}>
            <View style={styles.content}>
             <LayOut/>
            </View>
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


