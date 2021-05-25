import React, { useEffect, useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import {
  StyleSheet,
  View,
  Text,
  PermissionsAndroid,
  BackHandler,
  Alert,
} from 'react-native';
import Scan from './src/Scan';
import Blind from './src/Blind';
import ItemView from './src/ItemView'
import ItemView2 from './src/ItemView2'
import * as Network from './src/Network';
import Explorer from './src/Explorer';
import TextButton from './src/TextButton';

const askPermissionAndroid = async () => {
  try {
    await PermissionsAndroid.requestMultiple(
      [
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      ]);
  }
  catch (err) {
    console.log(err);
    return false;
  }
  const readPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
  const writePermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
  if (!readPermission || !writePermission) {
    console.log('Permission not granted');
    return false;
  }
  else {
    console.log('permission granted!');
    return true;
  }
}

const App = () => {
  const [showScan, setShowScan] = useState(false);
  const [showBlind, setShowBlind] = useState(false);
  const [showAddItem, setShowAddItem] = useState(false);
  const [networks, setNetworks] = useState([]);
  const [myIp, setMyIp] = useState('');
  const [netmask, setNetmask] = useState('');
  const [sendIp, setSendIp] = useState('');
  const [sendId, setSendId] = useState('');
  // const [items, setItems] = useState({});
  const [checkedItems, setCheckedItems] = useState({});
  const [th_items, set_th_items] = useState([]);
  const listNetworks = networks.map((value) => {
    return <Picker.Item label={'Network: ' + value.name + ' | ' + value.ip} value={value.ip + '/' + value.netmask} key={value.ip} />
  });
  const [items, setItems] = useState({});


  useEffect(async () => {
    const granted = askPermissionAndroid();
    if (!granted) {
      BackHandler.exitApp();
    }
    if (!myIp) {
      setNetworks(() => Network.getMyNetworks());
    }
  }, []);
  function log_all_items(items)
  {
      console.log(items);
      for (const [key, value] of Object.entries(items)) 
      {
        console.log("key : ",key," value : ",value);
        if(value.type=='directory')
        {
            log_all_items(value.items);
        }
      }
  };
  return (
    <View style={styles.app}>
      <View style={styles.head}>
        <Text style={styles.appTitle}>SendDone</Text>
        <View style={styles.network}>
          <Picker
            selectedValue={myIp}
            onValueChange={(value, index) => {
              const [ip, netmask] = value.split('/');
              setMyIp(ip);
              setNetmask(netmask);
            }}
          >
            {listNetworks}
          </Picker>
        </View>
      </View>
      <View style={styles.body}>
        <ItemView />
      </View>
        <View style={styles.buttons}>
          <TextButton title='- Checked' />
          <TextButton title='+ Items' onPress={() => { setShowAddItem(true); }} />
        </View>
      </View>
      <View style={styles.foot}>
        <Text style={styles.sampleText}>
          {sendIp ?
            `You have selected ${sendId}(${sendIp})` :
            'Select device by scanning.'
          }
        </Text>
        <View style={styles.buttons}>
          <TextButton title='scan'
            onPress={() => {
              setShowBlind(true);
              setShowScan(true);
            }}
          />
          <TextButton title='send'
            onPress={() => { 
              Alert.alert('send') ;
              // log_all_items(items.items);
            }}
          />
        </View>
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
      { showAddItem && <Explorer
        setShowExplorer={setShowAddItem}
        items={items}
        setItems={setItems}
        selectMultiple={true}
        selectDirectoryOnly={false}
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
    borderWidth: 2,
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
    fontSize: 15,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "center",
    color: "#000000",
    marginTop: 20,
    marginLeft: 40,
  },
});

export default App;