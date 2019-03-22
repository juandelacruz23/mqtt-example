import React, { Component } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Divider } from 'react-native-paper';
import MqttItem from './Components/MqttItem';
import ConnectionFAB from './Components/ConnectionFAB';
import statuses from './statuses';
import MQTTComponent from './Headless/MQTTComponent';
import MQTTConfigurationForm from './Groups/MQTTConfigurationForm';

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
  }

  pushText = entry => {
    const { text } = this.state;
    this.setState({ text: [...text, entry] });
  };

  onClickFAB = () => {
    const { status } = this.state;
    if(status === statuses.CONNECTED) this.setStatus(statuses.DISCONNECTED);
    else this.setStatus(statuses.CONNECTED)
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

  onSubscribe = () => this.pushText('SUBSCRIBED');

  render() {
    const { 
      status,
      text,
      host,
      port,
      topic,
    } = this.state;
    const isFilled = host && port && topic;
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
          disabled={!isFilled}
          status={status}
          onClick={this.onClickFAB}
        />
        { status === statuses.CONNECTED && 
        <MQTTComponent 
          onConnect={this.onConnect}
          onConnectionLost={this.onConnectionLost}
          onMessageArrived={this.onMessageArrived}
          onSubscribe={this.onSubscribe}
          host={host}
          port={port}
          topic={topic}
        />}
      </View>
    );
  }
}
