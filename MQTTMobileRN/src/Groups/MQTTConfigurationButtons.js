import React from 'react';
import { StyleSheet, View } from "react-native";
import CustomButton from '../Components/CustomButton';
import { connectionStatuses, subscriptionStatuses } from '../statuses';

const MQTTConfigurationButtons = props => {
  const { 
    connectionStatus,
    isFormFilled,
    onPressConnectionButton,
    onPressSubscribeButton,
    subscriptionStatus,
  } = props;
  const isConnected = connectionStatus === connectionStatuses.CONNECTED;
  const isSubscribed = subscriptionStatus === subscriptionStatuses.SUBSCRIBED;
  const connectionButtonText =  isConnected ? 'Disconnect' : 'Connect';
  const subscriptionButtonText =  isSubscribed ? 'Unsubscribe' : 'Subscribe';
  return (
    <View style={styles.container}>
      <CustomButton text={connectionButtonText} disabled={!isFormFilled} onPress={onPressConnectionButton} />
      <CustomButton text={subscriptionButtonText} disabled={!isConnected || !isFormFilled} onPress={onPressSubscribeButton} />
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