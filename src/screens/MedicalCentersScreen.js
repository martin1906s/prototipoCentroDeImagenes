import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TextInput,
  RefreshControl,
  Linking,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONT_SIZES, FONT_WEIGHTS, SPACING, CONTAINER_SPACING, BORDER_RADIUS, SHADOWS } from '../utils/constants';

const MedicalCentersScreen = () => {
  const [centers, setCenters] = useState([]);
  const [filteredCenters, setFilteredCenters] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadCenters();
  }, []);

  useEffect(() => {
    filterCenters();
  }, [centers, searchQuery]);

  const loadCenters = async () => {
    // Simulación de datos - en producción esto vendría de una API
    setCenters([
      {
        id: '1',
        name: 'Centro Imagen Quito',
        address: 'Av. Amazonas N34-123 y Av. 6 de Diciembre',
        city: 'Quito',
        phone: '02-2345678',
        whatsapp: '+593-99-123-4567',
        email: 'quito@centroimagen.com',
        hours: {
          weekdays: '07:00 - 19:00',
          saturday: '08:00 - 16:00',
          sunday: '08:00 - 14:00'
        },
        services: ['Radiografías', 'Ecografías', 'Mamografías', 'Tomografías', 'Resonancias'],
        coordinates: {
          latitude: -0.1807,
          longitude: -78.4678
        },
        image: 'https://via.placeholder.com/400x200/4361ee/ffffff?text=Centro+Imagen+Quito',
        description: 'Nuestro centro principal en Quito con tecnología de última generación y personal altamente capacitado.',
        specialties: ['Radiología General', 'Radiología Pediátrica', 'Radiología de Emergencia']
      },
      {
        id: '2',
        name: 'Centro Imagen Guayaquil',
        address: 'Av. 9 de Octubre 1234 y Av. Francisco de Orellana',
        city: 'Guayaquil',
        phone: '04-2345678',
        whatsapp: '+593-99-234-5678',
        email: 'guayaquil@centroimagen.com',
        hours: {
          weekdays: '07:00 - 19:00',
          saturday: '08:00 - 16:00',
          sunday: '08:00 - 14:00'
        },
        services: ['Radiografías', 'Ecografías', 'Mamografías', 'Tomografías', 'Densitometrías'],
        coordinates: {
          latitude: -2.1894,
          longitude: -79.8890
        },
        image: 'https://via.placeholder.com/400x200/10b981/ffffff?text=Centro+Imagen+Guayaquil',
        description: 'Centro especializado en servicios de diagnóstico por imágenes en la costa ecuatoriana.',
        specialties: ['Radiología General', 'Radiología Oncológica', 'Radiología Intervencionista']
      },
      {
        id: '3',
        name: 'Centro Imagen Cuenca',
        address: 'Av. Solano 567 y Av. 12 de Abril',
        city: 'Cuenca',
        phone: '07-2345678',
        whatsapp: '+593-99-345-6789',
        email: 'cuenca@centroimagen.com',
        hours: {
          weekdays: '07:00 - 18:00',
          saturday: '08:00 - 15:00',
          sunday: '08:00 - 13:00'
        },
        services: ['Radiografías', 'Ecografías', 'Mamografías', 'Resonancias'],
        coordinates: {
          latitude: -2.9001,
          longitude: -79.0059
        },
        image: 'https://via.placeholder.com/400x200/f59e0b/ffffff?text=Centro+Imagen+Cuenca',
        description: 'Centro de diagnóstico por imágenes en la hermosa ciudad de Cuenca con atención personalizada.',
        specialties: ['Radiología General', 'Radiología Pediátrica', 'Radiología Musculoesquelética']
      },
      {
        id: '4',
        name: 'Centro Imagen Santo Domingo',
        address: 'Av. Tsáchila 890 y Av. Quito',
        city: 'Santo Domingo',
        phone: '02-3456789',
        whatsapp: '+593-99-456-7890',
        email: 'santodomingo@centroimagen.com',
        hours: {
          weekdays: '07:00 - 18:00',
          saturday: '08:00 - 15:00',
          sunday: 'Cerrado'
        },
        services: ['Radiografías', 'Ecografías', 'Mamografías'],
        coordinates: {
          latitude: -0.2522,
          longitude: -79.1759
        },
        image: 'https://via.placeholder.com/400x200/ef4444/ffffff?text=Centro+Imagen+Santo+Domingo',
        description: 'Centro de diagnóstico por imágenes en Santo Domingo con servicios básicos y especializados.',
        specialties: ['Radiología General', 'Radiología de Emergencia']
      },
      {
        id: '5',
        name: 'Centro Imagen Manta',
        address: 'Av. 4 de Noviembre 123 y Av. 24 de Mayo',
        city: 'Manta',
        phone: '05-2345678',
        whatsapp: '+593-99-567-8901',
        email: 'manta@centroimagen.com',
        hours: {
          weekdays: '07:00 - 18:00',
          saturday: '08:00 - 15:00',
          sunday: '08:00 - 13:00'
        },
        services: ['Radiografías', 'Ecografías', 'Mamografías', 'Tomografías'],
        coordinates: {
          latitude: -0.9617,
          longitude: -80.7087
        },
        image: 'https://via.placeholder.com/400x200/8b5cf6/ffffff?text=Centro+Imagen+Manta',
        description: 'Centro de diagnóstico por imágenes en Manta, puerto principal de Ecuador.',
        specialties: ['Radiología General', 'Radiología de Emergencia', 'Radiología Pediátrica']
      },
      {
        id: '6',
        name: 'Centro Imagen Ambato',
        address: 'Av. Cevallos 456 y Av. 12 de Noviembre',
        city: 'Ambato',
        phone: '03-2345678',
        whatsapp: '+593-99-678-9012',
        email: 'ambato@centroimagen.com',
        hours: {
          weekdays: '07:00 - 18:00',
          saturday: '08:00 - 15:00',
          sunday: '08:00 - 13:00'
        },
        services: ['Radiografías', 'Ecografías', 'Mamografías', 'Densitometrías'],
        coordinates: {
          latitude: -1.2491,
          longitude: -78.6067
        },
        image: 'https://via.placeholder.com/400x200/06b6d4/ffffff?text=Centro+Imagen+Ambato',
        description: 'Centro de diagnóstico por imágenes en Ambato, ciudad de las flores y las frutas.',
        specialties: ['Radiología General', 'Radiología Pediátrica']
      }
    ]);
  };

  const filterCenters = () => {
    let filtered = centers;

    if (searchQuery) {
      filtered = filtered.filter(center =>
        center.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        center.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        center.address.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredCenters(filtered);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadCenters();
    setRefreshing(false);
  };

  const handleCall = (phone) => {
    Linking.openURL(`tel:${phone}`);
  };

  const handleWhatsApp = (whatsapp) => {
    const message = 'Hola, me gustaría obtener información sobre sus servicios de diagnóstico por imágenes.';
    const url = `whatsapp://send?phone=${whatsapp}&text=${encodeURIComponent(message)}`;
    Linking.openURL(url).catch(() => {
      Alert.alert('Error', 'No se pudo abrir WhatsApp');
    });
  };

  const handleEmail = (email) => {
    Linking.openURL(`mailto:${email}`);
  };

  const handleDirections = (coordinates) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${coordinates.latitude},${coordinates.longitude}`;
    Linking.openURL(url);
  };

  const renderCenterCard = ({ item }) => (
    <View style={styles.centerCard}>
      <View style={styles.centerImageContainer}>
        <View style={styles.centerImagePlaceholder}>
          <Ionicons name="business" size={40} color="#4361ee" />
        </View>
        <View style={styles.centerBadge}>
          <Text style={styles.centerBadgeText}>{item.city}</Text>
        </View>
      </View>

      <View style={styles.centerInfo}>
        <Text style={styles.centerName}>{item.name}</Text>
        <Text style={styles.centerDescription} numberOfLines={2}>
          {item.description}
        </Text>

        <View style={styles.centerDetails}>
          <View style={styles.centerDetail}>
            <Ionicons name="location-outline" size={16} color="#64748b" />
            <Text style={styles.centerDetailText}>{item.address}</Text>
          </View>
          <View style={styles.centerDetail}>
            <Ionicons name="time-outline" size={16} color="#64748b" />
            <Text style={styles.centerDetailText}>Lun-Vie: {item.hours.weekdays}</Text>
          </View>
        </View>

        <View style={styles.servicesContainer}>
          <Text style={styles.servicesTitle}>Servicios:</Text>
          <View style={styles.servicesList}>
            {item.services.slice(0, 3).map((service, index) => (
              <View key={index} style={styles.serviceTag}>
                <Text style={styles.serviceTagText}>{service}</Text>
              </View>
            ))}
            {item.services.length > 3 && (
              <View style={styles.serviceTag}>
                <Text style={styles.serviceTagText}>+{item.services.length - 3} más</Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.centerActions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => handleCall(item.phone)}
          >
            <Ionicons name="call" size={16} color="#fff" />
            <Text style={styles.actionButtonText}>Llamar</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.actionButton, styles.whatsappButton]}
            onPress={() => handleWhatsApp(item.whatsapp)}
          >
            <Ionicons name="logo-whatsapp" size={16} color="#fff" />
            <Text style={styles.actionButtonText}>WhatsApp</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.actionButton, styles.directionsButton]}
            onPress={() => handleDirections(item.coordinates)}
          >
            <Ionicons name="navigate" size={16} color="#fff" />
            <Text style={styles.actionButtonText}>Ruta</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Centros Médicos</Text>
        <Text style={styles.subtitle}>Nuestras ubicaciones en todo el país</Text>
      </View>

      {/* Barra de búsqueda */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search-outline" size={20} color="#64748b" />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar centros por ciudad o nombre..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Estadísticas */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{centers.length}</Text>
          <Text style={styles.statLabel}>Centros</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>6</Text>
          <Text style={styles.statLabel}>Ciudades</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>24/7</Text>
          <Text style={styles.statLabel}>Emergencias</Text>
        </View>
      </View>

      {/* Lista de centros */}
      <FlatList
        data={filteredCenters}
        renderItem={renderCenterCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.centersList}
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
    ...SHADOWS.sm,
  },
  statNumber: {
    fontSize: FONT_SIZES['2xl'],
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.gray[800],
    marginBottom: SPACING.xs,
  },
  statLabel: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.gray[500],
    textAlign: 'center',
  },
  centersList: {
    padding: CONTAINER_SPACING.screen,
  },
  centerCard: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.lg,
    ...SHADOWS.sm,
    overflow: 'hidden',
  },
  centerImageContainer: {
    height: 120,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  centerImagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerBadge: {
    position: 'absolute',
    top: SPACING.md,
    right: SPACING.md,
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.lg,
  },
  centerBadgeText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.white,
    fontWeight: FONT_WEIGHTS.semibold,
  },
  centerInfo: {
    padding: CONTAINER_SPACING.card,
  },
  centerName: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.gray[800],
    marginBottom: SPACING.sm,
  },
  centerDescription: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.gray[500],
    lineHeight: 20,
    marginBottom: SPACING.md,
  },
  centerDetails: {
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  centerDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  centerDetailText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.gray[500],
    flex: 1,
  },
  servicesContainer: {
    marginBottom: SPACING.lg,
  },
  servicesTitle: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.gray[800],
    marginBottom: SPACING.sm,
  },
  servicesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.xs,
  },
  serviceTag: {
    backgroundColor: COLORS.gray[50],
    borderRadius: BORDER_RADIUS.lg,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
  },
  serviceTagText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.primary,
    fontWeight: FONT_WEIGHTS.medium,
  },
  centerActions: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.sm,
    paddingVertical: CONTAINER_SPACING.button,
    gap: SPACING.xs,
  },
  whatsappButton: {
    backgroundColor: COLORS.success,
  },
  directionsButton: {
    backgroundColor: COLORS.success,
  },
  actionButtonText: {
    fontSize: FONT_SIZES.xs,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.white,
  },
});

export default MedicalCentersScreen;
