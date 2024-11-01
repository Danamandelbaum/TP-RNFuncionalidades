import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, Alert, Vibration, KeyboardAvoidingView, ScrollView, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const mostrarError = (titulo, mensaje) => {
  Vibration.vibrate(500);
  Alert.alert(
    titulo,
    mensaje,
    [{ text: 'OK' }]
  );
};

export default function PantallaNotificaciones() {
  const navigation = useNavigation();

  const contactosPorDefecto = [
    { id: '1', nombre: 'Juan', apellido: 'Pérez', telefono: '1234567', emergencia: true },
    { id: '2', nombre: 'María', apellido: 'Gómez', telefono: '7654321', emergencia: false },
  ];

  const [contactos, setContactos] = useState(contactosPorDefecto);
  const [nuevoContacto, setNuevoContacto] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    emergencia: false,
  });
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    const cargarContactos = async () => {
      try {
        const contactosGuardados = await AsyncStorage.getItem('contactos');
        if (contactosGuardados) {
          setContactos(JSON.parse(contactosGuardados));
        }
      } catch (error) {
        mostrarError('Error', 'Error cargando contactos');
        console.log("Error cargando contactos", error);
      }
    };
    cargarContactos();
  }, []);

  const guardarContactos = async (contactosActualizados) => {
    try {
      await AsyncStorage.setItem('contactos', JSON.stringify(contactosActualizados));
    } catch (error) {
      mostrarError('Error', 'Error guardando contactos');
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
      mostrarError('Error', 'Todos los campos son obligatorios');
      return;
    }

    if (!validarTelefono(nuevoContacto.telefono)) {
      mostrarError('Error', 'Número de teléfono inválido. Debe contener entre 7 y 15 dígitos, solo números.');
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
        onPress={() => navigation.navigate('DetalleNotificaciones', { contactos })}
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
        <KeyboardAvoidingView behavior="padding" style={styles.keyboardView}>
          <ScrollView contentContainerStyle={styles.scrollView}>
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
                onSubmitEditing={() => Keyboard.dismiss()} 
                returnKeyType="done" 
              />
              <TextInput
                style={styles.input}
                placeholder="Apellido"
                value={nuevoContacto.apellido}
                onChangeText={(text) => setNuevoContacto({ ...nuevoContacto, apellido: text })}
                onSubmitEditing={() => Keyboard.dismiss()} 
                returnKeyType="done" 
              />
              <TextInput
                style={styles.input}
                placeholder="Teléfono"
                value={nuevoContacto.telefono}
                keyboardType="numeric"
                onChangeText={(text) => setNuevoContacto({ ...nuevoContacto, telefono: text })}
                onSubmitEditing={() => Keyboard.dismiss()} 
                returnKeyType="done" 
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
          </ScrollView>
        </KeyboardAvoidingView>
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
    backgroundColor: '#f7f9fc',
    padding: 20,
  },
  contactCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  contactText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
  },
  deleteButtonText: {
    fontSize: 24,
    color: '#ff4757',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    zIndex: 10,
    backgroundColor: '#007bff',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    marginTop: 20,
  },
  formTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#007bff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
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
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  closeButtonText: {
    fontSize: 24,
    color: '#ff4757',
  },
  keyboardView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  scrollView: {
    paddingBottom: 20,
  },
});
