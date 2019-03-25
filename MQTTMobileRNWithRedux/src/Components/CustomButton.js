import React from 'react';
import { Button } from "react-native-paper";

const CustomButton = ({ disabled, onPress,text }) => {
  return (
    <Button mode='contained' disabled={disabled} onPress={onPress}>
      {text}
    </Button>
  );
};

export default CustomButton;