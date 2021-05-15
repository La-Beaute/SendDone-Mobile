import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Button,
  Alert
} from 'react-native';
import Scan from './src/Scan';
import Blind from './src/Blind';

const App = () => {
  let [showScan, setShowScan] = useState(false);
  let [showBlind, setShowBlind] = useState(false);

  const scan=()=>{

  }
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.appTitle}>SendDone</Text>
      <View style={styles.card}>
        <ScrollView>
          <Text style={styles.sampleText}>Move your files in seconds in SendDone</Text>
        </ScrollView>
      </View>
      <View style={styles.buttons}>
        <Button title='scan'
          onPress={() => { 
            setShowBlind(true);
            setShowScan(true); 
          }}
        />
        <Button title='send'
          onPress={() => { Alert.alert('send') }}
        />
      </View>
      { showBlind && <Blind />}
      { showScan && <Scan setShowBlind={setShowBlind} setShowScan={setShowScan} />}
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
    position: 'relative'
  },

  buttons: {
    width: '100%',
    height: '10%',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 5,
    borderStyle: 'solid'
  },

  appTitle: {
    //fontFamily: "Roboto",
    fontSize: 30,
    fontWeight: "bold",
    fontStyle: "normal",
    textAlign: "center",
    color: "#000000",
    marginTop: 10,
    marginBottom: 10,
  },

  sampleText: {

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
    marginLeft: 40,
  },
});

export default App;