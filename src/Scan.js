import React from 'react';
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

const Scan = ({setShowBlind, setShowScan}) => {
  return (
    <SafeAreaView style={styles.scan}>
      <ScrollView >

      </ScrollView>
      <Button title='OK' onPress={()=>{
        setShowScan(false);
        setShowBlind(false);
      }} />
    </SafeAreaView>
  );
};

 // const StyledContainer = glamorous.view((props, theme) => ({
  //   height: 823,
  //   width: 411,
  //   backgroundColor: '#ffffff'
  // },

const styles = StyleSheet.create({
  
  scan: {
    flex: 1,
    position: 'absolute',
    width: '90%',
    height: '90%',
    alignSelf: 'center',
    top: '5%',
    backgroundColor: '#888888'
  },
 
  buttons:{
    width: 100,
    height: 10,
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

export default Scan;