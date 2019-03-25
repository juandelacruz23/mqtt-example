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
    if (connectionStatus === connectionStatuses.CONNECTED)
      mqttComponent.disconnect();
    else mqttComponent.connect();
  };

  setConnectionStatus = (connectionStatus, callback) => {
    this.props.setConnectionStatus(connectionStatus);
    callback();
  };

  setSubscriptionStatus = (subscriptionStatus, callback) => {
    this.props.setSubscriptionStatus(subscriptionStatus);
    callback && callback();
  };

  onConnectionLost = responseObject => {
    if (responseObject.errorCode !== 0) {
      this.pushText(`connection lost: ${responseObject.errorMessage}`);
    }
  };

  onChange = value => this.setState(value);

  onPressSubscribeButton = () => {
    const { subscriptionStatus } = this.props;
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
    const { text } = this.props;
    return (
      <View style={styles.container}>
        <MQTTConfigurationForm />
        <MQTTConfigurationButtons
          hasText={text.length === 0}
          onPressConnectionButton={this.onClickConnectionButton}
          onPressSubscribeButton={this.onPressSubscribeButton}
        />
        <FlatList
          data={text}
          ItemSeparatorComponent={() => <Divider />}
          keyExtractor={(item, index) => `item${index}`}
          renderItem={({ item }) => <MqttItem text={item} />}
          style={styles.container}
        />
        <MQTTComponent
          onConnectionLost={this.onConnectionLost}
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
  pushText: PropTypes.func.isRequired,
  subscriptionStatus: PropTypes.number.isRequired,
  text: PropTypes.array.isRequired,
  setConnectionStatus: PropTypes.func.isRequired,
  setSubscriptionStatus: PropTypes.func.isRequired,
};

const mapStateToProps = ({ connectionStatus, subscriptionStatus, text }) => ({
  connectionStatus,
  subscriptionStatus,
  text,
});

const mapDispatchToProps = {
  pushText,
  setConnectionStatus: newStatus =>
    changeValue({ connectionStatus: newStatus }),
  setSubscriptionStatus: newStatus =>
    changeValue({ subscriptionStatus: newStatus }),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
