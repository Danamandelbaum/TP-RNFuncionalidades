import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ScrollView } from 'react-native';


const { width, height } = Dimensions.get('window');

export default function PantallaInicio() {
  const slides = [
    {
      id: 1,
      image: ('../Imagen/Ida.jpg'),  
      title: 'Pasaje de ida',
    },
    {
      id: 2,
      image: ('../Imagen/Vuelta.jpg'),  
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
  scrollView: {
    flex: 1,
    width: width,  
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width * 0.9, 
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
