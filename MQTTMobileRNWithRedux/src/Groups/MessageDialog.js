import React from "react";
import {
  Button,
  Paragraph,
  Dialog,
  Portal,
  TextInput,
} from "react-native-paper";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { changeValue } from "../redux/mainDuck";

const MessageDialog = props => (
  <Portal>
    <Dialog visible={props.showMessageDialog} onDismiss={props.closeDialog}>
      <Dialog.Title>Create message</Dialog.Title>
      <Dialog.Content>
        <Paragraph>
          Write the message to publish to the selected topic
        </Paragraph>
        <TextInput
          label="Message"
          multiline
          numberOfLines={3}
          onChangeText={props.onChangeMessage}
          value={props.message}
        />
      </Dialog.Content>
      <Dialog.Actions>
        <Button
          icon="send"
          onPress={() => {
            props.sendMessage();
            props.closeDialog();
          }}
        >
          Send!
        </Button>
      </Dialog.Actions>
    </Dialog>
  </Portal>
);

MessageDialog.propTypes = {
  closeDialog: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  onChangeMessage: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
  showMessageDialog: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  showMessageDialog: state.showMessageDialog,
  message: state.message,
});

const mapDispatchToProps = {
  closeDialog: () => changeValue({ showMessageDialog: false }),
  onChangeMessage: message => changeValue({ message }),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageDialog);
