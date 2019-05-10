import React from "react";
import { Button } from "react-native-paper";

interface Props {
  disabled: boolean,
  onPress: () => void,
  text: string,
};

const CustomButton: React.FC<Props> = ({ disabled, onPress, text }) => (
  <Button mode="contained" disabled={disabled} onPress={onPress} compact>
    {text}
  </Button>
);

export default CustomButton;
