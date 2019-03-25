import React, { Component } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Divider } from "react-native-paper";
import MqttItem from "./Components/MqttItem";
import { connectionStatuses, subscriptionStatuses } from "./statuses";
import MQTTComponent from "./Headless/MQTTComponent";
import MQTTConfigurationForm from "./Groups/MQTTConfigurationForm";
import MQTTConfigurationButtons from "./Groups/MQTTConfigurationButtons";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: [],
      connectionStatus: connectionStatuses.DISCONNECTED,
      subscriptionStatus: subscriptionStatuses.UNSUBSCRIBED,
    };
    this.mqttComponent = React.createRef();
  }

  pushText = entry => {
    const { text } = this.state;
    this.setState({ text: [...text, entry] });
  };

  onClickConnectionButton = () => {
    const { connectionStatus } = this.state;
    const { current: mqttComponent } = this.mqttComponent;
    if (connectionStatus === connectionStatuses.CONNECTED) {
      mqttComponent.disconnect();
      this.setConnectionStatus(connectionStatuses.DISCONNECTED, () =>
        this.pushText("Disconnected")
      );
      this.setSubscriptionStatus(subscriptionStatuses.UNSUBSCRIBED);
    } else mqttComponent.connect();
  };

  setConnectionStatus = (connectionStatus, callback) =>
    this.setState({ connectionStatus }, callback);

  setSubscriptionStatus = (subscriptionStatus, callback) =>
    this.setState({ subscriptionStatus }, callback);

  onConnect = () =>
    this.setConnectionStatus(connectionStatuses.CONNECTED, () =>
      this.pushText("Connected")
    );

  onConnectionLost = responseObject => {
    if (responseObject.errorCode !== 0) {
      this.pushText(`connection lost: ${responseObject.errorMessage}`);
    }
  };

  onMessageArrived = message => {
    this.pushText(`new message: ${message.payloadString}`);
  };

  onChange = value => this.setState(value);

  onPressSubscribeButton = () => {
    const { subscriptionStatus } = this.state;
    const { current: mqttComponent } = this.mqttComponent;
    if (subscriptionStatus === subscriptionStatuses.SUBSCRIBED)
      mqttComponent.unsubscribe();
    else mqttComponent.subscribe();
  };

  onSubscribe = () =>
    this.setSubscriptionStatus(subscriptionStatuses.SUBSCRIBED, () =>
      this.pushText("Subscribed")
    );

  onUnsubscribe = () =>
    this.setSubscriptionStatus(subscriptionStatuses.UNSUBSCRIBED, () =>
      this.pushText("Unsubscribed")
    );

  render() {
    const { connectionStatus, subscriptionStatus, text } = this.state;
    return (
      <View style={styles.container}>
        <MQTTConfigurationForm
          disableInputs={connectionStatus === connectionStatuses.CONNECTED}
        />
        <MQTTConfigurationButtons
          hasText={text.length === 0}
          onPressClearButton={() => this.setState({ text: [] })}
          onPressConnectionButton={this.onClickConnectionButton}
          onPressSubscribeButton={this.onPressSubscribeButton}
          connectionStatus={connectionStatus}
          subscriptionStatus={subscriptionStatus}
        />
        <FlatList
          data={text}
          ItemSeparatorComponent={() => <Divider />}
          keyExtractor={(item, index) => `item${index}`}
          renderItem={({ item }) => <MqttItem text={item} />}
          style={styles.container}
        />
        <MQTTComponent
          onConnect={this.onConnect}
          onConnectionLost={this.onConnectionLost}
          onMessageArrived={this.onMessageArrived}
          onSubscribe={this.onSubscribe}
          onUnsubscribe={this.onUnsubscribe}
          ref={this.mqttComponent}
        />
      </View>
    );
  }
}
