import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PantallaPerfilDetalle  ({ route })  {
  const { nombre, telefono } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalles del Perfil</Text>
      <Text>Nombre: {nombre}</Text>
      <Text>Teléfono: {telefono}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#99ccff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

