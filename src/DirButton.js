import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native';

const DirButton = ({ onPress, title }) => {
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
    height: '50%',
    paddingHorizontal: 10,
    paddingVertical: 0,
    borderRadius: 10
  },
  text: {
    color: '#111',
    fontWeight: 'bold',
    fontSize: 14
  }
})

export default DirButton;