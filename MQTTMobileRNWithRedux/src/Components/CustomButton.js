import React from "react";
import { Button } from "react-native-paper";
import PropTypes from "prop-types";

const CustomButton = ({ disabled, onPress, text }) => {
  return (
    <Button mode="contained" disabled={disabled} onPress={onPress}>
      {text}
    </Button>
  );
};

CustomButton.propTypes = {
  disabled: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

export default CustomButton;
