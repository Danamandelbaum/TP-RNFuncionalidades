import { Alert, Vibration } from 'react-native';

export const mostrarError = (titulo, mensaje) => {
  Vibration.vibrate(500); 
  Alert.alert(
    titulo,   
    mensaje, 
    [{ text: 'OK' }] 
  );
};
