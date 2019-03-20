import React from 'react';
import { StyleSheet } from "react-native";
import { FAB } from 'react-native-paper';
import statuses from '../statuses';

const ConnectionFAB = ({ onClick, status }) => {
  const icon = status === statuses.DISCONNECTED ? 'play-arrow' : 'pause';
  return (
    <FAB
      style={styles.fab}
      icon={icon}
      onPress={onClick}
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