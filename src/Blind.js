import React from 'react';
import {
  View,
  StyleSheet
} from 'react-native';

const Blind = () => {
  return (
    <View style={styles.blind}>
      
    </View>
  );
};

const styles = StyleSheet.create({
  
  blind: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#33333388'
  }
});

export default Blind;