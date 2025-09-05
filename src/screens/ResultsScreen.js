import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
  Image,
  FlatList,
  RefreshControl
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONT_SIZES, FONT_WEIGHTS, SPACING, CONTAINER_SPACING, BORDER_RADIUS, SHADOWS } from '../utils/constants';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';

const ResultsScreen = () => {
  const [results, setResults] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedResult, setSelectedResult] = useState(null);
  const [showImageViewer, setShowImageViewer] = useState(false);

  useEffect(() => {
    loadResults();
  }, []);

  const loadResults = async () => {
    // Simulación de datos - en producción esto vendría de una API
    setResults([
      {
        id: '1',
        appointmentId: '1',
        service: 'Radiografía de Tórax',
        date: '2024-01-15',
        status: 'completed',
        doctor: 'Dr. María González',
        diagnosis: 'Radiografía de tórax normal. No se observan alteraciones patológicas.',
        recommendations: 'Continuar con controles regulares según indicación médica.',
        images: [
          {
            id: '1',
            name: 'Radiografía Tórax PA',
            type: 'image',
            url: 'https://via.placeholder.com/400x500/4361ee/ffffff?text=Radiografía+Tórax+PA',
            description: 'Vista posteroanterior del tórax'
          },
          {
            id: '2',
            name: 'Radiografía Tórax Lateral',
            type: 'image',
            url: 'https://via.placeholder.com/400x500/10b981/ffffff?text=Radiografía+Tórax+Lateral',
            description: 'Vista lateral del tórax'
          }
        ],
        documents: [
          {
            id: '1',
            name: 'Informe Radiológico',
            type: 'pdf',
            url: 'https://example.com/informe.pdf',
            size: '2.3 MB'
          }
        ]
      },
      {
        id: '2',
        appointmentId: '2',
        service: 'Ecografía Abdominal',
        date: '2024-01-20',
        status: 'pending',
        doctor: 'Dr. Carlos Ruiz',
        diagnosis: 'Resultados en proceso de revisión.',
        recommendations: 'Los resultados estarán disponibles en 24-48 horas.',
        images: [],
        documents: []
      },
      {
        id: '3',
        appointmentId: '3',
        service: 'Mamografía',
        date: '2024-01-10',
        status: 'completed',
        doctor: 'Dra. Ana Martínez',
        diagnosis: 'Mamografía bilateral normal. No se observan lesiones sospechosas.',
        recommendations: 'Continuar con mamografías anuales a partir de los 40 años.',
        images: [
          {
            id: '3',
            name: 'Mamografía Derecha',
            type: 'image',
            url: 'https://via.placeholder.com/400x500/f59e0b/ffffff?text=Mamografía+Derecha',
            description: 'Mamografía de mama derecha'
          },
          {
            id: '4',
            name: 'Mamografía Izquierda',
            type: 'image',
            url: 'https://via.placeholder.com/400x500/ef4444/ffffff?text=Mamografía+Izquierda',
            description: 'Mamografía de mama izquierda'
          }
        ],
        documents: [
          {
            id: '2',
            name: 'Informe Mamográfico',
            type: 'pdf',
            url: 'https://example.com/mamografia.pdf',
            size: '1.8 MB'
          }
        ]
      }
    ]);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadResults();
    setRefreshing(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#10b981';
      case 'pending': return '#f59e0b';
      case 'processing': return '#3b82f6';
      default: return '#6b7280';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return 'Completado';
      case 'pending': return 'Pendiente';
      case 'processing': return 'Procesando';
      default: return 'Desconocido';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleDownloadDocument = async (document) => {
    try {
      Alert.alert(
        'Descargar Documento',
        `¿Deseas descargar ${document.name}?`,
        [
          { text: 'Cancelar', style: 'cancel' },
          { 
            text: 'Descargar', 
            onPress: () => {
              // En una app real, aquí se implementaría la descarga
              Alert.alert('Descarga', 'Documento descargado exitosamente');
            }
          }
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'No se pudo descargar el documento');
    }
  };

  const handleViewImage = (image) => {
    setSelectedResult(image);
    setShowImageViewer(true);
  };

  const renderResultCard = ({ item }) => (
    <View style={styles.resultCard}>
      <View style={styles.resultHeader}>
        <Text style={styles.resultService}>{item.service}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.statusText}>{getStatusText(item.status)}</Text>
        </View>
      </View>

      <View style={styles.resultDetails}>
        <View style={styles.resultDetail}>
          <Ionicons name="calendar-outline" size={16} color="#64748b" />
          <Text style={styles.resultDetailText}>{formatDate(item.date)}</Text>
        </View>
        <View style={styles.resultDetail}>
          <Ionicons name="person-outline" size={16} color="#64748b" />
          <Text style={styles.resultDetailText}>{item.doctor}</Text>
        </View>
      </View>

      {item.status === 'completed' && (
        <>
          <View style={styles.diagnosisContainer}>
            <Text style={styles.diagnosisTitle}>Diagnóstico:</Text>
            <Text style={styles.diagnosisText}>{item.diagnosis}</Text>
          </View>

          {item.recommendations && (
            <View style={styles.recommendationsContainer}>
              <Text style={styles.recommendationsTitle}>Recomendaciones:</Text>
              <Text style={styles.recommendationsText}>{item.recommendations}</Text>
            </View>
          )}

          {item.images.length > 0 && (
            <View style={styles.imagesContainer}>
              <Text style={styles.sectionTitle}>Imágenes:</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {item.images.map((image) => (
                  <TouchableOpacity
                    key={image.id}
                    style={styles.imageCard}
                    onPress={() => handleViewImage(image)}
                  >
                    <Image source={{ uri: image.url }} style={styles.thumbnail} />
                    <Text style={styles.imageName}>{image.name}</Text>
                    <Text style={styles.imageDescription}>{image.description}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}

          {item.documents.length > 0 && (
            <View style={styles.documentsContainer}>
              <Text style={styles.sectionTitle}>Documentos:</Text>
              {item.documents.map((document) => (
                <TouchableOpacity
                  key={document.id}
                  style={styles.documentCard}
                  onPress={() => handleDownloadDocument(document)}
                >
                  <View style={styles.documentIcon}>
                    <Ionicons name="document-text" size={24} color="#ef4444" />
                  </View>
                  <View style={styles.documentInfo}>
                    <Text style={styles.documentName}>{document.name}</Text>
                    <Text style={styles.documentSize}>{document.size}</Text>
                  </View>
                  <Ionicons name="download-outline" size={20} color="#64748b" />
                </TouchableOpacity>
              ))}
            </View>
          )}
        </>
      )}

      {item.status === 'pending' && (
        <View style={styles.pendingContainer}>
          <Ionicons name="time-outline" size={24} color="#f59e0b" />
          <Text style={styles.pendingText}>
            Los resultados están siendo procesados. Estarán disponibles pronto.
          </Text>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mis Resultados</Text>
        <Text style={styles.subtitle}>Radiografías, informes e imágenes médicas</Text>
      </View>

      <FlatList
        data={results}
        renderItem={renderResultCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.resultsList}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />

      {/* Modal para visualizar imágenes */}
      <Modal
        visible={showImageViewer}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setShowImageViewer(false)}
      >
        <View style={styles.imageModalContainer}>
          <View style={styles.imageModalHeader}>
            <Text style={styles.imageModalTitle}>{selectedResult?.name}</Text>
            <TouchableOpacity onPress={() => setShowImageViewer(false)}>
              <Ionicons name="close" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.imageModalContent}>
            {selectedResult && (
              <Image 
                source={{ uri: selectedResult.url }} 
                style={styles.fullImage}
                resizeMode="contain"
              />
            )}
            <Text style={styles.imageModalDescription}>
              {selectedResult?.description}
            </Text>
          </View>
        </View>
      </Modal>
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
  resultsList: {
    padding: CONTAINER_SPACING.screen,
  },
  resultCard: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    padding: CONTAINER_SPACING.card,
    marginBottom: SPACING.lg,
    ...SHADOWS.sm,
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  resultService: {
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
  resultDetails: {
    gap: SPACING.sm,
    marginBottom: SPACING.lg,
  },
  resultDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  resultDetailText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.gray[500],
  },
  diagnosisContainer: {
    backgroundColor: COLORS.primaryLight,
    borderRadius: BORDER_RADIUS.sm,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  diagnosisTitle: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.primary,
    marginBottom: SPACING.xs,
  },
  diagnosisText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.primary,
    lineHeight: 20,
  },
  recommendationsContainer: {
    backgroundColor: COLORS.successLight,
    borderRadius: BORDER_RADIUS.sm,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.success,
  },
  recommendationsTitle: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.success,
    marginBottom: SPACING.xs,
  },
  recommendationsText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.success,
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.base,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.gray[800],
    marginBottom: SPACING.md,
  },
  imagesContainer: {
    marginBottom: SPACING.lg,
  },
  imageCard: {
    width: 120,
    marginRight: SPACING.md,
    backgroundColor: COLORS.gray[50],
    borderRadius: BORDER_RADIUS.sm,
    padding: SPACING.sm,
  },
  thumbnail: {
    width: '100%',
    height: 100,
    borderRadius: BORDER_RADIUS.xs,
    marginBottom: SPACING.sm,
  },
  imageName: {
    fontSize: FONT_SIZES.xs,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.gray[800],
    marginBottom: SPACING.xs,
  },
  imageDescription: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.gray[500],
  },
  documentsContainer: {
    marginBottom: SPACING.sm,
  },
  documentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gray[50],
    borderRadius: BORDER_RADIUS.sm,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
  },
  documentIcon: {
    marginRight: SPACING.md,
  },
  documentInfo: {
    flex: 1,
  },
  documentName: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.gray[800],
    marginBottom: SPACING.xs,
  },
  documentSize: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.gray[500],
  },
  pendingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.warningLight,
    borderRadius: BORDER_RADIUS.sm,
    padding: SPACING.md,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.warning,
  },
  pendingText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.warning,
    marginLeft: SPACING.sm,
    flex: 1,
  },
  imageModalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  imageModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: CONTAINER_SPACING.screen,
    paddingTop: SPACING['5xl'],
  },
  imageModalTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.white,
  },
  imageModalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: CONTAINER_SPACING.screen,
  },
  fullImage: {
    width: '100%',
    height: '80%',
    borderRadius: BORDER_RADIUS.sm,
  },
  imageModalDescription: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.white,
    textAlign: 'center',
    marginTop: SPACING.lg,
  },
});

export default ResultsScreen;
