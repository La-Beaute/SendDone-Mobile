import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
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
  if (state.state === STATE.RECV) {
    let speed = parseFloat(state.speed);
    if (speed > 1048576)
      speed = (speed / 1048576).toFixed(2).toString() + ' MB/S'
    else if (speed > 1024)
      speed = (speed / 1024).toFixed(2).toString() + ' KB/S'
    else
      speed = speed.toFixed(2).toString() + ' B/S'
    return (
      <View style={styles.recvView} >
        <View style={styles.head}>
          <Text style={styles.headText}>Receiving...</Text>
        </View>
        <View style={styles.body}>
          <View style={styles.item}>
            <Text style={styles.itemName}>{state.name}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.itemName}>{speed}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.itemName}>{state.progress}%</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.itemName}>Total Progress: {state.totalProgress}</Text>
          </View>
        </View>
        <View style={styles.foot}>
          <RowButton title='Cancel' onPress={endRecv} />
        </View>
      </View>
    )
  }
  if (state.state === STATE.RECV_DONE)
    return (
      <View style={styles.recvView} >
        <View style={styles.head}>
          <Text style={styles.headText}>Receive Done!</Text>
        </View>
        <View style={styles.body}>
        </View>
        <View style={styles.foot}>
          <RowButton title='OK' onPress={close} />
        </View>
      </View>
    )
  if (state.state === STATE.ERR_NET)
    return (
      <View style={styles.recvView} >
        <View style={styles.head}>
          <Text style={styles.headText}>Network Error. Cannot receive.</Text>
        </View>
        <View style={styles.body}>
        </View>
        <View style={styles.foot}>
          <RowButton title='OK' onPress={close} />
        </View>
      </View>
    )
  if (state.state === STATE.ERR_FS)
    return (
      <View style={styles.recvView} >
        <View style={styles.head}>
          <Text style={styles.headText}>File system Error. Cannot receive.</Text>
        </View>
        <View style={styles.body}>
        </View>
        <View style={styles.foot}>
          <RowButton title='OK' onPress={close} />
        </View>
      </View>
    )
  if (state.state === STATE.SENDER_END)
    return (
      <View style={styles.recvView} >
        <View style={styles.head}>
          <Text style={styles.headText}>Sender has terminated.</Text>
        </View>
        <View style={styles.body}>
        </View>
        <View style={styles.foot}>
          <RowButton title='OK' onPress={close} />
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
    height: '70%',
    alignSelf: 'center',
    top: '15%',
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
    flex: 6,
    padding: 10,
    flexDirection: 'column',
    alignItems: 'center'
  },
  item: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
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