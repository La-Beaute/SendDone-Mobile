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
  const [showScan, setShowScan] = useState(false);
  const [showBlind, setShowBlind] = useState(false);
  const [networks, setNetworks]= useState([]);
  const [myIp, setMyIp] = useState('');
  const [netmask, setNetmask] = useState('');
  const [sendIp, setSendIp] = useState('');
  const [sendId, setSendId] = useState('');

  const listNetworks=networks.map((value)=>{
    return <Picker.Item label={'Network: ' + value.name+' | '+value.ip} value={value.ip+'/'+value.netmask} key={value.ip} />
  });

  useEffect(()=>{
    if(!myIp){
      setNetworks(()=>Network.getMyNetworks());
    }
  }, []);

  return (
    <View style={styles.app}>
      <Text style={styles.appTitle}>SendDone</Text>
      <View style={styles.network}>
        <Picker 
          selectedValue={myIp}
          onValueChange={(value, index)=>{
            const [ip, netmask]=value.split('/');
            setMyIp(ip);
            setNetmask(netmask);
          }}
        >
          {listNetworks}
        </Picker>
      </View>
      <View style={styles.card}>
        <ScrollView>
          <Text style={styles.sampleText}>
            {sendIp ? 
            `You have selected ${sendId}(${sendIp})` :
            'Select the sender by scanning.'
            }
          </Text>
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
      { showScan && <Scan 
        myIp={myIp}
        netmask={netmask}
        setShowBlind={setShowBlind} 
        setShowScan={setShowScan} 
        scan={Network.scan}
        sendIp={sendIp}
        setSendIp={setSendIp}
        setSendId={setSendId}
      />}
    </View>
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative'
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
  network: {
    borderWidth:2,
    borderRadius: 5,
    borderStyle: 'solid',
  },
  card: {
    flex: 4
  },
  buttons: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderWidth: 2,
    borderRadius: 5,
    borderStyle: 'solid'
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