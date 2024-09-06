import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import PantallaInicio from '././Components/Inicio/PantallaInicio.js';
import PantallaBuscar from '././Components/Buscar/PantallaBuscar.js';
import PantallaBuscarDetalle from '././Components/Buscar/BuscarDetalle.js';
import PantallaNotificaciones from '././Components/Notificaciones/PantallaNotificaciones.js';
import PantallaClima from './Components/Clima/PantallaClima.js'; // Cambiado a PantallaClima

import PantallaNotificacionesDetalle from '././Components/Notificaciones/PantallaNotificacionesDetalle.js';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const StackNavigator = (initialScreen, detailScreen) => (
  <Stack.Navigator>
    <Stack.Screen 
      name={initialScreen.name} 
      component={initialScreen.component} 
      options={{ headerShown: false }} 
    />
    {detailScreen && (
      <Stack.Screen 
        name={detailScreen.name} 
        component={detailScreen.component} 
      />
    )}
  </Stack.Navigator>
);

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Notificaciones':
              iconName = 'notifications-outline';
              break;
            case 'Inicio':
              iconName = 'home-outline';
              break;
            case 'Buscar':
              iconName = 'search-outline';
              break;
            case 'Clima': // Cambiado a Clima
              iconName = 'thermometer-outline'; // Icono cambiado para clima
              break;
            default:
              iconName = 'home-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen 
        name="Notificaciones" 
        component={() => StackNavigator({ name: 'Notificaciones', component: PantallaNotificaciones }, { name: 'PantallaNotificacionesDetalle', component: PantallaNotificacionesDetalle })} 
      />
      <Tab.Screen 
        name="Inicio" 
        component={() => StackNavigator({ name: 'Inicio', component: PantallaInicio }, { name: 'PantallaInicio', component: PantallaInicio })} 
      />
      <Tab.Screen 
        name="Buscar" 
        component={() => StackNavigator({ name: 'Buscar', component: PantallaBuscar }, { name: 'DetalleBuscar', component: PantallaBuscarDetalle })} 
      />
      <Tab.Screen 
        name="Clima" // Nombre de la pestaña cambiado a Clima
        component={() => StackNavigator({ name: 'Clima', component: PantallaClima })} // Eliminado PantallaPerfilDetalle
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}
