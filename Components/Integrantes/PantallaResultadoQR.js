import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PantallaResultadoQR({ route }) {
  const { qrValue } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Integrantes</Text>
      <Text style={styles.qrValue}>{qrValue}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  qrValue: {
    fontSize: 18,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});
