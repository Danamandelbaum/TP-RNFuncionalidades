import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function PantallaNotificacionesDetalle({ route }) {
  const { contactos } = route.params; 
  const navigation = useNavigation();

  const contactosEmergencia = contactos.filter(contacto => contacto.emergencia);

  return (
    <View style={{ flex: 1, padding: 20 }}>

      <FlatList
        data={contactosEmergencia}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 10 }}>
            <Text>{item.nombre} {item.apellido}</Text>
            <Text>{item.telefono}</Text>
            <Text>📞 Contacto de Emergencia</Text>
          </View>
        )}
      />
    </View>
  );
}
