import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

export default function GeneradorQR() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}> Código QR</Text>
      <View style={styles.qrContainer}>
        <QRCode
          value="Ariana Castro, Dana Mandelbaum y Agustina Potasman"
          size={200}
          color="#2c3e50"
          backgroundColor="#ecf0f1"
        />
      </View>
      <Text style={styles.info}>Escanea este código QR para ver los integrantes.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#34495e',
    marginBottom: 30,
  },
  qrContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    marginBottom: 30,
  },
  info: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
  },
});
