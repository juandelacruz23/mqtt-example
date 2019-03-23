import React from 'react';
import { Button } from "react-native-paper";

const CustomButton = ({ text }) => {
  return (
    <Button mode='contained'>
      {text}
    </Button>
  );
};

export default CustomButton;