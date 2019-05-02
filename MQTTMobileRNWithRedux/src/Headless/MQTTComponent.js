import { PureComponent } from "react";
import Paho from "paho-mqtt";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { pushText, changeAndPush, changeValue } from "./../redux/mainDuck";
import { connectionStatuses, subscriptionStatuses } from "../statuses";

class MQTTComponent extends PureComponent {
  connect() {
    const {
      host,
      onConnect,
      onConnectionLost,
      onMessageArrived,
      port,
      startConnecting,
    } = this.props;
    // eslint-disable-next-line no-undef
    this.client = new Paho.Client(host, Number(port), "uname");
    this.client.onConnectionLost = onConnectionLost;
    this.client.onMessageArrived = onMessageArrived;
    startConnecting();
    this.client.connect({ onSuccess: onConnect, useSSL: false });
  }

  disconnect() {
    this.client.disconnect();
    this.client = null;
    this.props.onDisconnect();
  }

  componentWillUnmount() {
    this.client && this.client.disconnect();
  }

  publish() {
    const { message, topic } = this.props;
    this.client.publish(topic, message);
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
  message: PropTypes.string.isRequired,
  port: PropTypes.string.isRequired,
  startConnecting: PropTypes.func.isRequired,
  topic: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  host: state.host,
  message: state.message,
  port: state.port,
  topic: state.topic,
});

const mapDispatchToProps = {
  onConnect: () =>
    changeAndPush(
      { connectionStatus: connectionStatuses.CONNECTED, connecting: false },
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
  onSubscribe: () =>
    changeAndPush(
      { subscriptionStatus: subscriptionStatuses.SUBSCRIBED },
      "Subscribed"
    ),
  onUnsubscribe: () =>
    changeAndPush(
      { subscriptionStatus: subscriptionStatuses.UNSUBSCRIBED },
      "Unsubscribed"
    ),
  startConnecting: () => changeValue({ connecting: true }),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { forwardRef: true }
)(MQTTComponent);
