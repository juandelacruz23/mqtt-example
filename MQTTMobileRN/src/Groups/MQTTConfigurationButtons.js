import React from 'react';
import { StyleSheet, View } from "react-native";
import CustomButton from '../Components/CustomButton';

const MQTTConfigurationButtons = () => {
  return (
    <View style={styles.container}>
      <CustomButton text='Connect' />
      <CustomButton text='Subscribe' />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    margin: 24,
  }
});

export default MQTTConfigurationButtons;