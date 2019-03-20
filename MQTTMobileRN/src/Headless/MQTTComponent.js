import { PureComponent } from 'react';
import { AsyncStorage } from "react-native";
import Config from 'react-native-config';
import init from 'react_native_mqtt';

init({
  size: 10000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
  sync: {},
});

class MQTTComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.client = new Paho.MQTT.Client(Config.MQTT_HOST, Number(Config.MQTT_PORT), Config.MQTT_CLIENT_ID);
  }

  componentDidMount() {
    const { client } = this;
    const { onConnect, onConnectionLost, onMessageArrived } = this.props;
    client.connect({ onSuccess: onConnect, useSSL: false })
    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;
  }

  componentWillUnmount() {
    this.client.disconnect()
  }

  subscribe(topic, options) {
    this.client.subscribe(topic, options);
  }

  unsubscribe(topic, options) {
    this.client.unsubscribe(topic, options);
  }

  render() {
    return null;
  }
}

export default MQTTComponent;