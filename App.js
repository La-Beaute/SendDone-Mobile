import React, { useEffect, useState } from 'react';
import {Picker} from '@react-native-picker/picker';
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
import * as Network from './src/Network';

const App = () => {
  let [showScan, setShowScan] = useState(false);
  let [showBlind, setShowBlind] = useState(false);
  let [networks, setNetworks]= useState([]);
  let [myIp, setMyIp] = useState('');

  const listNetworks=networks.map((value)=>{
    return <Picker.Item label={'Network: ' + value.name+' | '+value.ip} value={value.ip} key={value.ip} />
  });

  useEffect(()=>{
    if(!myIp){
      setNetworks(()=>Network.getMyNetworks());
    }
    console.log(networks);
  }, []);

  return (
    <View style={styles.app}>
      <Text style={styles.appTitle}>SendDone</Text>
      <View style={styles.network}>
        <Picker 
          selectedValue={myIp}
          onValueChange={(value, index)=>{
            console.log(value);
            setMyIp(value);
          }}
        >
          {listNetworks}
        </Picker>
      </View>
      <View style={styles.card}>
        <ScrollView>
          <Text style={styles.sampleText}>Move your files in seconds in SendDone</Text>
        </ScrollView>
      </View>
      <View style={styles.buttons}>
        <Button title='scan'
          onPress={() => { 
            getMyNetworks();
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
    </View>
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: '#fff', //#feb93a
    position: 'relative'
  },
  network:{
    borderWidth:2,
    borderRadius: 5,
    borderStyle: 'solid',
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