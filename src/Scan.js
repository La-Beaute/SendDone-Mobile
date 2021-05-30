import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList
} from 'react-native';
import RowButton from './RowButton';

let isFirst = true;;

const Scan = ({ myIp, myId, netmask, setShowBlind, setShowScan, scan, sendIp, setSendIp, setSendId, deviceList, setDeviceList }) => {
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

  return (
    <View style={styles.scan}>
      <View style={styles.body}>
        <FlatList
          data={deviceList}
          renderItem={renderDevice}
          keyExtractor={(item, index) => item.ip}
        />
      </View>
      <View style={styles.buttons}>
        <RowButton title='Scan' onPress={() => {
          isFirst = true;
          scan(myIp, netmask, myId, (deviceIp, deviceVersion, deviceId, deviceOs) => {
            setDeviceList(() => {
              if (isFirst) {
                isFirst = false;
                return [{ ip: deviceIp, version: deviceVersion, id: deviceId, os: deviceOs }];
              }
              return [...deviceList, { ip: deviceIp, version: deviceVersion, id: deviceId, os: deviceOs }];
            });
          });
        }} />
        <RowButton title='Close' onPress={() => {
          setShowScan(false);
          setShowBlind(false);
        }} />
      </View>
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
    backgroundColor: '#ffffff',
    overflow: 'hidden',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  body: {
    flex: 9
  },
  buttons: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
  },
  device: {
    width: '100%',
    flex: 1,
    alignItems: 'flex-start',
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    backgroundColor: '#ffffff'
  },
  deviceSelected: {
    width: '100%',
    flex: 1,
    alignItems: 'flex-start',
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    backgroundColor: '#ccc'
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