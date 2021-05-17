import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native';

const TextButton = ({ onPress, title }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles=StyleSheet.create({
  button: {
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25
  },
  text: {
    color: '#111',
    fontWeight: 'bold',
    fontSize: 16
  }
})

export default TextButton;