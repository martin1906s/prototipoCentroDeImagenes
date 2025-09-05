import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Alert,
  RefreshControl
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONT_SIZES, FONT_WEIGHTS, SPACING, CONTAINER_SPACING, BORDER_RADIUS, SHADOWS } from '../utils/constants';

const AdminUsersScreen = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [users, searchQuery]);

  const loadUsers = async () => {
    // Simulación de datos - en producción esto vendría de una API
    setUsers([
      {
        id: '1',
        name: 'María González',
        email: 'maria.gonzalez@email.com',
        phone: '0991234567',
        city: 'Quito',
        dni: '1720000001',
        registrationDate: '2024-01-10',
        totalAppointments: 5,
        lastAppointment: '2024-01-15',
        status: 'active'
      },
      {
        id: '2',
        name: 'Carlos Ruiz',
        email: 'carlos.ruiz@email.com',
        phone: '0987654321',
        city: 'Guayaquil',
        dni: '0920000002',
        registrationDate: '2024-01-08',
        totalAppointments: 3,
        lastAppointment: '2024-01-12',
        status: 'active'
      },
      {
        id: '3',
        name: 'Ana Martínez',
        email: 'ana.martinez@email.com',
        phone: '0976543210',
        city: 'Cuenca',
        dni: '0700000003',
        registrationDate: '2024-01-05',
        totalAppointments: 2,
        lastAppointment: '2024-01-10',
        status: 'inactive'
      },
      {
        id: '4',
        name: 'Luis Pérez',
        email: 'luis.perez@email.com',
        phone: '0965432109',
        city: 'Quito',
        dni: '1720000004',
        registrationDate: '2024-01-12',
        totalAppointments: 1,
        lastAppointment: '2024-01-14',
        status: 'active'
      },
      {
        id: '5',
        name: 'Carmen López',
        email: 'carmen.lopez@email.com',
        phone: '0954321098',
        city: 'Santo Domingo',
        dni: '2300000005',
        registrationDate: '2024-01-15',
        totalAppointments: 0,
        lastAppointment: null,
        status: 'pending'
      }
    ]);
  };

  const filterUsers = () => {
    let filtered = users;

    if (searchQuery) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.phone.includes(searchQuery) ||
        user.dni.includes(searchQuery) ||
        user.city.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredUsers(filtered);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadUsers();
    setRefreshing(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return '#10b981';
      case 'inactive': return '#6b7280';
      case 'pending': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active': return 'Activo';
      case 'inactive': return 'Inactivo';
      case 'pending': return 'Pendiente';
      default: return 'Desconocido';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const handleUserAction = (user, action) => {
    Alert.alert(
      `${action} Usuario`,
      `¿Estás seguro de que quieres ${action.toLowerCase()} a ${user.name}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: action, 
          onPress: () => {
            // Aquí se implementaría la lógica para la acción
            Alert.alert('Éxito', `Usuario ${action.toLowerCase()} exitosamente`);
          }
        }
      ]
    );
  };

  const renderUserCard = ({ item }) => (
    <View style={styles.userCard}>
      <View style={styles.userHeader}>
        <View style={styles.userInfo}>
          <View style={styles.userAvatar}>
            <Text style={styles.userInitials}>
              {item.name.split(' ').map(n => n[0]).join('').toUpperCase()}
            </Text>
          </View>
          <View style={styles.userDetails}>
            <Text style={styles.userName}>{item.name}</Text>
            <Text style={styles.userEmail}>{item.email}</Text>
          </View>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.statusText}>{getStatusText(item.status)}</Text>
        </View>
      </View>

      <View style={styles.userData}>
        <View style={styles.userDataRow}>
          <View style={styles.userDataItem}>
            <Ionicons name="call-outline" size={16} color="#64748b" />
            <Text style={styles.userDataText}>{item.phone}</Text>
          </View>
          <View style={styles.userDataItem}>
            <Ionicons name="location-outline" size={16} color="#64748b" />
            <Text style={styles.userDataText}>{item.city}</Text>
          </View>
        </View>

        <View style={styles.userDataRow}>
          <View style={styles.userDataItem}>
            <Ionicons name="card-outline" size={16} color="#64748b" />
            <Text style={styles.userDataText}>{item.dni}</Text>
          </View>
          <View style={styles.userDataItem}>
            <Ionicons name="calendar-outline" size={16} color="#64748b" />
            <Text style={styles.userDataText}>Reg: {formatDate(item.registrationDate)}</Text>
          </View>
        </View>

        <View style={styles.userStats}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{item.totalAppointments}</Text>
            <Text style={styles.statLabel}>Citas</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{formatDate(item.lastAppointment)}</Text>
            <Text style={styles.statLabel}>Última cita</Text>
          </View>
        </View>
      </View>

      <View style={styles.userActions}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => Alert.alert('Próximamente', 'Ver detalles del usuario')}
        >
          <Ionicons name="eye-outline" size={16} color="#3b82f6" />
          <Text style={styles.actionButtonText}>Ver</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => Alert.alert('Próximamente', 'Editar usuario')}
        >
          <Ionicons name="create-outline" size={16} color="#f59e0b" />
          <Text style={styles.actionButtonText}>Editar</Text>
        </TouchableOpacity>

        {item.status === 'active' ? (
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => handleUserAction(item, 'Desactivar')}
          >
            <Ionicons name="pause-outline" size={16} color="#ef4444" />
            <Text style={styles.actionButtonText}>Desactivar</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => handleUserAction(item, 'Activar')}
          >
            <Ionicons name="play-outline" size={16} color="#10b981" />
            <Text style={styles.actionButtonText}>Activar</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Gestión de Usuarios</Text>
        <Text style={styles.subtitle}>Administra los usuarios registrados en la plataforma</Text>
      </View>

      {/* Barra de búsqueda */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search-outline" size={20} color="#64748b" />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar por nombre, email, teléfono o cédula..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Estadísticas */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{users.length}</Text>
          <Text style={styles.statLabel}>Total Usuarios</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{users.filter(u => u.status === 'active').length}</Text>
          <Text style={styles.statLabel}>Activos</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{users.filter(u => u.status === 'pending').length}</Text>
          <Text style={styles.statLabel}>Pendientes</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{users.reduce((sum, u) => sum + u.totalAppointments, 0)}</Text>
          <Text style={styles.statLabel}>Total Citas</Text>
        </View>
      </View>

      {/* Lista de usuarios */}
      <FlatList
        data={filteredUsers}
        renderItem={renderUserCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.usersList}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.gray[50],
  },
  header: {
    padding: CONTAINER_SPACING.screen,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray[200],
  },
  title: {
    fontSize: FONT_SIZES['2xl'],
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.gray[800],
  },
  subtitle: {
    fontSize: FONT_SIZES.base,
    color: COLORS.gray[500],
    marginTop: SPACING.xs,
  },
  searchContainer: {
    padding: CONTAINER_SPACING.screen,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray[200],
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gray[50],
    borderRadius: BORDER_RADIUS.lg,
    paddingHorizontal: CONTAINER_SPACING.input,
    paddingVertical: CONTAINER_SPACING.input,
    gap: SPACING.md,
  },
  searchInput: {
    flex: 1,
    fontSize: FONT_SIZES.base,
    color: COLORS.gray[800],
  },
  statsContainer: {
    flexDirection: 'row',
    padding: CONTAINER_SPACING.screen,
    gap: SPACING.md,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    padding: CONTAINER_SPACING.card,
    alignItems: 'center',
    ...SHADOWS.md,
  },
  statNumber: {
    fontSize: FONT_SIZES.xl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.gray[800],
    marginBottom: SPACING.xs,
  },
  statLabel: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.gray[500],
    textAlign: 'center',
  },
  usersList: {
    padding: CONTAINER_SPACING.screen,
  },
  userCard: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    padding: CONTAINER_SPACING.card,
    marginBottom: SPACING.lg,
    ...SHADOWS.md,
  },
  userHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  userInitials: {
    color: COLORS.white,
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.bold,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: FONT_SIZES.base,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.gray[800],
    marginBottom: SPACING.xs,
  },
  userEmail: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.gray[500],
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
  userData: {
    marginBottom: SPACING.lg,
  },
  userDataRow: {
    flexDirection: 'row',
    marginBottom: SPACING.sm,
  },
  userDataItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  userDataText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.gray[500],
  },
  userStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: COLORS.gray[50],
    borderRadius: BORDER_RADIUS.sm,
    padding: SPACING.md,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: FONT_SIZES.base,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.gray[800],
    marginBottom: SPACING.xs,
  },
  statLabel: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.gray[500],
  },
  userActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: SPACING.lg,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray[200],
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.sm,
    backgroundColor: COLORS.gray[50],
    gap: SPACING.sm,
  },
  actionButtonText: {
    fontSize: FONT_SIZES.xs,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.gray[500],
  },
});

export default AdminUsersScreen;
