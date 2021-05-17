import React, { useState } from 'react';
import { 
  View,
  StyleSheet,
  Text,
  ScrollView,
  FlatList,
} from 'react-native';
import TextButton from './TextButton';

const ItemView = () => {
  return (
    <View style={styles.itemView}>
      <FlatList style={styles.body}>
        
      </FlatList>
      <View style={styles.buttons}>
        <TextButton title='- Checks' />
        <TextButton title='+ Folders' />
        <TextButton title='+ Files' />
      </View>
    </View>
  )
}

const styles=StyleSheet.create({
  itemView: {
    width: '95%',
    height: '95%',
    alignSelf: 'center',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'darkgrey',
    marginTop: 10,
    marginBottom: 10,
  },
  body: {
    flex: 8
  },
  buttons: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
});

export default ItemView;