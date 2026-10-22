import React, { useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';

export default function SettingsScreen() {
  const [metric, setMetric] = useState(true);

  return (
    <View style={styles.row}>
      <Text style={styles.label}>Metric units</Text>
      <Switch value={metric} onValueChange={setMetric} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16 },
  label: { fontSize: 17 },
});
