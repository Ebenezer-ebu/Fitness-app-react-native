import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { white } from "../utils/colors";
import MetricCard from "./MetricCard";
import { addEntry } from "../actions";
import { removeEntry } from "../utils/api";
import { timeToString, getDailyReminderValue } from "../utils/helpers";
import TextButton from "./TextButton";

class EntryDetail extends Component {
  setTitle = (entryId) => {
    if (!entryId) return;
    const year = entryId.slice(0, 4);
    const month = entryId.slice(5, 7);
    const day = entryId.slice(8);
    this.props.navigation.setOptions({ title: `${month}/${day}/${year}` });
    console.log("yeah2");
  };

  reset = () => {
    const { entryId, dispatch, navigation } = this.props;
    dispatch(
      addEntry({
        [entryId]: timeToString() === entryId ? getDailyReminderValue() : null,
      })
    );
    navigation.goBack();
    removeEntry(entryId);
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.metrics !== null && !nextProps.metrics.today;
  }

  render() {
    const { metrics, entryId } = this.props;
    this.setTitle(entryId);
    return (
      <View style={styles.container}>
        <MetricCard metrics={metrics} />
        <TextButton onPress={this.reset} style={{ margin: 20 }}>
          RESET
        </TextButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 15,
  },
});

function mapStateToProps(state, { route, navigation }) {
  const { entryId } = route.params;
  return {
    entryId,
    metrics: state[entryId],
    navigation
  };
}

export default connect(mapStateToProps)(EntryDetail);
