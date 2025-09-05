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
  RefreshControl,
  Modal
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONT_SIZES, FONT_WEIGHTS, SPACING, CONTAINER_SPACING, BORDER_RADIUS, SHADOWS } from '../utils/constants';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';

const AdminResultsScreen = () => {
  const [pendingResults, setPendingResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedResult, setSelectedResult] = useState(null);
  const [uploadData, setUploadData] = useState({
    diagnosis: '',
    recommendations: '',
    doctor: '',
    images: [],
    documents: []
  });

  useEffect(() => {
    loadPendingResults();
  }, []);

  const loadPendingResults = async () => {
    // Simulación de datos - en producción esto vendría de una API
    setPendingResults([
      {
        id: '1',
        appointmentId: '1',
        userName: 'María González',
        userEmail: 'maria.gonzalez@email.com',
        service: 'Radiografía de Tórax',
        date: '2024-01-15',
        time: '10:00',
        center: 'Centro Imagen Quito',
        doctor: 'Dr. Juan Pérez',
        status: 'processing',
        notes: 'Paciente con tos persistente'
      },
      {
        id: '2',
        appointmentId: '2',
        userName: 'Carlos Ruiz',
        userEmail: 'carlos.ruiz@email.com',
        service: 'Ecografía Abdominal',
        date: '2024-01-15',
        time: '14:30',
        center: 'Centro Imagen Quito',
        doctor: 'Dra. Laura Sánchez',
        status: 'ready',
        notes: 'Dolor abdominal en cuadrante superior derecho'
      },
      {
        id: '3',
        appointmentId: '3',
        userName: 'Ana Martínez',
        userEmail: 'ana.martinez@email.com',
        service: 'Mamografía',
        date: '2024-01-16',
        time: '09:15',
        center: 'Centro Imagen Quito',
        doctor: 'Dra. Carmen López',
        status: 'processing',
        notes: 'Control anual de rutina'
      }
    ]);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadPendingResults();
    setRefreshing(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'ready': return '#10b981';
      case 'processing': return '#f59e0b';
      case 'completed': return '#3b82f6';
      default: return '#6b7280';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'ready': return 'Listo para cargar';
      case 'processing': return 'Procesando';
      case 'completed': return 'Completado';
      default: return 'Desconocido';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const handleUploadResults = (result) => {
    setSelectedResult(result);
    setUploadData({
      diagnosis: '',
      recommendations: '',
      doctor: result.doctor,
      images: [],
      documents: []
    });
    setShowUploadModal(true);
  };

  const handlePickImages = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        quality: 0.8,
      });

      if (!result.canceled) {
        setUploadData(prev => ({
          ...prev,
          images: [...prev.images, ...result.assets]
        }));
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudieron seleccionar las imágenes');
    }
  };

  const handlePickDocuments = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
        copyToCacheDirectory: true,
      });

      if (!result.canceled) {
        setUploadData(prev => ({
          ...prev,
          documents: [...prev.documents, result.assets[0]]
        }));
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo seleccionar el documento');
    }
  };

  const handleSubmitResults = () => {
    if (!uploadData.diagnosis || !uploadData.doctor) {
      Alert.alert('Error', 'Por favor completa el diagnóstico y el doctor');
      return;
    }

    Alert.alert(
      'Confirmar',
      '¿Estás seguro de que quieres cargar estos resultados?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Cargar', 
          onPress: () => {
            // Aquí se implementaría la lógica para cargar los resultados
            Alert.alert('Éxito', 'Resultados cargados exitosamente. El usuario será notificado por WhatsApp.');
            setShowUploadModal(false);
            // Actualizar el estado del resultado
            setPendingResults(prev => 
              prev.map(result => 
                result.id === selectedResult.id 
                  ? { ...result, status: 'completed' }
                  : result
              )
            );
          }
        }
      ]
    );
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
          <Ionicons name="person-outline" size={16} color="#64748b" />
          <Text style={styles.resultDetailText}>{item.userName}</Text>
        </View>
        <View style={styles.resultDetail}>
          <Ionicons name="mail-outline" size={16} color="#64748b" />
          <Text style={styles.resultDetailText}>{item.userEmail}</Text>
        </View>
        <View style={styles.resultDetail}>
          <Ionicons name="calendar-outline" size={16} color="#64748b" />
          <Text style={styles.resultDetailText}>{formatDate(item.date)} - {item.time}</Text>
        </View>
        <View style={styles.resultDetail}>
          <Ionicons name="medical-outline" size={16} color="#64748b" />
          <Text style={styles.resultDetailText}>{item.doctor}</Text>
        </View>
        <View style={styles.resultDetail}>
          <Ionicons name="location-outline" size={16} color="#64748b" />
          <Text style={styles.resultDetailText}>{item.center}</Text>
        </View>
      </View>

      {item.notes && (
        <View style={styles.notesContainer}>
          <Text style={styles.notesLabel}>Notas:</Text>
          <Text style={styles.notesText}>{item.notes}</Text>
        </View>
      )}

      <View style={styles.resultActions}>
        {item.status === 'ready' && (
          <TouchableOpacity 
            style={styles.uploadButton}
            onPress={() => handleUploadResults(item)}
          >
            <Ionicons name="cloud-upload-outline" size={16} color="#fff" />
            <Text style={styles.uploadButtonText}>Cargar Resultados</Text>
          </TouchableOpacity>
        )}
        {item.status === 'processing' && (
          <TouchableOpacity 
            style={styles.processButton}
            onPress={() => Alert.alert('Procesando', 'Los resultados están siendo procesados')}
          >
            <Ionicons name="time-outline" size={16} color="#fff" />
            <Text style={styles.processButtonText}>En Proceso</Text>
          </TouchableOpacity>
        )}
        {item.status === 'completed' && (
          <View style={styles.completedContainer}>
            <Ionicons name="checkmark-circle" size={20} color="#10b981" />
            <Text style={styles.completedText}>Resultados cargados</Text>
          </View>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Cargar Resultados</Text>
        <Text style={styles.subtitle}>Gestiona los resultados de los estudios médicos</Text>
      </View>

      {/* Barra de búsqueda */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search-outline" size={20} color="#64748b" />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar por paciente, servicio o doctor..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Estadísticas */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{pendingResults.length}</Text>
          <Text style={styles.statLabel}>Total Pendientes</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{pendingResults.filter(r => r.status === 'ready').length}</Text>
          <Text style={styles.statLabel}>Listos para cargar</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{pendingResults.filter(r => r.status === 'processing').length}</Text>
          <Text style={styles.statLabel}>Procesando</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{pendingResults.filter(r => r.status === 'completed').length}</Text>
          <Text style={styles.statLabel}>Completados</Text>
        </View>
      </View>

      {/* Lista de resultados */}
      <FlatList
        data={pendingResults.filter(result => 
          result.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          result.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
          result.doctor.toLowerCase().includes(searchQuery.toLowerCase())
        )}
        renderItem={renderResultCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.resultsList}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />

      {/* Modal para cargar resultados */}
      <Modal
        visible={showUploadModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Cargar Resultados</Text>
            <TouchableOpacity onPress={() => setShowUploadModal(false)}>
              <Ionicons name="close" size={24} color="#64748b" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            {selectedResult && (
              <View style={styles.patientInfo}>
                <Text style={styles.patientInfoTitle}>Información del Paciente</Text>
                <Text style={styles.patientInfoText}>Paciente: {selectedResult.userName}</Text>
                <Text style={styles.patientInfoText}>Servicio: {selectedResult.service}</Text>
                <Text style={styles.patientInfoText}>Fecha: {formatDate(selectedResult.date)}</Text>
              </View>
            )}

            <View style={styles.formGroup}>
              <Text style={styles.label}>Doctor responsable *</Text>
              <TextInput
                style={styles.input}
                value={uploadData.doctor}
                onChangeText={(text) => setUploadData(prev => ({ ...prev, doctor: text }))}
                placeholder="Nombre del doctor"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Diagnóstico *</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={uploadData.diagnosis}
                onChangeText={(text) => setUploadData(prev => ({ ...prev, diagnosis: text }))}
                placeholder="Describe el diagnóstico encontrado..."
                multiline
                numberOfLines={4}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Recomendaciones</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={uploadData.recommendations}
                onChangeText={(text) => setUploadData(prev => ({ ...prev, recommendations: text }))}
                placeholder="Recomendaciones médicas..."
                multiline
                numberOfLines={3}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Imágenes médicas</Text>
              <TouchableOpacity style={styles.uploadButton} onPress={handlePickImages}>
                <Ionicons name="image-outline" size={20} color="#fff" />
                <Text style={styles.uploadButtonText}>Seleccionar Imágenes</Text>
              </TouchableOpacity>
              {uploadData.images.length > 0 && (
                <Text style={styles.fileCount}>{uploadData.images.length} imagen(es) seleccionada(s)</Text>
              )}
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Documentos (PDF)</Text>
              <TouchableOpacity style={styles.uploadButton} onPress={handlePickDocuments}>
                <Ionicons name="document-outline" size={20} color="#fff" />
                <Text style={styles.uploadButtonText}>Seleccionar Documentos</Text>
              </TouchableOpacity>
              {uploadData.documents.length > 0 && (
                <Text style={styles.fileCount}>{uploadData.documents.length} documento(s) seleccionado(s)</Text>
              )}
            </View>
          </ScrollView>

          <View style={styles.modalActions}>
            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={() => setShowUploadModal(false)}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.submitButton}
              onPress={handleSubmitResults}
            >
              <Text style={styles.submitButtonText}>Cargar Resultados</Text>
            </TouchableOpacity>
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
  resultsList: {
    padding: CONTAINER_SPACING.screen,
  },
  resultCard: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    padding: CONTAINER_SPACING.card,
    marginBottom: SPACING.lg,
    ...SHADOWS.md,
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
    marginBottom: SPACING.md,
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
  notesContainer: {
    backgroundColor: COLORS.gray[50],
    borderRadius: BORDER_RADIUS.sm,
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  notesLabel: {
    fontSize: FONT_SIZES.xs,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.gray[500],
    marginBottom: SPACING.xs,
  },
  notesText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.gray[700],
  },
  resultActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.success,
    paddingHorizontal: CONTAINER_SPACING.button,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.sm,
    gap: SPACING.sm,
  },
  uploadButtonText: {
    color: COLORS.white,
    fontWeight: FONT_WEIGHTS.semibold,
    fontSize: FONT_SIZES.sm,
  },
  processButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.warning,
    paddingHorizontal: CONTAINER_SPACING.button,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.sm,
    gap: SPACING.sm,
  },
  processButtonText: {
    color: COLORS.white,
    fontWeight: FONT_WEIGHTS.semibold,
    fontSize: FONT_SIZES.sm,
  },
  completedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  completedText: {
    color: COLORS.success,
    fontWeight: FONT_WEIGHTS.semibold,
    fontSize: FONT_SIZES.sm,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: COLORS.gray[50],
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: CONTAINER_SPACING.screen,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray[200],
  },
  modalTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.gray[800],
  },
  modalContent: {
    flex: 1,
    padding: CONTAINER_SPACING.screen,
  },
  patientInfo: {
    backgroundColor: COLORS.gray[50],
    borderRadius: BORDER_RADIUS.sm,
    padding: CONTAINER_SPACING.card,
    marginBottom: CONTAINER_SPACING.screen,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  patientInfoTitle: {
    fontSize: FONT_SIZES.base,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.gray[800],
    marginBottom: SPACING.sm,
  },
  patientInfoText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.gray[500],
    marginBottom: SPACING.xs,
  },
  formGroup: {
    marginBottom: CONTAINER_SPACING.screen,
  },
  label: {
    fontSize: FONT_SIZES.base,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.gray[700],
    marginBottom: SPACING.sm,
  },
  input: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.sm,
    padding: CONTAINER_SPACING.input,
    borderWidth: 1,
    borderColor: COLORS.gray[200],
    fontSize: FONT_SIZES.base,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  fileCount: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.success,
    marginTop: SPACING.sm,
    fontWeight: FONT_WEIGHTS.medium,
  },
  modalActions: {
    flexDirection: 'row',
    padding: CONTAINER_SPACING.screen,
    gap: SPACING.md,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray[200],
  },
  cancelButton: {
    flex: 1,
    padding: CONTAINER_SPACING.button,
    borderRadius: BORDER_RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.gray[200],
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: FONT_SIZES.base,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.gray[500],
  },
  submitButton: {
    flex: 1,
    padding: CONTAINER_SPACING.button,
    borderRadius: BORDER_RADIUS.sm,
    backgroundColor: COLORS.success,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: FONT_SIZES.base,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.white,
  },
});

export default AdminResultsScreen;
