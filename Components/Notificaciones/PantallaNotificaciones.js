import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function ContactosApp() {
  const [contactos, setContactos] = useState([]);
  const [nuevoContacto, setNuevoContacto] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    emergencia: false,
  });
  const [formVisible, setFormVisible] = useState(false);
  const navigation = useNavigation(); 

  useEffect(() => {
    const cargarContactos = async () => {
      try {
        const contactosGuardados = await AsyncStorage.getItem('contactos');
        if (contactosGuardados) {
          setContactos(JSON.parse(contactosGuardados));
        }
      } catch (error) {
        console.log("Error cargando contactos", error);
      }
    };
    cargarContactos();
  }, []);

  const guardarContactos = async (contactosActualizados) => {
    try {
      await AsyncStorage.setItem('contactos', JSON.stringify(contactosActualizados));
    } catch (error) {
      console.log("Error guardando contactos", error);
    }
  };

  const validarTelefono = (telefono) => {
    const regexTelefono = /^[0-9]{7,15}$/;
    return regexTelefono.test(telefono);
  };

  const agregarContacto = () => {
    if (
      !nuevoContacto.nombre.trim() ||
      !nuevoContacto.apellido.trim() ||
      !nuevoContacto.telefono.trim()
    ) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    if (!validarTelefono(nuevoContacto.telefono)) {
      Alert.alert('Error', 'Número de teléfono inválido. Debe contener entre 7 y 15 dígitos.');
      return;
    }

    const nuevosContactos = [
      ...contactos,
      { ...nuevoContacto, id: (contactos.length + 1).toString() },
    ];

    setContactos(nuevosContactos);
    guardarContactos(nuevosContactos);
    setNuevoContacto({ nombre: '', apellido: '', telefono: '', emergencia: false });
    setFormVisible(false);
  };

  const eliminarContacto = (id) => {
    const contactosActualizados = contactos.filter(contacto => contacto.id !== id);
    setContactos(contactosActualizados);
    guardarContactos(contactosActualizados);
  };

  return (
    <View style={styles.container}>
      <Button
        title="Contactos de Emergencia"
        onPress={() => navigation.navigate('PantallaNotificacionesDetalle', { contactos })}
      />

      <FlatList
        data={contactos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.contactCard}>
            <View>
              <Text style={styles.contactText}>{item.nombre} {item.apellido}</Text>
              <Text style={styles.contactText}>{item.telefono}</Text>
              {item.emergencia && <Text>📞 Contacto de Emergencia</Text>}
            </View>
            <TouchableOpacity onPress={() => eliminarContacto(item.id)}>
              <Text style={styles.deleteButtonText}>🗑️</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {formVisible && (
        <View style={styles.formContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={() => setFormVisible(false)}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>

          <Text style={styles.formTitle}>Agregar Contacto</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={nuevoContacto.nombre}
            onChangeText={(text) => setNuevoContacto({ ...nuevoContacto, nombre: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Apellido"
            value={nuevoContacto.apellido}
            onChangeText={(text) => setNuevoContacto({ ...nuevoContacto, apellido: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Teléfono"
            value={nuevoContacto.telefono}
            keyboardType="numeric"
            onChangeText={(text) => setNuevoContacto({ ...nuevoContacto, telefono: text })}
          />
          <View style={styles.checkboxContainer}>
            <TouchableOpacity onPress={() => setNuevoContacto({ ...nuevoContacto, emergencia: !nuevoContacto.emergencia })}>
              <Text>{nuevoContacto.emergencia ? '☑' : '☐'}</Text>
            </TouchableOpacity>
            <Text style={styles.checkboxLabel}>¿Es contacto de emergencia?</Text>
          </View>
          <TouchableOpacity style={styles.saveButton} onPress={agregarContacto}>
            <Text style={styles.saveButtonText}>Agregar Contacto</Text>
          </TouchableOpacity>
        </View>
      )}

      {!formVisible && (
        <TouchableOpacity style={styles.addButton} onPress={() => setFormVisible(true)}>
          <Text style={{ fontSize: 40 }}>+</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  contactCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contactText: {
    fontSize: 18,
  },
  deleteButtonText: {
    fontSize: 24,
    color: 'red',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    zIndex: 10,
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  formTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxLabel: {
    marginLeft: 10,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
  },
  closeButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
