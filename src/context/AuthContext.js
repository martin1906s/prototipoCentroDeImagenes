import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Error al verificar estado de autenticación:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      // Simulación de login - en producción esto sería una llamada a la API
      const mockUsers = [
        {
          id: '1',
          email: 'admin@centroimagen.com',
          password: 'admin123',
          name: 'Administrador',
          role: 'admin',
          phone: '0999999999',
          city: 'Quito'
        },
        {
          id: '2',
          email: 'usuario@test.com',
          password: 'user123',
          name: 'Juan Pérez',
          role: 'user',
          phone: '0987654321',
          city: 'Quito',
          dni: '1720000000'
        }
      ];

      const user = mockUsers.find(u => u.email === email && u.password === password);
      
      if (user) {
        const userData = { ...user };
        delete userData.password; // No guardar la contraseña
        await AsyncStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        return { success: true, user: userData };
      } else {
        return { success: false, error: 'Credenciales inválidas' };
      }
    } catch (error) {
      console.error('Error en login:', error);
      return { success: false, error: 'Error al iniciar sesión' };
    }
  };

  const register = async (userData) => {
    try {
      // Simulación de registro - en producción esto sería una llamada a la API
      const newUser = {
        id: Date.now().toString(),
        ...userData,
        role: 'user'
      };
      
      delete newUser.password; // No guardar la contraseña
      await AsyncStorage.setItem('user', JSON.stringify(newUser));
      setUser(newUser);
      return { success: true, user: newUser };
    } catch (error) {
      console.error('Error en registro:', error);
      return { success: false, error: 'Error al registrar usuario' };
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      setUser(null);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const value = {
    user,
    login,
    register,
    logout,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
