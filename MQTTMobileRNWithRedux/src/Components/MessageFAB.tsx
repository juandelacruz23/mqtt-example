import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { FAB } from "react-native-paper";
import { connect } from "react-redux";
import { changeValue, AppState, AppAction } from "../redux/mainDuck";
import ConnectionStatus from "../ConnectionStatus";

interface IStateToProps {
  disabled: boolean,
}

interface IDispatchToProps {
  onPress: () => AppAction
}

type Props = IStateToProps & IDispatchToProps;

const MessageFAB: React.FC<Props> = ({ disabled, onPress }) => (
  <FAB
    style={fab}
    icon="message"
    disabled={disabled}
    onPress={onPress}
  />
);

const fab: StyleProp<ViewStyle> = {
  position: "absolute",
  margin: 20,
  right: 0,
  bottom: 0,
};

const mapStateToProps = (state: AppState): IStateToProps => ({
  disabled: state.connectionStatus === ConnectionStatus.DISCONNECTED,
});

const mapDispatchToProps: IDispatchToProps = {
  onPress: () => changeValue({ showMessageDialog: true }),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageFAB);
