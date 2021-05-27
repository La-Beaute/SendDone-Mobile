import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native';

const RowButton = ({ onPress, title }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    flex: 1
  },
  text: {
    color: '#111',
    fontWeight: 'bold',
    fontSize: 16
  }
})

export default RowButton;