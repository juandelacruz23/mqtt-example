import React from "react";
import { StyleSheet, View } from "react-native";
import CustomButton from "../Components/CustomButton";
import { connect } from "react-redux";
import { changeValue, AppAction, AppState } from "../redux/mainDuck";
import ConnectionStatus from "../ConnectionStatus";
import SubscriptionStatus from "../SubscriptionStatus";

const MQTTConfigurationButtons: React.FC<Props> = props => {
  const {
    loading,
    connectionStatus,
    hasText,
    isFormFilled,
    onPressClearButton,
    onPressConnectionButton,
    onPressSubscribeButton,
    subscriptionStatus,
  } = props;
  const isConnected = connectionStatus === ConnectionStatus.CONNECTED;
  const isSubscribed = subscriptionStatus === SubscriptionStatus.SUBSCRIBED;
  const connectionButtonText = isConnected ? "Disconnect" : "Connect";
  const subscriptionButtonText = isSubscribed ? "Unsubscribe" : "Subscribe";
  const disableAll = loading;
  return (
    <View style={styles.container}>
      <CustomButton
        text={connectionButtonText}
        disabled={!isFormFilled || disableAll}
        onPress={onPressConnectionButton}
      />
      <CustomButton
        text={subscriptionButtonText}
        disabled={!isConnected || !isFormFilled || disableAll}
        onPress={onPressSubscribeButton}
      />
      <CustomButton
        text="Clear"
        disabled={hasText || disableAll}
        onPress={onPressClearButton}
      />
    </View>
  );
};

interface Props {
  loading: boolean,
  connectionStatus: number,
  hasText: boolean,
  isFormFilled: boolean,
  onPressClearButton: () => AppAction,
  onPressConnectionButton: () => void,
  onPressSubscribeButton: () => void,
  subscriptionStatus: number,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    margin: 24,
  },
});

const mapStateToProps = (state: AppState) => ({
  loading: state.loading,
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
