import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
  FlatList
} from 'react-native';

const Scan = ({ myIp, netmask, setShowBlind, setShowScan, scan, sendIp, setSendIp, setSendId }) => {
  const [deviceList, setDeviceList] = useState([]);

  const renderDevice = ({ item }) => {
    return (
      <TouchableOpacity
        style={item.ip === sendIp ? styles.deviceSelected : styles.device}
        onPress={() => { setSendIp(item.ip); setSendId(item.id); }}
      >
        <View style={styles.deviceOs}>
          <Text>
            {item.os}
          </Text>
        </View>
        <View style={styles.deviceBox}>
          <Text>
            {item.id}
          </Text>
          <Text>
            {'IP: ' + item.ip + ' | Version: ' + item.version}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
  useEffect(() => {
    // TODO Add my device ID.
    setDeviceList(() => []);
    scan(myIp, netmask, '123', (deviceIp, deviceVersion, deviceId, deviceOs) => {
      setDeviceList(() =>
        [...deviceList, { ip: deviceIp, version: deviceVersion, id: deviceId, os: deviceOs }]);
    });
  }, []);
  return (
    <View style={styles.scan}>
      <FlatList
        data={deviceList}
        renderItem={renderDevice}
        keyExtractor={(item, index) => item.ip}
      >
      </FlatList>
      <Button title='Close' onPress={() => {
        setShowScan(false);
        setShowBlind(false);
      }} />
    </View>
  );
};

const styles = StyleSheet.create({
  scan: {
    flex: 1,
    position: 'absolute',
    width: '90%',
    height: '90%',
    alignSelf: 'center',
    top: '5%',
    backgroundColor: '#ffffff'
  },
  buttons: {
    width: 100,
    height: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 5,
    borderStyle: 'solid'
  },
  device: {
    width: '100%',
    flex: 1,
    alignItems: 'flex-start',
    flexDirection: 'row',
    padding: 10,
    borderWidth: 2,
    borderStyle: 'solid',
    backgroundColor: '#ffffff'
  },
  deviceSelected: {
    width: '100%',
    flex: 1,
    alignItems: 'flex-start',
    flexDirection: 'row',
    padding: 10,
    borderWidth: 2,
    borderStyle: 'solid',
    backgroundColor: '#afafaf'
  },
  deviceOs: {
    width: '20%',
  },
  deviceBox: {
    flex: 1,
    flexDirection: 'column'
  }
});

export default Scan;