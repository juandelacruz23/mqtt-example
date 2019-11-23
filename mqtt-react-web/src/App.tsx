import React from 'react';
import { Stack, Text, Link, FontWeights, initializeIcons } from 'office-ui-fabric-react';
import logo from './mqtt-example.png';
import ConnectionForm from './components/ConnectionForm';
import SubscribeForm from './components/SubscribeForm';
import PublishMessageForm from './components/PublishMessageForm';
import HistoryList from './components/HistoryList';
import Console from './components/Console';
import Card from './components/Card';
import "./index.css";

initializeIcons();

const boldStyle = {
  root: { fontWeight: FontWeights.semibold }
};

export const App: React.FunctionComponent = () => {
  return (
    <Stack
      horizontalAlign="center"
      verticalAlign="center"
      verticalFill
      styles={{
        root: {
          width: '960px',
          margin: '0 auto',
          textAlign: 'center',
          color: '#605e5c'
        }
      }}
      tokens={{
        childrenGap: 15
      }}
    >
      <img className="logo" src={logo} alt="logo" />
      <Text variant="xxLarge" styles={boldStyle}>
        Welcome to MQTT on React Web Example
      </Text>
      <Text variant="large">Mimics the functionality of <Link href="https://www.eclipse.org/paho/clients/js/utility/">Eclipse Paho's</Link> utility page.</Text>
      <Card title="Connection">
        <ConnectionForm />
      </Card>
      <Stack horizontal tokens={{ childrenGap: 5 }} styles={{ root: { width: "100%"} }}>
        <Card title="Subscribe">
          <SubscribeForm />
        </Card>
        <Card title="Publish">
          <PublishMessageForm />
        </Card>
      </Stack>
      <Card title="History">
        <HistoryList />
      </Card>
      <Card title="Console">
        <Console />
      </Card>
    </Stack>
  );
};
