import React, { useState } from 'react';
import { 
  View,
  StyleSheet,
  Text,
  ScrollView,
  FlatList,
} from 'react-native';

const ItemView = () => {
  return (
    <View style={styles.itemView}>
      <FlatList style={styles.body}>
        
      </FlatList>
      <View style={styles.buttons}>
        
      </View>
    </View>
  )
}

const styles=StyleSheet.create({
  itemView: {
    width: '95%',
    height: '80%',
    alignSelf: 'center',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'darkgrey',
    marginTop: 10,
    marginBottom: 10,
  },
  body: {
    flex: 8
  }
});

export default ItemView;