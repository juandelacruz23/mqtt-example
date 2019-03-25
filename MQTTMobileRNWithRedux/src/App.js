import React, { Component } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Divider } from "react-native-paper";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import MqttItem from "./Components/MqttItem";
import { connectionStatuses, subscriptionStatuses } from "./statuses";
import MQTTComponent from "./Headless/MQTTComponent";
import MQTTConfigurationForm from "./Groups/MQTTConfigurationForm";
import MQTTConfigurationButtons from "./Groups/MQTTConfigurationButtons";
import { pushText, changeValue } from "./redux/mainDuck";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subscriptionStatus: subscriptionStatuses.UNSUBSCRIBED,
    };
    this.mqttComponent = React.createRef();
  }

  pushText = entry => this.props.pushText(entry);

  onClickConnectionButton = () => {
    const { connectionStatus } = this.props;
    const { current: mqttComponent } = this.mqttComponent;
    if (connectionStatus === connectionStatuses.CONNECTED) {
      mqttComponent.disconnect();
      this.setConnectionStatus(connectionStatuses.DISCONNECTED, () =>
        this.pushText("Disconnected")
      );
      this.setSubscriptionStatus(subscriptionStatuses.UNSUBSCRIBED);
    } else mqttComponent.connect();
  };

  setConnectionStatus = (connectionStatus, callback) => {
    this.props.setConnectionStatus(connectionStatus);
    callback();
  };

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
    const { subscriptionStatus } = this.state;
    const { text } = this.props;
    return (
      <View style={styles.container}>
        <MQTTConfigurationForm />
        <MQTTConfigurationButtons
          hasText={text.length === 0}
          onPressConnectionButton={this.onClickConnectionButton}
          onPressSubscribeButton={this.onPressSubscribeButton}
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

App.propTypes = {
  connectionStatus: PropTypes.number.isRequired,
  text: PropTypes.array.isRequired,
  pushText: PropTypes.func.isRequired,
  setConnectionStatus: PropTypes.func.isRequired,
};

const mapStateToProps = ({ connectionStatus, text }) => ({
  connectionStatus,
  text,
});

const mapDispatchToProps = {
  pushText,
  setConnectionStatus: newStatus =>
    changeValue({ connectionStatus: newStatus }),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
