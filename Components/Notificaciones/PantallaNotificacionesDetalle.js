import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function PantallaNotificacionesDetalle({ route }) {
  const { contactos } = route.params; 
  const navigation = useNavigation();

  const contactosEmergencia = contactos.filter(contacto => contacto.emergencia);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contactos de Emergencia</Text>

      <FlatList
        data={contactosEmergencia}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.contactCard}>
            <Text style={styles.contactName}>{item.nombre} {item.apellido}</Text>
            <Text style={styles.contactPhone}>{item.telefono}</Text>
            <Text style={styles.emergencyText}>📞 Contacto de Emergencia</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  contactCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  contactPhone: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  emergencyText: {
    fontSize: 14,
    color: '#d9534f', // Rojo para destacar que es de emergencia
    fontStyle: 'italic',
  },
});
