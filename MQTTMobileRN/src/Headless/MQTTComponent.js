import { PureComponent } from 'react';
import { AsyncStorage } from "react-native";
import init from 'react_native_mqtt';

init({
  size: 10000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
  sync: {},
});

class MQTTComponent extends PureComponent {
  componentDidMount() {
    const { 
      onConnectionLost,
      onMessageArrived,
      host,
      port,
    } = this.props;
    this.client = new Paho.MQTT.Client(host, Number(port), 'uname');
    this.client.onConnectionLost = onConnectionLost;
    this.client.onMessageArrived = onMessageArrived;
    this.client.connect({ onSuccess: this.onConnect, useSSL: false })
  }

  onConnect = () => {
    this.props.onConnect();
    this.subscribe();
  }

  componentWillUnmount() {
    this.client.disconnect()
  }

  subscribe() {
    const { topic } = this.props;
    this.client.subscribe(topic, { onSuccess: this.props.onSubscribe });
  }

  render() {
    return null;
  }
}

export default MQTTComponent;