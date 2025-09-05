import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

// Importar pantallas
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import UserDashboardScreen from './src/screens/UserDashboardScreen';
import AppointmentScreen from './src/screens/AppointmentScreen';
import ResultsScreen from './src/screens/ResultsScreen';
import ProductsScreen from './src/screens/ProductsScreen';
import MedicalCentersScreen from './src/screens/MedicalCentersScreen';
import AdminDashboardScreen from './src/screens/AdminDashboardScreen';
import AdminUsersScreen from './src/screens/AdminUsersScreen';
import AdminResultsScreen from './src/screens/AdminResultsScreen';

// Importar contexto de autenticación
import { AuthProvider, useAuth } from './src/context/AuthContext';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Navegación principal de usuario
function UserTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Citas') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Resultados') {
            iconName = focused ? 'document-text' : 'document-text-outline';
          } else if (route.name === 'Productos') {
            iconName = focused ? 'medical' : 'medical-outline';
          } else if (route.name === 'Centros') {
            iconName = focused ? 'location' : 'location-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4361ee',
        tabBarInactiveTintColor: 'gray',
        headerStyle: {
          backgroundColor: '#4361ee',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={UserDashboardScreen}
        options={{ title: 'Centro Imagen' }}
      />
      <Tab.Screen 
        name="Citas" 
        component={AppointmentScreen}
        options={{ title: 'Mis Citas' }}
      />
      <Tab.Screen 
        name="Resultados" 
        component={ResultsScreen}
        options={{ title: 'Mis Resultados' }}
      />
      <Tab.Screen 
        name="Productos" 
        component={ProductsScreen}
        options={{ title: 'Productos' }}
      />
      <Tab.Screen 
        name="Centros" 
        component={MedicalCentersScreen}
        options={{ title: 'Centros Médicos' }}
      />
    </Tab.Navigator>
  );
}

// Navegación de administrador
function AdminStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#4361ee',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="AdminDashboard" 
        component={AdminDashboardScreen}
        options={{ title: 'Panel de Administración' }}
      />
      <Stack.Screen 
        name="AdminUsers" 
        component={AdminUsersScreen}
        options={{ title: 'Gestión de Usuarios' }}
      />
      <Stack.Screen 
        name="AdminResults" 
        component={AdminResultsScreen}
        options={{ title: 'Cargar Resultados' }}
      />
    </Stack.Navigator>
  );
}

// Navegación principal de la app
function AppNavigator() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return null; // Aquí podrías mostrar un spinner de carga
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          user.role === 'admin' ? (
            <Stack.Screen name="Admin" component={AdminStackNavigator} />
          ) : (
            <Stack.Screen name="User" component={UserTabNavigator} />
          )
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <StatusBar style="light" />
      <AppNavigator />
    </AuthProvider>
  );
}