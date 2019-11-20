import React from 'react';
import { Stack, Text, Link, FontWeights } from 'office-ui-fabric-react';
import logo from './mqtt-example.png';
import ConnectionForm from './components/ConnectionForm';

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
      <img src={logo} alt="logo" />
      <Text variant="xxLarge" styles={boldStyle}>
        Welcome to MQTT on React Web Example
      </Text>
      <Text variant="large">Mimics the functionality of <Link href="https://www.eclipse.org/paho/clients/js/utility/">Eclipse Paho's</Link> utility page.</Text>
      <ConnectionForm />
    </Stack>
  );
};
