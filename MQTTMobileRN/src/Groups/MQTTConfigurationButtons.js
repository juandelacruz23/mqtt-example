import React from 'react';
import { StyleSheet, View } from "react-native";
import CustomButton from '../Components/CustomButton';
import { connectionStatuses } from '../statuses';

const MQTTConfigurationButtons = props => {
  const { 
    connectionStatus,
    isFormFilled,
    onPressConnectionButton,
  } = props;
  const isConnected = connectionStatus === connectionStatuses.CONNECTED;
  const connectionButtonText =  isConnected ? 'Disconnect' : 'Connect';
  return (
    <View style={styles.container}>
      <CustomButton text={connectionButtonText} disabled={!isFormFilled} onPress={onPressConnectionButton} />
      <CustomButton text='Subscribe' disabled={!isConnected || !isFormFilled} />
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