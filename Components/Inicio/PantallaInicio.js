import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Asegúrate de instalar react-native-vector-icons si no lo tienes

const { width, height } = Dimensions.get('window');

export default function PantallaInicio() {
  const slides = [
    {
      id: 1,
      image: require('../../Imagen/Ida.jpg'),  
      title: 'Pasaje de ida',
    },
    {
      id: 2,
      image: require('../../Imagen/Vuelta.jpg'), 
      title: 'Pasaje de vuelta',
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef(null);

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % slides.length;
    setCurrentIndex(nextIndex);
    scrollViewRef.current.scrollTo({ x: nextIndex * width, animated: true });
  };

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
    setCurrentIndex(prevIndex);
    scrollViewRef.current.scrollTo({ x: prevIndex * width, animated: true });
  };

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / width);
    setCurrentIndex(index);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        ref={scrollViewRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
      >
        {slides.map((slide) => (
          <View
            key={slide.id}
            style={[styles.slide, { width: width }]}
          >
            <Image source={slide.image} style={styles.image} />
            <Text style={styles.title}>{slide.title}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.controls}>
        <TouchableOpacity style={styles.controlButton} onPress={handlePrev} disabled={currentIndex === 0}>
          <Ionicons name="chevron-back-outline" size={30} color="#007bff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton} onPress={handleNext} disabled={currentIndex === slides.length - 1}>
          <Ionicons name="chevron-forward-outline" size={30} color="#007bff" />
        </TouchableOpacity>
      </View>

      {/* Título del hotel */}
      <Text style={styles.hotelTitle}>Hotel en el que se hospeda:</Text>
      <View style={styles.card}>
        <Image source={require('../../Imagen/Hotel.jpg')} style={styles.hotelImage} />
        <View style={styles.cardInfoContainer}>
          <Text style={styles.cardTitle}>Hotel Paradise</Text>
          <Text style={styles.cardInfo}>Dirección: Av. Siempre Viva 123</Text>
          <Text style={styles.cardInfo}>Teléfono: (123) 456-7890</Text>
          <Text style={styles.cardInfo}>Precio: $100 por noche</Text>
          <Text style={styles.cardInfo}>Check-in: 14:00</Text>
          <Text style={styles.cardInfo}>Check-out: 11:00</Text>
        </View>
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
  scrollView: {
    flex: 1,
    width: width,  
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width * 0.85,
    height: height * 0.5,
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
    marginTop: -50,
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    justifyContent: 'center',
  },
  controlButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Color de fondo suave
    borderRadius: 20,
    padding: 10,
    marginHorizontal: 5, // Espaciado entre botones
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  hotelTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 15,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginTop: 20,
    width: width * 0.9,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  hotelImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 15,
  },
  cardInfoContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardInfo: {
    fontSize: 16,
    marginBottom: 5,
  },
});
