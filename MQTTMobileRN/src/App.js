import React, { Component } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Divider } from 'react-native-paper';
import MqttItem from './Components/MqttItem';
import ConnectionFAB from './Components/ConnectionFAB';
import statuses from './statuses';
import MQTTComponent from './Headless/MQTTComponent';
import MQTTConfigurationForm from './Containers/MQTTConfigurationForm';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ['...'],
      status: statuses.DISCONNECTED,
      host: '',
      port: '',
      topic: '',
    };
    this.mqttComponent = React.createRef();
  }

  pushText = entry => {
    const { text } = this.state;
    this.setState({ text: [...text, entry] });
  };

  onClickFAB = () => {
    const { status } = this.state;
    const { current : mqttComponent } = this.mqttComponent;
    if(status === statuses.CONNECTED) {
      mqttComponent.unsubscribe('message', { onSuccess: () => this.setStatus(statuses.DISCONNECTED) });
    }
    else {
      mqttComponent.subscribe('message', { onSuccess: () => this.setStatus(statuses.CONNECTED) });
    }
  };

  setStatus = status => {
    this.setState({ status });
  };

  onConnect = () => this.pushText('Connected');  

  onConnectionLost = responseObject => {
    if (responseObject.errorCode !== 0) {
      this.pushText(`connection lost: ${responseObject.errorMessage}`);
    }
  };

  onMessageArrived = message => {
    this.pushText(`new message: ${message.payloadString}`);
  };

  onChange = value => this.setState(value);

  render() {
    const { 
      status,
      text,
      host,
      port,
      topic,
    } = this.state;
    return (
      <View style={styles.container}>
        <MQTTConfigurationForm
          host={host}
          port={port}
          topic={topic}
          onChangeHost={host => this.onChange({ host })}
          onChangePort={port => this.onChange({ port })}
          onChangeTopic={topic => this.onChange({ topic })}
        />
        <FlatList
          data={text}
          ItemSeparatorComponent={() => <Divider />}
          keyExtractor={(item, index) => `item${index}`}
          renderItem={({ item }) => <MqttItem text={item} />}
          style={styles.container}
        />
        <ConnectionFAB
          status={status}
          onClick={this.onClickFAB}
        />
        <MQTTComponent 
          onConnect={this.onConnect}
          onConnectionLost={this.onConnectionLost}
          onMessageArrived={this.onMessageArrived}
          ref={this.mqttComponent}
        />
      </View>
    );
  }
}
