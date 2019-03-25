import React from "react";
import { StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import CustomButton from "../Components/CustomButton";
import { connectionStatuses, subscriptionStatuses } from "../statuses";
import { connect } from "react-redux";
import { changeValue } from "../redux/mainDuck";

const MQTTConfigurationButtons = props => {
  const {
    connectionStatus,
    hasText,
    isFormFilled,
    onPressClearButton,
    onPressConnectionButton,
    onPressSubscribeButton,
    subscriptionStatus,
  } = props;
  const isConnected = connectionStatus === connectionStatuses.CONNECTED;
  const isSubscribed = subscriptionStatus === subscriptionStatuses.SUBSCRIBED;
  const connectionButtonText = isConnected ? "Disconnect" : "Connect";
  const subscriptionButtonText = isSubscribed ? "Unsubscribe" : "Subscribe";
  return (
    <View style={styles.container}>
      <CustomButton
        text={connectionButtonText}
        disabled={!isFormFilled}
        onPress={onPressConnectionButton}
      />
      <CustomButton
        text={subscriptionButtonText}
        disabled={!isConnected || !isFormFilled}
        onPress={onPressSubscribeButton}
      />
      <CustomButton
        text="Clear"
        disabled={hasText}
        onPress={onPressClearButton}
      />
    </View>
  );
};

MQTTConfigurationButtons.propTypes = {
  connectionStatus: PropTypes.number.isRequired,
  hasText: PropTypes.bool.isRequired,
  isFormFilled: PropTypes.bool.isRequired,
  onPressClearButton: PropTypes.func.isRequired,
  onPressConnectionButton: PropTypes.func.isRequired,
  onPressSubscribeButton: PropTypes.func.isRequired,
  subscriptionStatus: PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    margin: 24,
  },
});

const mapStateToProps = state => ({
  connectionStatus: state.connectionStatus,
  hasText: state.text.length === 0,
  isFormFilled: !!(state.host && state.port && state.topic),
  subscriptionStatus: state.subscriptionStatus,
});

const mapDispatchToProps = {
  onPressClearButton: () => changeValue({ text: [] }),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MQTTConfigurationButtons);
