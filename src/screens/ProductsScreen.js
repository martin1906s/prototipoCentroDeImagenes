import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TextInput,
  RefreshControl
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONT_SIZES, FONT_WEIGHTS, SPACING, CONTAINER_SPACING, BORDER_RADIUS, SHADOWS } from '../utils/constants';

const ProductsScreen = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const categories = [
    { id: 'all', name: 'Todos', icon: 'grid-outline' },
    { id: 'radiografias', name: 'Radiografías', icon: 'scan-outline' },
    { id: 'ecografias', name: 'Ecografías', icon: 'pulse-outline' },
    { id: 'mamografias', name: 'Mamografías', icon: 'heart-outline' },
    { id: 'tomografias', name: 'Tomografías', icon: 'layers-outline' },
    { id: 'resonancias', name: 'Resonancias', icon: 'magnet-outline' },
    { id: 'densitometrias', name: 'Densitometrías', icon: 'fitness-outline' },
  ];

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, selectedCategory, searchQuery]);

  const loadProducts = async () => {
    // Simulación de datos - en producción esto vendría de una API
    setProducts([
      {
        id: '1',
        name: 'Radiografía de Tórax',
        category: 'radiografias',
        description: 'Estudio radiológico del tórax para evaluación de pulmones, corazón y estructuras óseas.',
        price: 25,
        duration: '15 minutos',
        preparation: 'No requiere preparación especial',
        indications: 'Evaluación de síntomas respiratorios, control preoperatorio, screening de tuberculosis',
        contraindications: 'Embarazo (relativo)',
        image: 'https://via.placeholder.com/300x200/4361ee/ffffff?text=Radiografía+Tórax'
      },
      {
        id: '2',
        name: 'Radiografía de Columna Lumbar',
        category: 'radiografias',
        description: 'Estudio radiológico de la columna lumbar para evaluación de vértebras y discos intervertebrales.',
        price: 30,
        duration: '20 minutos',
        preparation: 'Ayuno de 4 horas',
        indications: 'Dolor lumbar, evaluación de fracturas, control postoperatorio',
        contraindications: 'Embarazo',
        image: 'https://via.placeholder.com/300x200/10b981/ffffff?text=Radiografía+Columna'
      },
      {
        id: '3',
        name: 'Ecografía Abdominal Completa',
        category: 'ecografias',
        description: 'Estudio ecográfico de órganos abdominales: hígado, vesícula, páncreas, riñones, bazo.',
        price: 45,
        duration: '30 minutos',
        preparation: 'Ayuno de 8 horas',
        indications: 'Dolor abdominal, evaluación de órganos, control de masas',
        contraindications: 'Ninguna',
        image: 'https://via.placeholder.com/300x200/f59e0b/ffffff?text=Ecografía+Abdominal'
      },
      {
        id: '4',
        name: 'Ecografía Obstétrica',
        category: 'ecografias',
        description: 'Estudio ecográfico para evaluación del embarazo y desarrollo fetal.',
        price: 50,
        duration: '45 minutos',
        preparation: 'Vejiga llena',
        indications: 'Control prenatal, evaluación fetal, detección de anomalías',
        contraindications: 'Ninguna',
        image: 'https://via.placeholder.com/300x200/ef4444/ffffff?text=Ecografía+Obstétrica'
      },
      {
        id: '5',
        name: 'Mamografía Bilateral',
        category: 'mamografias',
        description: 'Estudio radiológico de ambas mamas para detección temprana de cáncer de mama.',
        price: 40,
        duration: '20 minutos',
        preparation: 'No usar desodorante el día del estudio',
        indications: 'Screening de cáncer de mama, evaluación de masas mamarias',
        contraindications: 'Embarazo',
        image: 'https://via.placeholder.com/300x200/8b5cf6/ffffff?text=Mamografía'
      },
      {
        id: '6',
        name: 'Tomografía Computarizada de Tórax',
        category: 'tomografias',
        description: 'Estudio tomográfico de alta resolución del tórax con contraste intravenoso.',
        price: 120,
        duration: '30 minutos',
        preparation: 'Ayuno de 6 horas, contraste IV',
        indications: 'Evaluación de nódulos pulmonares, estadificación oncológica',
        contraindications: 'Alergia al contraste, insuficiencia renal',
        image: 'https://via.placeholder.com/300x200/06b6d4/ffffff?text=Tomografía+Tórax'
      },
      {
        id: '7',
        name: 'Resonancia Magnética Cerebral',
        category: 'resonancias',
        description: 'Estudio de resonancia magnética del cerebro para evaluación de estructuras cerebrales.',
        price: 150,
        duration: '45 minutos',
        preparation: 'Retirar objetos metálicos',
        indications: 'Cefaleas, evaluación de lesiones cerebrales, control postoperatorio',
        contraindications: 'Marcapasos, implantes metálicos, claustrofobia',
        image: 'https://via.placeholder.com/300x200/84cc16/ffffff?text=RMN+Cerebral'
      },
      {
        id: '8',
        name: 'Densitometría Ósea',
        category: 'densitometrias',
        description: 'Estudio para evaluación de la densidad mineral ósea y detección de osteoporosis.',
        price: 60,
        duration: '20 minutos',
        preparation: 'No requiere preparación especial',
        indications: 'Evaluación de osteoporosis, control de tratamiento, screening postmenopáusico',
        contraindications: 'Embarazo',
        image: 'https://via.placeholder.com/300x200/f97316/ffffff?text=Densitometría'
      }
    ]);
  };

  const filterProducts = () => {
    let filtered = products;

    // Filtrar por categoría
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filtrar por búsqueda
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadProducts();
    setRefreshing(false);
  };

  const renderCategoryButton = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        selectedCategory === item.id && styles.categoryButtonSelected
      ]}
      onPress={() => setSelectedCategory(item.id)}
    >
      <Ionicons
        name={item.icon}
        size={20}
        color={selectedCategory === item.id ? '#fff' : '#64748b'}
      />
      <Text style={[
        styles.categoryButtonText,
        selectedCategory === item.id && styles.categoryButtonTextSelected
      ]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderProductCard = ({ item }) => (
    <View style={styles.productCard}>
      <View style={styles.productImageContainer}>
        <View style={styles.productImagePlaceholder}>
          <Ionicons name="medical" size={40} color="#4361ee" />
        </View>
      </View>

      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productDescription} numberOfLines={2}>
          {item.description}
        </Text>

        <View style={styles.productDetails}>
          <View style={styles.productDetail}>
            <Ionicons name="time-outline" size={16} color="#64748b" />
            <Text style={styles.productDetailText}>{item.duration}</Text>
          </View>
          <View style={styles.productDetail}>
            <Ionicons name="cash-outline" size={16} color="#64748b" />
            <Text style={styles.productDetailText}>${item.price}</Text>
          </View>
        </View>

        <View style={styles.productActions}>
          <TouchableOpacity style={styles.infoButton}>
            <Text style={styles.infoButtonText}>Ver Detalles</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.scheduleButton}>
            <Text style={styles.scheduleButtonText}>Agendar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Productos y Servicios</Text>
        <Text style={styles.subtitle}>Explora nuestros servicios de diagnóstico por imágenes</Text>
      </View>

      {/* Barra de búsqueda */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search-outline" size={20} color="#64748b" />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar servicios..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Categorías */}
      <View style={styles.categoriesContainer}>
        <FlatList
          data={categories}
          renderItem={renderCategoryButton}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        />
      </View>

      {/* Lista de productos */}
      <FlatList
        data={filteredProducts}
        renderItem={renderProductCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.productsList}
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
  categoriesContainer: {
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray[200],
  },
  categoriesList: {
    paddingHorizontal: CONTAINER_SPACING.screen,
    paddingVertical: CONTAINER_SPACING.card,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    gap: 8,
  },
  categoryButtonSelected: {
    backgroundColor: '#4361ee',
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
  },
  categoryButtonTextSelected: {
    color: '#fff',
  },
  productsList: {
    padding: 20,
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  productImageContainer: {
    height: 120,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productInfo: {
    padding: CONTAINER_SPACING.card,
  },
  productName: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.gray[800],
    marginBottom: SPACING.sm,
  },
  productDescription: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.gray[500],
    lineHeight: 20,
    marginBottom: SPACING.md,
  },
  productDetails: {
    flexDirection: 'row',
    gap: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  productDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  productDetailText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.gray[500],
  },
  productActions: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  infoButton: {
    flex: 1,
    paddingVertical: CONTAINER_SPACING.button,
    borderRadius: BORDER_RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.gray[200],
    alignItems: 'center',
  },
  infoButtonText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.gray[500],
  },
  scheduleButton: {
    flex: 1,
    paddingVertical: CONTAINER_SPACING.button,
    borderRadius: BORDER_RADIUS.sm,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
  },
  scheduleButtonText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.white,
  },
});

export default ProductsScreen;
