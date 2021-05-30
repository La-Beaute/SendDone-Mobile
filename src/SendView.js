import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import RowButton from './RowButton';
import { STATE } from './Network';

const SendView = ({ close, state, endSend }) => {
  const closeAndExit = () => {
    endSend();
    close();
  }

  if (state.state === STATE.SEND) {
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
          <Text style={styles.headText}>Sending...</Text>
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
          <RowButton title='Cancel' onPress={closeAndExit} />
        </View>
      </View>
    )
  }
  if (state.state === STATE.SEND_REJECT)
    return (
      <View style={styles.recvView} >
        <View style={styles.head}>
          <Text style={styles.headText}>Send Fail</Text>
        </View>
        <View style={styles.body}>
          <Text style={styles.itemName}>Receiver has rejected your request.</Text>
        </View>
        <View style={styles.foot}>
          <RowButton title='OK' onPress={closeAndExit} />
        </View>
      </View>
    )
  if (state.state === STATE.SEND_DONE)
    return (
      <View style={styles.recvView} >
        <View style={styles.head}>
          <Text style={styles.headText}>Send done!</Text>
        </View>
        <View style={styles.body}>
        </View>
        <View style={styles.foot}>
          <RowButton title='OK' onPress={closeAndExit} />
        </View>
      </View>
    )
  if (state.state === STATE.ERR_NET)
    return (
      <View style={styles.recvView} >
        <View style={styles.head}>
          <Text style={styles.headText}>Sender has terminated.</Text>
        </View>
        <View style={styles.body}>
        </View>
        <View style={styles.foot}>
          <RowButton title='OK' onPress={closeAndExit} />
        </View>
      </View>
    )
  if (state.state === STATE.ERR_FS)
    return (
      <View style={styles.recvView} >
        <View style={styles.head}>
          <Text style={styles.headText}>File system Error. Cannot send.</Text>
        </View>
        <View style={styles.body}>
        </View>
        <View style={styles.foot}>
          <RowButton title='OK' onPress={closeAndExit} />
        </View>
      </View>
    )
  if (state.state === STATE.RECEIVER_END)
    return (
      <View style={styles.recvView} >
        <View style={styles.head}>
          <Text style={styles.headText}>Receiver has terminated.</Text>
        </View>
        <View style={styles.body}>
        </View>
        <View style={styles.foot}>
          <RowButton title='OK' onPress={closeAndExit} />
        </View>
      </View>
    )
  return (
    <View style={styles.recvView} >
      <View style={styles.head}>
        <Text style={styles.headText}>Waiting...</Text>
      </View>
      <View style={styles.body}>
      </View>
      <View style={styles.foot}>
        <RowButton title='Cancel' onPress={closeAndExit} />
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

export default SendView;