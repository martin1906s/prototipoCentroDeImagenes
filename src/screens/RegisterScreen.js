import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { COLORS, FONT_SIZES, FONT_WEIGHTS, SPACING, CONTAINER_SPACING, BORDER_RADIUS, SHADOWS } from '../utils/constants';

const RegisterScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dni: '',
    city: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleRegister = async () => {
    // Validaciones
    if (!formData.name || !formData.email || !formData.phone || !formData.dni || !formData.city || !formData.password) {
      Alert.alert('Error', 'Por favor completa todos los campos obligatorios');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    if (formData.password.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setIsLoading(true);
    const result = await register(formData);
    setIsLoading(false);

    if (result.success) {
      Alert.alert('Éxito', 'Cuenta creada exitosamente');
      // La navegación se maneja automáticamente por el AuthContext
    } else {
      Alert.alert('Error', result.error);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={COLORS.gradientSecondary}
        style={styles.backgroundGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <KeyboardAvoidingView 
          style={styles.keyboardContainer} 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
            {/* Header con logo y título */}
            <View style={styles.header}>
              <View style={styles.logoContainer}>
                <LinearGradient
                  colors={[COLORS.white, COLORS.gray[100]]}
                  style={styles.logoCircle}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Ionicons name="person-add" size={32} color={COLORS.secondary} />
                </LinearGradient>
              </View>
              <Text style={styles.title}>Centro Imagen</Text>
              <Text style={styles.subtitle}>Crear nueva cuenta</Text>
              <View style={styles.subtitleAccent} />
            </View>

            {/* Formulario de registro */}
            <View style={styles.formContainer}>
              <Text style={styles.formTitle}>Registro de Usuario</Text>
              <Text style={styles.formSubtitle}>Completa tus datos para crear tu cuenta</Text>
              
              <View style={styles.inputContainer}>
                <View style={styles.inputLabelContainer}>
                  <Ionicons name="person-outline" size={16} color={COLORS.secondary} />
                  <Text style={styles.label}>Nombre completo *</Text>
                </View>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.input}
                    placeholder="Tu nombre completo"
                    placeholderTextColor={COLORS.gray[400]}
                    value={formData.name}
                    onChangeText={(value) => handleInputChange('name', value)}
                  />
                </View>
              </View>

              <View style={styles.inputContainer}>
                <View style={styles.inputLabelContainer}>
                  <Ionicons name="mail-outline" size={16} color={COLORS.secondary} />
                  <Text style={styles.label}>Correo electrónico *</Text>
                </View>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.input}
                    placeholder="tu@email.com"
                    placeholderTextColor={COLORS.gray[400]}
                    value={formData.email}
                    onChangeText={(value) => handleInputChange('email', value)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>
              </View>

              <View style={styles.row}>
                <View style={[styles.inputContainer, styles.halfWidth]}>
                  <View style={styles.inputLabelContainer}>
                    <Ionicons name="call-outline" size={16} color={COLORS.secondary} />
                    <Text style={styles.label}>Teléfono *</Text>
                  </View>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      style={styles.input}
                      placeholder="0999999999"
                      placeholderTextColor={COLORS.gray[400]}
                      value={formData.phone}
                      onChangeText={(value) => handleInputChange('phone', value)}
                      keyboardType="phone-pad"
                    />
                  </View>
                </View>

                <View style={[styles.inputContainer, styles.halfWidth]}>
                  <View style={styles.inputLabelContainer}>
                    <Ionicons name="card-outline" size={16} color={COLORS.secondary} />
                    <Text style={styles.label}>Cédula *</Text>
                  </View>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      style={styles.input}
                      placeholder="1720000000"
                      placeholderTextColor={COLORS.gray[400]}
                      value={formData.dni}
                      onChangeText={(value) => handleInputChange('dni', value)}
                      keyboardType="numeric"
                    />
                  </View>
                </View>
              </View>

              <View style={styles.inputContainer}>
                <View style={styles.inputLabelContainer}>
                  <Ionicons name="location-outline" size={16} color={COLORS.secondary} />
                  <Text style={styles.label}>Ciudad *</Text>
                </View>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.input}
                    placeholder="Quito, Guayaquil, Cuenca..."
                    placeholderTextColor={COLORS.gray[400]}
                    value={formData.city}
                    onChangeText={(value) => handleInputChange('city', value)}
                  />
                </View>
              </View>

              <View style={styles.row}>
                <View style={[styles.inputContainer, styles.halfWidth]}>
                  <View style={styles.inputLabelContainer}>
                    <Ionicons name="lock-closed-outline" size={16} color={COLORS.secondary} />
                    <Text style={styles.label}>Contraseña *</Text>
                  </View>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      style={styles.input}
                      placeholder="Mínimo 6 caracteres"
                      placeholderTextColor={COLORS.gray[400]}
                      value={formData.password}
                      onChangeText={(value) => handleInputChange('password', value)}
                      secureTextEntry
                    />
                  </View>
                </View>

                <View style={[styles.inputContainer, styles.halfWidth]}>
                  <View style={styles.inputLabelContainer}>
                    <Ionicons name="checkmark-circle-outline" size={16} color={COLORS.secondary} />
                    <Text style={styles.label}>Confirmar contraseña *</Text>
                  </View>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      style={styles.input}
                      placeholder="Repite tu contraseña"
                      placeholderTextColor={COLORS.gray[400]}
                      value={formData.confirmPassword}
                      onChangeText={(value) => handleInputChange('confirmPassword', value)}
                      secureTextEntry
                    />
                  </View>
                </View>
              </View>

              <TouchableOpacity 
                style={[styles.registerButton, isLoading && styles.registerButtonDisabled]}
                onPress={handleRegister}
                disabled={isLoading}
              >
                <LinearGradient
                  colors={isLoading ? [COLORS.gray[400], COLORS.gray[500]] : COLORS.gradientAccent}
                  style={styles.registerButtonGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Ionicons name="person-add-outline" size={20} color={COLORS.white} />
                  <Text style={styles.registerButtonText}>
                    {isLoading ? 'Creando cuenta...' : 'Crear Cuenta'}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              <View style={styles.loginContainer}>
                <Text style={styles.loginText}>¿Ya tienes cuenta? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <Text style={styles.loginLink}>Inicia sesión aquí</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundGradient: {
    flex: 1,
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: CONTAINER_SPACING.screen,
    paddingTop: SPACING['5xl'],
    paddingBottom: SPACING['4xl'],
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING['4xl'],
  },
  logoContainer: {
    marginBottom: SPACING['2xl'],
  },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.xl,
  },
  title: {
    fontSize: FONT_SIZES['4xl'],
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.white,
    marginBottom: SPACING.sm,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: FONT_SIZES.lg,
    color: COLORS.white,
    textAlign: 'center',
    opacity: 0.9,
    marginBottom: SPACING.md,
  },
  subtitleAccent: {
    width: 60,
    height: 4,
    backgroundColor: COLORS.accent,
    borderRadius: 2,
    marginTop: SPACING.sm,
  },
  formContainer: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS['3xl'],
    padding: CONTAINER_SPACING.card,
    ...SHADOWS.xl,
    marginHorizontal: SPACING.sm,
  },
  formTitle: {
    fontSize: FONT_SIZES['2xl'],
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.gray[800],
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  formSubtitle: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.gray[500],
    textAlign: 'center',
    marginBottom: SPACING['3xl'],
  },
  inputContainer: {
    marginBottom: SPACING['2xl'],
  },
  inputLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  label: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.gray[700],
    marginLeft: SPACING.sm,
  },
  inputWrapper: {
    position: 'relative',
  },
  input: {
    borderWidth: 2,
    borderColor: COLORS.gray[200],
    borderRadius: BORDER_RADIUS.xl,
    padding: CONTAINER_SPACING.input,
    fontSize: FONT_SIZES.base,
    backgroundColor: COLORS.white,
    color: COLORS.gray[800],
    ...SHADOWS.sm,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SPACING.lg,
  },
  halfWidth: {
    flex: 1,
  },
  registerButton: {
    borderRadius: BORDER_RADIUS.xl,
    marginTop: SPACING.md,
    marginBottom: SPACING['2xl'],
    overflow: 'hidden',
  },
  registerButtonDisabled: {
    opacity: 0.6,
  },
  registerButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: CONTAINER_SPACING.button,
    gap: SPACING.sm,
  },
  registerButtonText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.semibold,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.gray[500],
  },
  loginLink: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.secondary,
    fontWeight: FONT_WEIGHTS.semibold,
  },
});

export default RegisterScreen;
