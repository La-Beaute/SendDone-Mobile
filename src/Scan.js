import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Button,
  Alert,
  FlatList
} from 'react-native';

const Scan = ({myIp, netmask, setShowBlind, setShowScan, scan}) => {
  const [deviceList, setDeviceList]=useState([]);
  const renderDevice=({item})=>{
    console.log(item);
    return (
      <View style={styles.device}>
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
      </View>
    );
  }
  useEffect(()=>{
    // TODO Add my device ID.
    scan(myIp, netmask, '123', (deviceIp, deviceVersion, deviceId, deviceOs)=>{
      console.log('found', deviceIp);
      setDeviceList(()=>
        [...deviceList, {ip:deviceIp, vesion:deviceVersion, id:deviceId, os:deviceOs}]);
    });
  }, []);
  return (
    <View style={styles.scan}>
      <FlatList 
        data={deviceList} 
        renderItem={renderDevice}>
      </FlatList>
      <Button title='OK' onPress={()=>{
        setShowScan(false);
        setShowBlind(false);
      }} />
    </View>
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
    alignItems: 'flex-start'
  },
  deviceOs: {
    width: '20%'
  },
  deviceBox: {
    flex: 1,
    flexDirection: 'row'
  }
});

export default Scan;