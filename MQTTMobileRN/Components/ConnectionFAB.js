import React from 'react';
import { StyleSheet } from "react-native";
import { FAB } from 'react-native-paper';
import Icon from "react-native-vector-icons/Feather";

const ConnectionFAB = () => {

  return (
    <FAB
      style={styles.fab}
      icon={() => <Icon name="play" size={20} style={styles.icon} /> }
      onPress={() => console.log('Pressed')}
    />
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 20,
    right: 0,
    bottom: 0,
  },
  icon: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

export default ConnectionFAB;