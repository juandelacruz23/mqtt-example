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
      startLoading,
    } = this.props;
    // eslint-disable-next-line no-undef
    this.client = new Paho.Client(host, Number(port), "uname");
    this.client.onConnectionLost = onConnectionLost;
    this.client.onMessageArrived = onMessageArrived;
    startLoading();
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
    const { onSubscribe, startLoading, topic } = this.props;
    startLoading();
    this.client.subscribe(topic, { onSuccess: onSubscribe });
  }

  unsubscribe() {
    const { onUnsubscribe, startLoading, topic } = this.props;
    startLoading();
    this.client.unsubscribe(topic, { onSuccess: onUnsubscribe });
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
  startLoading: PropTypes.func.isRequired,
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
      { connectionStatus: connectionStatuses.CONNECTED, loading: false },
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
      { subscriptionStatus: subscriptionStatuses.SUBSCRIBED, loading: false },
      "Subscribed"
    ),
  onUnsubscribe: () =>
    changeAndPush(
      { subscriptionStatus: subscriptionStatuses.UNSUBSCRIBED, loading: false },
      "Unsubscribed"
    ),
  startLoading: () => changeValue({ loading: true }),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { forwardRef: true }
)(MQTTComponent);
