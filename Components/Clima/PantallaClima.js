import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';
import { mostrarError } from '../Error/ErrorHelper.js'; 
import { Ionicons } from '@expo/vector-icons';

export default function PantallaClima() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const obtenerUbicacion = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permiso para acceder a la ubicación denegado.');
        mostrarError('Error de Permiso', 'Permiso para acceder a la ubicación denegado.');
        setLoading(false);
        return;
      }

      try {
        let loc = await Location.getCurrentPositionAsync({});
        setLocation(loc.coords);
        obtenerClima(loc.coords.latitude, loc.coords.longitude);
      } catch (error) {
        mostrarError('Error', 'No se pudo obtener la ubicación.');
        setLoading(false);
      }
    };

    const obtenerClima = async (lat, lon) => {
      try {
        const response = await axios.get(`https://api.open-meteo.com/v1/forecast`, {
          params: {
            latitude: lat,
            longitude: lon,
            current_weather: true
          }
        });

        const { temperature } = response.data.current_weather;
        setTemperature(temperature);
      } catch (error) {
        mostrarError('Error', 'Error obteniendo el clima.');
      } finally {
        setLoading(false);
      }
    };

    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    obtenerUbicacion();

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const iconName = 'cloud-outline';

  return (
    <View style={styles.container}>
      {/* Icono */}
      <Ionicons name={iconName} size={80} color="#4a90e2" /> 
      <Text style={styles.dateTime}>
        {dateTime.toLocaleDateString()} - {dateTime.toLocaleTimeString()}
      </Text>
      {location ? (
        <>
          <Text style={styles.text}>
            🌍 Ubicación: Latitud {location.latitude}, Longitud {location.longitude}
          </Text>
          <Text style={styles.text}>
            🌡️ Temperatura actual: {temperature !== null ? `${temperature}°C` : 'Cargando...'}
          </Text>
        </>
      ) : (
        <Text style={styles.errorText}>{errorMsg || 'Obteniendo ubicación...'}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0f7fa',  // Fondo color azul claro
    padding: 20,
  },
  dateTime: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#00796b',  // Texto en un tono verde oscuro
    marginBottom: 20,
  },
  text: {
    fontSize: 20,
    color: '#004d40',  // Color de texto verde más suave
    marginVertical: 10,
    textAlign: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',  // Fondo blanco para el texto
    borderRadius: 10,  // Bordes redondeados
    padding: 10,
    shadowColor: '#000',  // Sombra
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,  // Sombra en Android
  },
  errorText: {
    color: '#e57373',  // Texto de error en rojo
    fontSize: 18,
    marginVertical: 10,
  },
});
