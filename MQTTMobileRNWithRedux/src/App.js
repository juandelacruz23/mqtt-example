import React, { Component } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Divider, ActivityIndicator } from "react-native-paper";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import MqttItem from "./Components/MqttItem";
import { connectionStatuses, subscriptionStatuses } from "./statuses";
import MQTTComponent from "./Headless/MQTTComponent";
import MQTTConfigurationForm from "./Groups/MQTTConfigurationForm";
import MQTTConfigurationButtons from "./Groups/MQTTConfigurationButtons";
import { pushText } from "./redux/mainDuck";
import MessageFAB from "./Components/MessageFAB";
import MessageDialog from "./Groups/MessageDialog";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class App extends Component {
  constructor(props) {
    super(props);
    this.mqttComponent = React.createRef();
  }

  onClickConnectionButton = () => {
    const { connectionStatus } = this.props;
    const { current: mqttComponent } = this.mqttComponent;
    if (connectionStatus === connectionStatuses.CONNECTED)
      mqttComponent.disconnect();
    else mqttComponent.connect();
  };

  onConnectionLost = responseObject => {
    if (responseObject.errorCode !== 0) {
      this.props.pushText(`connection lost: ${responseObject.errorMessage}`);
    }
  };

  onPressSubscribeButton = () => {
    const { subscriptionStatus } = this.props;
    const { current: mqttComponent } = this.mqttComponent;
    if (subscriptionStatus === subscriptionStatuses.SUBSCRIBED)
      mqttComponent.unsubscribe();
    else mqttComponent.subscribe();
  };

  sendMessage = () => {
    const { current: mqttComponent } = this.mqttComponent;
    mqttComponent.publish();
  };

  render() {
    const { loading, text } = this.props;
    return (
      <View style={styles.container}>
        <MQTTConfigurationForm />
        <MQTTConfigurationButtons
          onPressConnectionButton={this.onClickConnectionButton}
          onPressSubscribeButton={this.onPressSubscribeButton}
        />
        {loading ? (
          <ActivityIndicator animating size="large" />
        ) : (
          <FlatList
            data={text}
            ItemSeparatorComponent={() => <Divider />}
            keyExtractor={(item, index) => `item${index}`}
            renderItem={({ item }) => <MqttItem text={item} />}
            style={styles.container}
          />
        )}
        <MQTTComponent
          onConnectionLost={this.onConnectionLost}
          ref={this.mqttComponent}
        />
        <MessageFAB />
        <MessageDialog sendMessage={this.sendMessage} />
      </View>
    );
  }
}

App.propTypes = {
  loading: PropTypes.bool.isRequired,
  connectionStatus: PropTypes.number.isRequired,
  pushText: PropTypes.func.isRequired,
  subscriptionStatus: PropTypes.number.isRequired,
  text: PropTypes.array.isRequired,
};

const mapStateToProps = ({
  loading,
  connectionStatus,
  subscriptionStatus,
  text,
}) => ({
  loading,
  connectionStatus,
  subscriptionStatus,
  text,
});

const mapDispatchToProps = {
  pushText,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
