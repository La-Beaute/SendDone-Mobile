import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native';

const RowButton = ({ onPress, title, propStyle }) => {
  return (
    <TouchableOpacity onPress={onPress} style={propStyle ? propStyle : styles.button}>
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
    fontSize: 20,
    textAlign: 'center',
  }
})

export default RowButton;