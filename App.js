import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
} from 'react-native';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.appTitle}>SendDone</Text>
      <View style={styles.card}>
        <ScrollView>
            <Text style={styles.sampleText}>Move your files in seconds in SendDone</Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

 // const StyledContainer = glamorous.view((props, theme) => ({
  //   height: 823,
  //   width: 411,
  //   backgroundColor: '#ffffff'
  // },

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: '#fff', //#feb93a
    

  },
 

  appTitle: {
      //fontFamily: "Roboto",
      fontSize: 30,
      fontWeight: "bold",
      fontStyle: "normal",
      textAlign: "center",
      color: "#000000",
      marginTop: 10,
      marginBottom : 10, 
  },

  sampleText:{
    
      width: 316,
      height: 62,
      //fontFamily: "Roboto",
      fontSize: 24,
      fontWeight: "bold",
      fontStyle: "normal",
      letterSpacing: 0,
      textAlign: "center",
      color: "#aba7a7",
      marginTop: 300,
      marginLeft : 40, 
  },
});

export default App;