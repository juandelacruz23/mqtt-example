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
  const connectionButtonText = connectionStatus === connectionStatuses.CONNECTED 
    ? 'Disconnect'
    : 'Connect';
  return (
    <View style={styles.container}>
      <CustomButton text={connectionButtonText} disabled={!isFormFilled} onPress={onPressConnectionButton} />
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