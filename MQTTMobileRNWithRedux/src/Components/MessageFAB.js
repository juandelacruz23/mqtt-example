import React from "react";
import { StyleSheet } from "react-native";
import { FAB } from "react-native-paper";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { connectionStatuses } from "../statuses";
import { changeValue } from "../redux/mainDuck";

const MessageFAB = ({ disabled, onPress }) => (
  <FAB
    style={styles.fab}
    icon="message"
    disabled={disabled}
    onPress={onPress}
  />
);

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 20,
    right: 0,
    bottom: 0,
  },
  icon: {
    flex: 1,
    textAlign: "center",
    textAlignVertical: "center",
  },
});

MessageFAB.propTypes = {
  disabled: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  disabled: state.connectionStatus === connectionStatuses.DISCONNECTED,
});

const mapDispatchToProps = {
  onPress: () => changeValue({ showMessageDialog: true }),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageFAB);
