import { PureComponent } from "react";
import { AsyncStorage } from "react-native";
import init from "react_native_mqtt";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { pushText, changeAndPush } from "./../redux/mainDuck";
import { connectionStatuses, subscriptionStatuses } from "../statuses";

init({
  size: 10000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
  sync: {},
});

class MQTTComponent extends PureComponent {
  connect() {
    const { onConnectionLost, onMessageArrived, host, port } = this.props;
    // eslint-disable-next-line no-undef
    this.client = new Paho.MQTT.Client(host, Number(port), "uname");
    this.client.onConnectionLost = onConnectionLost;
    this.client.onMessageArrived = onMessageArrived;
    this.client.connect({ onSuccess: this.props.onConnect, useSSL: false });
  }

  disconnect() {
    this.client.disconnect();
    this.client = null;
    this.props.onDisconnect();
  }

  componentWillUnmount() {
    this.client && this.client.disconnect();
  }

  subscribe() {
    const { topic } = this.props;
    this.client.subscribe(topic, { onSuccess: this.props.onSubscribe });
  }

  unsubscribe() {
    const { topic } = this.props;
    this.client.unsubscribe(topic, { onSuccess: this.props.onUnsubscribe });
  }

  render() {
    return null;
  }
}

MQTTComponent.propTypes = {
  onConnect: PropTypes.func.isRequired,
  onDisconnect: PropTypes.func.isRequired,
  onConnectionLost: PropTypes.func.isRequired,
  onMessageArrived: PropTypes.func.isRequired,
  onSubscribe: PropTypes.func.isRequired,
  onUnsubscribe: PropTypes.func.isRequired,
  host: PropTypes.string.isRequired,
  port: PropTypes.string.isRequired,
  topic: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  host: state.host,
  port: state.port,
  topic: state.topic,
});

const mapDispatchToProps = {
  onConnect: () =>
    changeAndPush(
      { connectionStatus: connectionStatuses.CONNECTED },
      "Connected"
    ),
  onDisconnect: () =>
    changeAndPush(
      {
        connectionStatus: connectionStatuses.DISCONNECTED,
        subscriptionStatus: subscriptionStatuses.UNSUBSCRIBED,
      },
      "Disconnected"
    ),
  onMessageArrived: message =>
    pushText(`new message: ${message.payloadString}`),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { forwardRef: true }
)(MQTTComponent);
