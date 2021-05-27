import React, { useEffect, useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import {
  StyleSheet,
  View,
  Text,
  PermissionsAndroid,
  BackHandler,
  Image,
  TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Scan from './src/Scan';
import Settings from './src/Settings';
import ItemView from './src/ItemView';
import Blind from './src/Blind';
import TextButton from './src/TextButton';
import Explorer from './src/Explorer';
import * as Network from './src/Network';
import Sender from './src/Sender';
import Receiver from './src/Receiver';

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

let sender = null;
let receiver = new Receiver();
// receiver.openServerSocket('192.168.1.183');
// receiver.changeMyId('12345');

const App = () => {
  const [showScan, setShowScan] = useState(false);
  const [showBlind, setShowBlind] = useState(false);
  const [showAddItem, setShowAddItem] = useState(false);
  const [showSetPath, setShowSetPath] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [networks, setNetworks] = useState(Network.getMyNetworks());
  const [myIp, setMyIp] = useState('');
  const [myId, setMyId] = useState('');
  const [downloadPath, setDownloadPath] = useState('');
  const [netmask, setNetmask] = useState('');
  const [sendIp, setSendIp] = useState('');
  const [sendId, setSendId] = useState('');
  const [items, setItems] = useState({});
  const [checkedItems, setCheckedItems] = useState({});

  const listNetworks = networks.map((value) => {
    return (
      <Picker.Item
        label={'Network: ' + value.name + ' | ' + value.ip}
        value={value.ip + '/' + value.netmask}
        key={value.ip + '/' + value.netmask}
      />
    );
  });

  const deleteCheckedItems = () => {
    setItems(items => {
      let tmp = { ...items };
      for (let itemName in checkedItems) {
        delete tmp[itemName];
      }
      return tmp;
    });
    setCheckedItems({});
  }

  useEffect(async () => {
    const granted = await askPermissionAndroid();
    try {
      let tmp = await AsyncStorage.getItem('downloadPath');
      if (tmp)
        setDownloadPath(tmp);
      tmp = await AsyncStorage.getItem('myId');
      if (tmp)
        setMyId(tmp);
    } catch (err) {
      // Do nothing.
      console.log('getItem error', err);
    }
    if (!granted) {
      BackHandler.exitApp();
    }
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('myId', myId).catch((err) => {
      console.log(err);
    })
  }, [myId]);

  useEffect(() => {
    AsyncStorage.setItem('downloadPath', downloadPath).catch((err) => {
      console.log(err);
    })
  }, [downloadPath]);

  return (
    <View style={styles.app}>
      <View style={styles.head}>
        <Text style={styles.appTitle}>SendDone</Text>
        <TouchableOpacity
          style={styles.settings}
          onPress={() => { setShowBlind(true); setShowSettings(true); }}>
          <Image
            style={styles.settingsImage}
            source={require('./src/img/settings.png')}
          />
        </TouchableOpacity>
        <View style={styles.network}>
          <Picker
            selectedValue={myIp + '/' + netmask}
            dropdownIconColor='#000000'
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
        <ItemView
          items={items}
          checkedItems={checkedItems}
          setCheckedItems={setCheckedItems}
        />
        <View style={styles.buttons}>
          <TextButton title='- Checked' onPress={deleteCheckedItems} />
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
            onPress={() => { sender = new Sender(myIp); sender.send(items, '192.168.1.214'); }}
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
      { showSettings && <Settings
        close={() => { setShowSettings(false); setShowBlind(false); }}
        myId={myId}
        setMyId={setMyId}
        downloadpath={downloadPath}
        setDownloadPath={setDownloadPath}
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
    flexDirection: 'column',
    backgroundColor: '#fff',
    position: 'relative',
  },
  head: {
    flex: 2,
    padding: 10,
  },
  body: {
    flex: 7,
    padding: 10,
  },
  foot: {
    flex: 2,
    padding: 10,
  },
  appTitle: {
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
  buttons: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  sampleText: {
    fontSize: 24,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "center",
    color: "#aba7a7",
  },
  settings: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 40,
    height: 40,
  },
  settingsImage: {
    alignSelf: 'center',
    width: '100%',
    height: '100%'
  }
});

export default App;