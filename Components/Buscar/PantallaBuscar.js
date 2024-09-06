import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, FlatList } from 'react-native';

const datosBusqueda = [
  { id: '1', resultado: 'Resultado 1: Información sobre el producto A.' },
  { id: '2', resultado: 'Resultado 2: Detalles del servicio B.' },
  { id: '3', resultado: 'Resultado 3: Actualizaciones sobre la oferta C.' },
];

export default function PantallaBuscar  ({ navigation })  {
  const [query, setQuery] = useState('');
  const [resultados, setResultados] = useState([]);

  const handleBuscar = () => {
    const resultadosFiltrados = datosBusqueda.filter((item) =>
      item.resultado.toLowerCase().includes(query.toLowerCase())
    );
    setResultados(resultadosFiltrados);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buscar</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingrese término de búsqueda..."
        value={query}
        onChangeText={setQuery}
      />
      <Button title="Buscar" onPress={handleBuscar} />
      <FlatList
        data={resultados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.resultado}</Text>
            <Button
              title="Ver Detalles"
              onPress={() => navigation.navigate('DetalleBuscar', { resultado: item.resultado })}
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#e0f7fa', // Color de fondo para Pantalla de Buscar
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '100%',
  },
  item: {
    marginBottom: 15,
  },
});
