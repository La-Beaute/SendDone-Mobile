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
import RowButton from './src/RowButton';
import Explorer from './src/Explorer';
import RecvView from './src/RecvView';
import * as Network from './src/Network';
import Sender from './src/Sender';
import { STATE } from './src/Network';
import Receiver from './src/Receiver';
import SendView from './src/SendView';

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
/**
 * @type {Sender}
 */
let sender = null;
let receiver = new Receiver();

const App = () => {
  const [showScan, setShowScan] = useState(false);
  const [showBlind, setShowBlind] = useState(false);
  const [showAddItem, setShowAddItem] = useState(false);
  const [serverSocketOpen, setServerSocketOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [networks, setNetworks] = useState([]);
  const [myIp, setMyIp] = useState('');
  const [myId, setMyId] = useState('');
  const [downloadPath, setDownloadPath] = useState('');
  const [netmask, setNetmask] = useState('');
  const [sendIp, setSendIp] = useState('');
  const [sendId, setSendId] = useState('');
  const [items, setItems] = useState({});
  const [checkedItems, setCheckedItems] = useState({});
  const [sending, setSending] = useState(false);
  const [receiving, setReceiving] = useState(false);
  const [sendState, setSendState] = useState({});
  const [recvState, setRecvState] = useState({});

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

  const getRecvState = () => {
    const state = receiver.getState();
    if (state.state === Network.STATE.RECV_WAIT) {
      setShowBlind(true);
      setReceiving(true);
    }
    setRecvState(state);
  }

  const acceptRecv = () => {
    receiver.acceptRecv(downloadPath);
  }
  const rejectRecv = () => {
    receiver.rejectRecv();
    closeRecvView();
  }

  const endRecv = () => {
    receiver.end();
    receiver.setStateIdle();
    closeRecvView();
  }

  const closeRecvView = () => {
    receiver.setStateIdle();
    setShowBlind(false);
    setReceiving(false);
  }

  const getSendState = () => {
    if (sender) {
      const state = sender.getState();
      if (state.state === STATE.SEND_REQUEST || state.state === STATE.SEND)
        // Only set timeout when needed.
        setTimeout(getSendState, 500);
      setSendState(state);
    }
  }

  const endSend = () => {
    if (sender) {
      sender.end();
      sender = null;
    }
    receiver.setStateIdle();
  }

  const closeSendView = () => {
    setShowBlind(false);
    setSending(false);
  }

  /**
   * Initial useEffect.
   */
  useEffect(async () => {
    let shouldShowSettings = false;
    const granted = await askPermissionAndroid();
    if (!granted) {
      BackHandler.exitApp();
    }

    try {
      let tmp = await AsyncStorage.getItem('downloadPath');
      if (tmp)
        setDownloadPath(tmp);
      else
        shouldShowSettings = true;
      tmp = await AsyncStorage.getItem('myId');
      if (tmp)
        setMyId(tmp);
      else
        shouldShowSettings = true;
    } catch (err) {
      // Do nothing.
      console.log('getItem error', err);
    }
    // Show settings if ID or download path is not available.
    if (shouldShowSettings) {
      console.log(myId);
      console.log(downloadPath);
      setShowBlind(true);
      setShowSettings(true);
    }

    let networks = Network.getMyNetworks();
    setNetworks(networks);
    if (networks.length > 0) {
      setMyIp(networks[0].ip);
      setNetmask(networks[0].netmask);
    }

    const receiverHandle = setInterval(() => {
      let isOpen = receiver.isOpen();
      setServerSocketOpen(isOpen);
      if (isOpen)
        // Get receiver state only when the server socket is open.
        getRecvState();
    }, 500);

    return () => {
      clearInterval(receiverHandle);
    }
  }, []);

  useEffect(async () => {
    if (myId) {
      receiver.changeMyId(myId);
      await AsyncStorage.setItem('myId', myId);
    }
  }, [myId]);

  useEffect(async () => {
    if (downloadPath)
      await AsyncStorage.setItem('downloadPath', downloadPath);
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
        <Text style={styles.sampleText} numberOfLines={1} ellipsizeMode='tail'>
          {sendIp ?
            `${sendId}(${sendIp})` :
            'Select device by scanning.'
          }
        </Text>
      </View>
      <View style={styles.foot}>
        <RowButton title='scan'
          onPress={() => {
            setShowBlind(true);
            setShowScan(true);
          }}
        />
        {serverSocketOpen
          ?
          <RowButton title='Close Server'
            propStyle={styles.buttonActive}
            onPress={() => {
              receiver.closeServerSocket();
            }}
          />
          :
          <RowButton title='Open Server'
            propStyle={styles.buttonNotActive}
            onPress={() => {
              if (myIp)
                receiver.openServerSocket(myIp);
            }}
          />
        }
        <RowButton title='send'
          onPress={() => {
            if (sendIp) {
              sender = new Sender(myId);
              sender.send(items, sendIp);
              setShowBlind(true);
              setSending(true);
              getSendState();
            }
          }}
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
        selectPath={false}
      />}
      { receiving && <RecvView
        close={closeRecvView}
        state={recvState}
        rejectRecv={rejectRecv}
        acceptRecv={acceptRecv}
        endRecv={endRecv}
      />}
      { sending && <SendView
        close={closeSendView}
        state={sendState}
        endSend={endSend}
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
    flex: 8,
    padding: 10,
  },
  foot: {
    flex: 1,
    flexDirection: 'row',
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
    height: 35,
    aspectRatio: 1
  },
  settingsImage: {
    alignSelf: 'center',
    width: '100%',
    height: '100%'
  },
  buttonActive: {
    backgroundColor: '#1e1',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    flex: 1
  },
  buttonNotActive: {
    backgroundColor: '#e11',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    flex: 1
  }
});

export default App;