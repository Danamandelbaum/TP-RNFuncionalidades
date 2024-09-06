import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, Animated } from 'react-native';

// Dimensiones de la pantalla
const { width } = Dimensions.get('window');

export default function PantallaInicio() {
  // Datos para el carrusel
  const slides = [
    {
      id: 1,
      image: '../Imagen/Ida.jpg',  // Cambiar a require para imágenes locales
      title: 'Pasaje de ida',
    },
    {
      id: 2,
      image: '../Imagen/Vuelta.jpg',  // Cambiar a require para imágenes locales
      title: 'Pasaje de vuelta',
    }
  ];

  // Estado para el índice del slide actual
  const [currentIndex, setCurrentIndex] = useState(0);

  // Variable de animación para el deslizamiento
  const slideAnim = useRef(new Animated.Value(0)).current;

  // Función para manejar la transición y el cambio de imagen
  const changeSlide = (nextIndex) => {
    const direction = nextIndex > currentIndex ? 1 : -1;

    // Animar la traslación fuera de la pantalla
    Animated.timing(slideAnim, {
      toValue: direction * -width,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setCurrentIndex(nextIndex);

      // Reiniciar la posición del slide y deslizamiento hacia la nueva imagen
      slideAnim.setValue(direction * width);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    });
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % slides.length;
    changeSlide(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
    changeSlide(prevIndex);
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.slide, { transform: [{ translateX: slideAnim }] }]}>
        <Image source={slides[currentIndex].image} style={styles.image} />
        <Text style={styles.title}>{slides[currentIndex].title}</Text>
      </Animated.View>
      <View style={styles.controls}>
        <TouchableOpacity style={styles.controlButton} onPress={handlePrev}>
          <Text style={styles.controlText}>{'<'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton} onPress={handleNext}>
          <Text style={styles.controlText}>{'>'}</Text>
        </TouchableOpacity>
      </View>
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
  slide: {
    width: width,  // Tomar todo el ancho de la pantalla
    height: width * 0.6,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 0, // Eliminar padding lateral
  },
  image: {
    width: width * 0.8, // Ajustar el tamaño de la imagen para que no tome todo el ancho
    height: width * 0.4,
    resizeMode: 'contain',
  },
  title: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  controls: {
    flexDirection: 'row',
    marginTop: 20,
  },
  controlButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 20,
    margin: 10,
  },
  controlText: {
    color: '#fff',
    fontSize: 18,
  },
});
