import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Alert
} from 'react-native';
import { stat } from 'react-native-fs';
import RowButton from './RowButton';
import { STATE } from './Network';

const RecvView = ({ close, state, endRecv, rejectRecv, acceptRecv }) => {
  if (state.state === STATE.RECV_WAIT)
    return (
      <View style={styles.recvView} >
        <View style={styles.head}>
          <Text style={styles.headText}>Send Request</Text>
        </View>
        <View style={styles.body}>
          <View style={styles.item}>
            <Text style={styles.itemName}>{state.id} wants to send you files.</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.itemName}>Do you want to accept?</Text>
          </View>
        </View>
        <View style={styles.foot}>
          <RowButton title='Reject' onPress={rejectRecv} />
          <RowButton title='Accept' onPress={acceptRecv} />
        </View>
      </View>
    )
  return (
    <View style={styles.recvView} >
      <View style={styles.head}>
        <Text style={styles.headText}>W T H?</Text>
      </View>
      <View style={styles.body}>
      </View>
      <View style={styles.foot}>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  recvView: {
    position: 'absolute',
    width: '90%',
    height: '80%',
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

export default RecvView;