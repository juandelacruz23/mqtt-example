import React from "react";
import { StyleSheet } from "react-native";
import { FAB } from "react-native-paper";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { connectionStatuses } from "../statuses";

const MessageFAB = ({ disabled }) => (
  <FAB style={styles.fab} icon="message" disabled={disabled} />
);

MessageFAB.propTypes = {
  disabled: PropTypes.bool.isRequired,
};

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

const mapStateToProps = state => ({
  disabled: state.connectionStatus === connectionStatuses.DISCONNECTED,
});

export default connect(mapStateToProps)(MessageFAB);
