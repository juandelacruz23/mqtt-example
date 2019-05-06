import React from "react";
import {
  Button,
  Paragraph,
  Dialog,
  Portal,
  TextInput,
} from "react-native-paper";
import { connect } from "react-redux";
import { changeValue, AppState, AppAction } from "../redux/mainDuck";

interface IStateToProps {
  message: string,
  showMessageDialog: boolean,
}

interface IDispatchToProps {
  closeDialog: () => AppAction,
  onChangeMessage: (message: string) => AppAction,
}

type Props = IStateToProps & IDispatchToProps & { sendMessage: () => void };

const MessageDialog: React.FC<Props> = props => (
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

const mapStateToProps = (state: AppState): IStateToProps => ({
  message: state.message,
  showMessageDialog: state.showMessageDialog,
});

const mapDispatchToProps: IDispatchToProps = {
  closeDialog: () => changeValue({ showMessageDialog: false }),
  onChangeMessage: message => changeValue({ message }),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageDialog);
