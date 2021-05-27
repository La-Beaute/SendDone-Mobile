import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Alert
} from 'react-native';
import Explorer from './Explorer';
import RowButton from './RowButton';
import TextButton from './TextButton';


const Settings = ({ close, myId, setMyId, downloadpath, setDownloadPath }) => {
  const [showSetPath, setShowSetPath] = useState(false);
  const [tmpDownloadPath, setTmpDownloadPath] = useState(downloadpath);
  const [tmpMyId, setTmpMyId] = useState(myId);

  const saveExit = () => {
    if (!tmpDownloadPath) {
      Alert.alert('Warning', 'Please set download path!');
      return;
    }
    if (!tmpMyId) {
      Alert.alert('Warning', 'Please set your ID!');
      return;
    }
    setMyId(tmpMyId);
    setDownloadPath(tmpDownloadPath);
    close();
  }

  return (
    <View style={styles.settings} >
      <View style={styles.head}>
        <Text style={styles.headText}>Settings</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.item}>
          <Text style={styles.itemName}>Download Path</Text>
          <Text style={styles.itemBody}>{tmpDownloadPath}</Text>
          <TextButton title='Set' onPress={() => { setShowSetPath(true); }} />
        </View>
        <View style={styles.item}>
          <Text style={styles.itemName}>My ID</Text>
          <TextInput
            style={styles.itemBody}
            defaultValue={myId}
            onChangeText={setTmpMyId}
          />

        </View>
      </View>
      <View style={styles.foot}>
        <RowButton title='Cancel' onPress={close} />
        <RowButton title='OK' onPress={saveExit} />
      </View>
      { showSetPath && <Explorer
        setShowExplorer={setShowSetPath}
        items={null}
        setItems={setTmpDownloadPath}
        selectMultiple={false}
        selectDirectoryOnly={true}
      />}
    </View>
  )
}

const styles = StyleSheet.create({
  settings: {
    position: 'absolute',
    width: '90%',
    height: '90%',
    alignSelf: 'center',
    top: '5%',
    backgroundColor: '#ffffff',
    overflow: 'hidden',
    flex: 1,
    borderRadius: 20
  },
  head: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: 'grey',
    borderStyle: 'solid',
    borderBottomWidth: 2
  },
  headText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
  },
  body: {
    flex: 9,
    padding: 10,
    flexDirection: 'column'
  },
  item: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  itemName: {
    fontSize: 20,
    color: 'black'
  },
  itemBody: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 5,
    color: '#000',
    paddingVertical: 5,
    paddingHorizontal: 10
  },
  foot: {
    flex: 1,
    flexDirection: 'row',
    width: '100%'
  },
  button: {
    flex: 1
  }
});

export default Settings;