import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import PantallaInicio from './Components/Inicio/PantallaInicio';
import PantallaNotificaciones from './Components/Notificaciones/PantallaNotificaciones';
import PantallaClima from './Components/Clima/PantallaClima';
import PantallaNotificacionesDetalle from './Components/Notificaciones/PantallaNotificacionesDetalle';
import GeneradorQR from './Components/About/GeneradorQR';

const NotificacionesStack = createStackNavigator();
const InicioStack = createStackNavigator();
const ClimaStack = createStackNavigator();
const AboutStack = createStackNavigator();

function NotificacionesStackScreen() {
  return (
    <NotificacionesStack.Navigator>
      <NotificacionesStack.Screen 
        name="Notificaciones" 
        component={PantallaNotificaciones} 
        options={{ headerShown: false }} 
      />
      <NotificacionesStack.Screen 
        name="PantallaNotificacionesDetalle" 
        component={PantallaNotificacionesDetalle} 
      />
    </NotificacionesStack.Navigator>
  );
}

function InicioStackScreen() {
  return (
    <InicioStack.Navigator>
      <InicioStack.Screen 
        name="Inicio" 
        component={PantallaInicio} 
        options={{ headerShown: false }} 
      />
    </InicioStack.Navigator>
  );
}

function ClimaStackScreen() {
  return (
    <ClimaStack.Navigator>
      <ClimaStack.Screen 
        name="Clima" 
        component={PantallaClima} 
        options={{ headerShown: false }} 
      />
    </ClimaStack.Navigator>
  );
}

function AboutStackScreen() {
  return (
    <AboutStack.Navigator>
      <AboutStack.Screen 
        name="Acerca de" 
        component={GeneradorQR} 
        options={{ headerShown: false }} 
      />
    </AboutStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Notificaciones') {
            iconName = 'notifications-outline';
          } else if (route.name === 'Inicio') {
            iconName = 'home-outline';
          } else if (route.name === 'Clima') {
            iconName = 'thermometer-outline';
          } else if (route.name === 'Acerca de' || route.name === 'Generador QR') {
            iconName = 'information-circle-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Notificaciones" component={NotificacionesStackScreen} />
      <Tab.Screen name="Inicio" component={InicioStackScreen} />
      <Tab.Screen name="Clima" component={ClimaStackScreen} />
      <Tab.Screen name="Acerca de" component={AboutStackScreen} />
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
