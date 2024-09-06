import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';

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
        setLoading(false);
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);

      if (loc) {
        obtenerClima(loc.coords.latitude, loc.coords.longitude);
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
        console.error('Error obteniendo el clima:', error);
      } finally {
        setLoading(false);
      }
    };

    // Actualiza la hora cada segundo
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    obtenerUbicacion();

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.dateTime}>
        {dateTime.toLocaleDateString()} - {dateTime.toLocaleTimeString()}
      </Text>
      {location ? (
        <>
          <Text style={styles.text}>
            Ubicación: Latitud {location.latitude}, Longitud {location.longitude}
          </Text>
          <Text style={styles.text}>
            Temperatura actual: {temperature !== null ? `${temperature}°C` : 'Cargando...'}
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
    backgroundColor: '#f5f5f5',
  },
  dateTime: {
    fontSize: 24,
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
  },
  errorText: {
    color: 'red',
    fontSize: 18,
  },
});
