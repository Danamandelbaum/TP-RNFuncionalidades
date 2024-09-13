import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

export default function GeneradorQR() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Generar Código QR</Text>
      <QRCode
        value="Agustina Potasman, Dana Mandelbaum y Ariana Castro"
        size={200}
        color="black"
        backgroundColor="white"
      />
      <Text style={styles.info}>Escanea este código QR para ver los integrantes.</Text>
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
  info: {
    marginVertical: 20,
    fontSize: 16,
  },
});
