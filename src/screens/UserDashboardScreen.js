import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  RefreshControl
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { COLORS, FONT_SIZES, FONT_WEIGHTS, SPACING, CONTAINER_SPACING, BORDER_RADIUS, SHADOWS } from '../utils/constants';

const UserDashboardScreen = ({ navigation }) => {
  const { user, logout } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [stats, setStats] = useState({
    totalAppointments: 0,
    pendingResults: 0,
    completedServices: 0
  });

  const [recentAppointments, setRecentAppointments] = useState([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    // Simulación de datos - en producción esto vendría de una API
    setStats({
      totalAppointments: 5,
      pendingResults: 2,
      completedServices: 3
    });

    setRecentAppointments([
      {
        id: '1',
        service: 'Radiografía de Tórax',
        date: '2024-01-15',
        time: '10:00',
        status: 'completed',
        center: 'Centro Imagen Quito'
      },
      {
        id: '2',
        service: 'Ecografía Abdominal',
        date: '2024-01-20',
        time: '14:30',
        status: 'pending',
        center: 'Centro Imagen Quito'
      },
      {
        id: '3',
        service: 'Mamografía',
        date: '2024-01-25',
        time: '09:15',
        status: 'scheduled',
        center: 'Centro Imagen Quito'
      }
    ]);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadDashboardData();
    setRefreshing(false);
  };

  const handleLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro de que quieres cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Cerrar Sesión', onPress: logout }
      ]
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return COLORS.success;
      case 'pending': return COLORS.warning;
      case 'scheduled': return COLORS.info;
      default: return COLORS.gray[500];
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return 'Completado';
      case 'pending': return 'Pendiente';
      case 'scheduled': return 'Programado';
      default: return 'Desconocido';
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={COLORS.gradientPrimary}
        style={styles.headerGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.welcomeText}>¡Hola, {user?.name}! 👋</Text>
            <Text style={styles.subtitle}>Bienvenido a Centro Imagen</Text>
          </View>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <LinearGradient
              colors={[COLORS.danger, COLORS.dangerDark]}
              style={styles.logoutButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Ionicons name="log-out-outline" size={20} color={COLORS.white} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView 
        style={styles.scrollContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Estadísticas */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <LinearGradient
              colors={[COLORS.primary, COLORS.primaryDark]}
              style={styles.statCardGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.statIcon}>
                <Ionicons name="calendar-outline" size={24} color={COLORS.white} />
              </View>
              <Text style={styles.statNumber}>{stats.totalAppointments}</Text>
              <Text style={styles.statLabel}>Citas Totales</Text>
            </LinearGradient>
          </View>

          <View style={styles.statCard}>
            <LinearGradient
              colors={[COLORS.warning, COLORS.warningDark]}
              style={styles.statCardGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.statIcon}>
                <Ionicons name="time-outline" size={24} color={COLORS.white} />
              </View>
              <Text style={styles.statNumber}>{stats.pendingResults}</Text>
              <Text style={styles.statLabel}>Resultados Pendientes</Text>
            </LinearGradient>
          </View>

          <View style={styles.statCard}>
            <LinearGradient
              colors={[COLORS.success, COLORS.successDark]}
              style={styles.statCardGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.statIcon}>
                <Ionicons name="checkmark-circle-outline" size={24} color={COLORS.white} />
              </View>
              <Text style={styles.statNumber}>{stats.completedServices}</Text>
              <Text style={styles.statLabel}>Servicios Completados</Text>
            </LinearGradient>
          </View>
        </View>

        {/* Acciones rápidas */}
        <View style={styles.quickActionsContainer}>
          <Text style={styles.sectionTitle}>Acciones Rápidas</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity 
              style={styles.quickActionButton}
              onPress={() => navigation.navigate('Citas')}
            >
              <LinearGradient
                colors={COLORS.gradientSecondary}
                style={styles.quickActionGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Ionicons name="calendar" size={24} color={COLORS.white} />
                <Text style={styles.quickActionText}>Agendar Cita</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.quickActionButton}
              onPress={() => navigation.navigate('Resultados')}
            >
              <LinearGradient
                colors={COLORS.gradientAccent}
                style={styles.quickActionGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Ionicons name="document-text" size={24} color={COLORS.white} />
                <Text style={styles.quickActionText}>Ver Resultados</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.quickActionButton}
              onPress={() => navigation.navigate('Productos')}
            >
              <LinearGradient
                colors={[COLORS.secondary, COLORS.secondaryDark]}
                style={styles.quickActionGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Ionicons name="medical" size={24} color={COLORS.white} />
                <Text style={styles.quickActionText}>Productos</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.quickActionButton}
              onPress={() => navigation.navigate('Centros')}
            >
              <LinearGradient
                colors={[COLORS.accent, COLORS.accentDark]}
                style={styles.quickActionGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Ionicons name="location" size={24} color={COLORS.white} />
                <Text style={styles.quickActionText}>Centros</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        {/* Citas recientes */}
        <View style={styles.recentContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Citas Recientes</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Citas')}>
              <Text style={styles.seeAllText}>Ver todas</Text>
            </TouchableOpacity>
          </View>

          {recentAppointments.map((appointment) => (
            <View key={appointment.id} style={styles.appointmentCard}>
              <View style={styles.appointmentHeader}>
                <Text style={styles.appointmentService}>{appointment.service}</Text>
                <LinearGradient
                  colors={[getStatusColor(appointment.status), getStatusColor(appointment.status)]}
                  style={styles.statusBadge}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Text style={styles.statusText}>{getStatusText(appointment.status)}</Text>
                </LinearGradient>
              </View>
              
              <View style={styles.appointmentDetails}>
                <View style={styles.appointmentDetail}>
                  <Ionicons name="calendar-outline" size={16} color={COLORS.primary} />
                  <Text style={styles.appointmentDetailText}>{appointment.date}</Text>
                </View>
                <View style={styles.appointmentDetail}>
                  <Ionicons name="time-outline" size={16} color={COLORS.warning} />
                  <Text style={styles.appointmentDetailText}>{appointment.time}</Text>
                </View>
                <View style={styles.appointmentDetail}>
                  <Ionicons name="location-outline" size={16} color={COLORS.accent} />
                  <Text style={styles.appointmentDetailText}>{appointment.center}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.gray[50],
  },
  headerGradient: {
    paddingTop: SPACING['5xl'],
    paddingBottom: SPACING['2xl'],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: CONTAINER_SPACING.screen,
  },
  headerContent: {
    flex: 1,
  },
  welcomeText: {
    fontSize: FONT_SIZES['2xl'],
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.white,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: FONT_SIZES.base,
    color: COLORS.white,
    marginTop: SPACING.xs,
    opacity: 0.9,
  },
  logoutButton: {
    borderRadius: BORDER_RADIUS.lg,
    overflow: 'hidden',
  },
  logoutButtonGradient: {
    padding: SPACING.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContainer: {
    flex: 1,
    marginTop: -SPACING['2xl'],
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: CONTAINER_SPACING.screen,
    paddingBottom: SPACING['2xl'],
    gap: SPACING.lg,
  },
  statCard: {
    flex: 1,
    borderRadius: BORDER_RADIUS.xl,
    overflow: 'hidden',
    ...SHADOWS.lg,
  },
  statCardGradient: {
    padding: CONTAINER_SPACING.card,
    alignItems: 'center',
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  statNumber: {
    fontSize: FONT_SIZES['2xl'],
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.white,
    marginBottom: SPACING.xs,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  statLabel: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.white,
    textAlign: 'center',
    opacity: 0.9,
  },
  quickActionsContainer: {
    paddingHorizontal: CONTAINER_SPACING.screen,
    paddingBottom: SPACING['2xl'],
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.gray[800],
    marginBottom: SPACING['2xl'],
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.lg,
  },
  quickActionButton: {
    width: '48%',
    borderRadius: BORDER_RADIUS.xl,
    overflow: 'hidden',
    ...SHADOWS.md,
  },
  quickActionGradient: {
    padding: CONTAINER_SPACING.button,
    alignItems: 'center',
    gap: SPACING.sm,
  },
  quickActionText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.white,
    textAlign: 'center',
  },
  recentContainer: {
    paddingHorizontal: CONTAINER_SPACING.screen,
    paddingBottom: SPACING['5xl'],
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING['2xl'],
  },
  seeAllText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.primary,
    fontWeight: FONT_WEIGHTS.semibold,
  },
  appointmentCard: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.xl,
    padding: CONTAINER_SPACING.card,
    marginBottom: SPACING.lg,
    ...SHADOWS.md,
  },
  appointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  appointmentService: {
    fontSize: FONT_SIZES.base,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.gray[800],
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.lg,
  },
  statusText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.white,
    fontWeight: FONT_WEIGHTS.semibold,
  },
  appointmentDetails: {
    gap: SPACING.md,
  },
  appointmentDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  appointmentDetailText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.gray[600],
  },
});

export default UserDashboardScreen;
