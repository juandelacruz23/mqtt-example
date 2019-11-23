import React from 'react';

const Console = () => {
  return (
    <div id="console" className="full-width">
      <span>Fri, 22 Nov 2019 17:13:09 GMT - INFO - Starting Eclipse Paho JavaScript Utility.</span>
      <span>Fri, 22 Nov 2019 17:13:26 GMT - INFO - Connecting to Server: [Host: localhost, Port: 5000, Path: /mqtt, ID: js-utility-BnDHz]</span>
      <span>Fri, 22 Nov 2019 17:13:27 GMT - INFO - Connection Success [URI: localhost:5000/mqtt, ID: js-utility-BnDHz]</span>
      <span>Fri, 22 Nov 2019 17:13:27 GMT - INFO - Client Has now connected: [Reconnected: false, URI: ws://localhost:5000/mqtt]</span>
      <span>Fri, 22 Nov 2019 17:13:38 GMT - INFO - Subscribing to: [Topic: message, QoS: 0]</span>
      <span>Fri, 22 Nov 2019 17:13:39 GMT - INFO - Message Recieved: [Topic: message, Payload: Mqtt is still awesome at 22/11/2019 11:13:37 a. m., QoS: 0, Retained: false, Duplicate: false]</span>
      <span>Fri, 22 Nov 2019 17:13:41 GMT - INFO - Message Recieved: [Topic: message, Payload: Mqtt is still awesome at 22/11/2019 11:13:39 a. m., QoS: 0, Retained: false, Duplicate: false]</span>
      <span>Fri, 22 Nov 2019 17:13:43 GMT - INFO - Message Recieved: [Topic: message, Payload: Mqtt is still awesome at 22/11/2019 11:13:41 a. m., QoS: 0, Retained: false, Duplicate: false]</span>
      <span>Fri, 22 Nov 2019 17:13:45 GMT - INFO - Unsubscribing: [Topic: message]</span>
      <span>Fri, 22 Nov 2019 17:13:45 GMT - INFO - Unsubscribed. [Topic: message]</span>
    </div>
  );
};

export default Console;