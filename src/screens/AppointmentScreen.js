import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
  FlatList
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { COLORS, FONT_SIZES, FONT_WEIGHTS, SPACING, CONTAINER_SPACING, BORDER_RADIUS, SHADOWS } from '../utils/constants';

const AppointmentScreen = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [showNewAppointmentModal, setShowNewAppointmentModal] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedCenter, setSelectedCenter] = useState('');
  const [notes, setNotes] = useState('');

  const services = [
    { id: '1', name: 'Radiografía de Tórax', category: 'Radiografías', price: 25 },
    { id: '2', name: 'Radiografía de Columna', category: 'Radiografías', price: 30 },
    { id: '3', name: 'Ecografía Abdominal', category: 'Ecografías', price: 45 },
    { id: '4', name: 'Ecografía Obstétrica', category: 'Ecografías', price: 50 },
    { id: '5', name: 'Mamografía', category: 'Mamografías', price: 40 },
    { id: '6', name: 'Tomografía Computarizada', category: 'Tomografías', price: 120 },
    { id: '7', name: 'Resonancia Magnética', category: 'Resonancias', price: 150 },
    { id: '8', name: 'Densitometría Ósea', category: 'Densitometrías', price: 60 },
  ];

  const centers = [
    { id: '1', name: 'Centro Imagen Quito', address: 'Av. Amazonas N34-123', phone: '02-2345678' },
    { id: '2', name: 'Centro Imagen Guayaquil', address: 'Av. 9 de Octubre 1234', phone: '04-2345678' },
    { id: '3', name: 'Centro Imagen Cuenca', address: 'Av. Solano 567', phone: '07-2345678' },
  ];

  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30'
  ];

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = () => {
    // Simulación de datos - en producción esto vendría de una API
    setAppointments([
      {
        id: '1',
        service: 'Radiografía de Tórax',
        date: '2024-01-15',
        time: '10:00',
        center: 'Centro Imagen Quito',
        status: 'completed',
        price: 25
      },
      {
        id: '2',
        service: 'Ecografía Abdominal',
        date: '2024-01-20',
        time: '14:30',
        center: 'Centro Imagen Quito',
        status: 'pending',
        price: 45
      },
      {
        id: '3',
        service: 'Mamografía',
        date: '2024-01-25',
        time: '09:15',
        center: 'Centro Imagen Quito',
        status: 'scheduled',
        price: 40
      }
    ]);
  };

  const handleNewAppointment = () => {
    if (!selectedService || !selectedDate || !selectedTime || !selectedCenter) {
      Alert.alert('Error', 'Por favor completa todos los campos obligatorios');
      return;
    }

    const newAppointment = {
      id: Date.now().toString(),
      service: selectedService,
      date: selectedDate,
      time: selectedTime,
      center: selectedCenter,
      status: 'scheduled',
      notes: notes,
      price: services.find(s => s.name === selectedService)?.price || 0
    };

    setAppointments(prev => [newAppointment, ...prev]);
    setShowNewAppointmentModal(false);
    resetForm();
    
    Alert.alert(
      'Cita Agendada',
      'Tu cita ha sido agendada exitosamente. Recibirás una confirmación por WhatsApp.',
      [{ text: 'OK' }]
    );
  };

  const resetForm = () => {
    setSelectedService('');
    setSelectedDate('');
    setSelectedTime('');
    setSelectedCenter('');
    setNotes('');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return COLORS.success;
      case 'pending': return COLORS.warning;
      case 'scheduled': return COLORS.info;
      case 'cancelled': return COLORS.danger;
      default: return COLORS.gray[500];
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return 'Completado';
      case 'pending': return 'Pendiente';
      case 'scheduled': return 'Programado';
      case 'cancelled': return 'Cancelado';
      default: return 'Desconocido';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderAppointmentCard = ({ item }) => (
    <View style={styles.appointmentCard}>
      <View style={styles.appointmentHeader}>
        <Text style={styles.appointmentService}>{item.service}</Text>
        <LinearGradient
          colors={[getStatusColor(item.status), getStatusColor(item.status)]}
          style={styles.statusBadge}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.statusText}>{getStatusText(item.status)}</Text>
        </LinearGradient>
      </View>
      
      <View style={styles.appointmentDetails}>
        <View style={styles.appointmentDetail}>
          <Ionicons name="calendar-outline" size={16} color={COLORS.primary} />
          <Text style={styles.appointmentDetailText}>{formatDate(item.date)}</Text>
        </View>
        <View style={styles.appointmentDetail}>
          <Ionicons name="time-outline" size={16} color={COLORS.warning} />
          <Text style={styles.appointmentDetailText}>{item.time}</Text>
        </View>
        <View style={styles.appointmentDetail}>
          <Ionicons name="location-outline" size={16} color={COLORS.accent} />
          <Text style={styles.appointmentDetailText}>{item.center}</Text>
        </View>
        <View style={styles.appointmentDetail}>
          <Ionicons name="cash-outline" size={16} color={COLORS.success} />
          <Text style={styles.appointmentDetailText}>${item.price}</Text>
        </View>
      </View>

      {item.notes && (
        <View style={styles.notesContainer}>
          <Text style={styles.notesLabel}>Notas:</Text>
          <Text style={styles.notesText}>{item.notes}</Text>
        </View>
      )}

      <View style={styles.appointmentActions}>
        {item.status === 'scheduled' && (
          <TouchableOpacity style={styles.cancelButton}>
            <LinearGradient
              colors={[COLORS.dangerLight, COLORS.danger]}
              style={styles.cancelButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
        {item.status === 'completed' && (
          <TouchableOpacity style={styles.resultsButton}>
            <LinearGradient
              colors={[COLORS.info, COLORS.infoDark]}
              style={styles.resultsButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.resultsButtonText}>Ver Resultados</Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={COLORS.gradientPrimary}
        style={styles.headerGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Mis Citas</Text>
          <Text style={{color: 'red', fontSize: 12}}>Modal: {showNewAppointmentModal ? 'ABIERTO' : 'CERRADO'}</Text>
          <TouchableOpacity 
            style={styles.newAppointmentButton}
            onPress={() => {
              console.log('Botón presionado, abriendo modal...');
              setShowNewAppointmentModal(true);
            }}
          >
            <LinearGradient
              colors={COLORS.gradientSecondary}
              style={styles.newAppointmentButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Ionicons name="add" size={20} color={COLORS.white} />
              <Text style={styles.newAppointmentButtonText}>Nueva Cita</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <FlatList
        data={appointments}
        renderItem={renderAppointmentCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.appointmentsList}
        showsVerticalScrollIndicator={false}
      />

      {/* Modal para nueva cita */}
      <Modal
        visible={showNewAppointmentModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowNewAppointmentModal(false)}
      >
        <View style={styles.modalContainer}>
          {console.log('Modal renderizando, visible:', showNewAppointmentModal)}
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Agendar Nueva Cita</Text>
            <TouchableOpacity onPress={() => setShowNewAppointmentModal(false)}>
              <Ionicons name="close" size={24} color="#64748b" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Servicio *</Text>
              <View style={styles.serviceGrid}>
                {services.map((service) => (
                  <TouchableOpacity
                    key={service.id}
                    style={[
                      styles.serviceCard,
                      selectedService === service.name && styles.serviceCardSelected
                    ]}
                    onPress={() => setSelectedService(service.name)}
                  >
                    <Text style={[
                      styles.serviceName,
                      selectedService === service.name && styles.serviceNameSelected
                    ]}>
                      {service.name}
                    </Text>
                    <Text style={[
                      styles.servicePrice,
                      selectedService === service.name && styles.servicePriceSelected
                    ]}>
                      ${service.price}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Centro Médico *</Text>
              {centers.map((center) => (
                <TouchableOpacity
                  key={center.id}
                  style={[
                    styles.centerCard,
                    selectedCenter === center.name && styles.centerCardSelected
                  ]}
                  onPress={() => setSelectedCenter(center.name)}
                >
                  <Text style={[
                    styles.centerName,
                    selectedCenter === center.name && styles.centerNameSelected
                  ]}>
                    {center.name}
                  </Text>
                  <Text style={[
                    styles.centerAddress,
                    selectedCenter === center.name && styles.centerAddressSelected
                  ]}>
                    {center.address}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Fecha *</Text>
              <TextInput
                style={styles.input}
                placeholder="YYYY-MM-DD"
                value={selectedDate}
                onChangeText={setSelectedDate}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Hora *</Text>
              <View style={styles.timeGrid}>
                {timeSlots.map((time) => (
                  <TouchableOpacity
                    key={time}
                    style={[
                      styles.timeSlot,
                      selectedTime === time && styles.timeSlotSelected
                    ]}
                    onPress={() => setSelectedTime(time)}
                  >
                    <Text style={[
                      styles.timeText,
                      selectedTime === time && styles.timeTextSelected
                    ]}>
                      {time}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Notas adicionales</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Información adicional sobre tu cita..."
                value={notes}
                onChangeText={setNotes}
                multiline
                numberOfLines={3}
              />
            </View>
          </ScrollView>

          <View style={styles.modalActions}>
            <TouchableOpacity 
              style={styles.cancelModalButton}
              onPress={() => setShowNewAppointmentModal(false)}
            >
              <Text style={styles.cancelModalButtonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.confirmButton}
              onPress={handleNewAppointment}
            >
              <Text style={styles.confirmButtonText}>Agendar Cita</Text>
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
  title: {
    fontSize: FONT_SIZES['2xl'],
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.white,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  newAppointmentButton: {
    borderRadius: BORDER_RADIUS.lg,
    overflow: 'hidden',
  },
  newAppointmentButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: CONTAINER_SPACING.button,
    paddingVertical: SPACING.md,
    gap: SPACING.sm,
  },
  newAppointmentButtonText: {
    color: COLORS.white,
    fontWeight: FONT_WEIGHTS.semibold,
    fontSize: FONT_SIZES.sm,
  },
  appointmentsList: {
    padding: CONTAINER_SPACING.screen,
    marginTop: -SPACING['2xl'],
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
    marginBottom: SPACING.lg,
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
  notesContainer: {
    marginBottom: SPACING.lg,
    padding: CONTAINER_SPACING.card,
    backgroundColor: COLORS.gray[50],
    borderRadius: BORDER_RADIUS.lg,
  },
  notesLabel: {
    fontSize: FONT_SIZES.xs,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.gray[600],
    marginBottom: SPACING.xs,
  },
  notesText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.gray[700],
  },
  appointmentActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: SPACING.lg,
  },
  cancelButton: {
    borderRadius: BORDER_RADIUS.lg,
    overflow: 'hidden',
  },
  cancelButtonGradient: {
    paddingHorizontal: CONTAINER_SPACING.button,
    paddingVertical: SPACING.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    color: COLORS.white,
    fontWeight: FONT_WEIGHTS.semibold,
    fontSize: FONT_SIZES.sm,
  },
  resultsButton: {
    borderRadius: BORDER_RADIUS.lg,
    overflow: 'hidden',
  },
  resultsButtonGradient: {
    paddingHorizontal: CONTAINER_SPACING.button,
    paddingVertical: SPACING.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultsButtonText: {
    color: COLORS.white,
    fontWeight: FONT_WEIGHTS.semibold,
    fontSize: FONT_SIZES.sm,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
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
  formGroup: {
    marginBottom: SPACING['3xl'],
  },
  label: {
    fontSize: FONT_SIZES.base,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.gray[700],
    marginBottom: SPACING.md,
  },
  serviceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
  },
  serviceCard: {
    width: '48%',
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.sm,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.gray[200],
  },
  serviceCardSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.gray[50],
  },
  serviceName: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.gray[700],
    marginBottom: SPACING.xs,
  },
  serviceNameSelected: {
    color: COLORS.primary,
  },
  servicePrice: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.gray[500],
  },
  servicePriceSelected: {
    color: COLORS.primary,
  },
  centerCard: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.sm,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.gray[200],
  },
  centerCardSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.gray[50],
  },
  centerName: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.gray[700],
    marginBottom: SPACING.xs,
  },
  centerNameSelected: {
    color: COLORS.primary,
  },
  centerAddress: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.gray[500],
  },
  centerAddressSelected: {
    color: COLORS.primary,
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
    height: 80,
    textAlignVertical: 'top',
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  timeSlot: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.sm,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.gray[200],
  },
  timeSlotSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.gray[50],
  },
  timeText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.gray[700],
  },
  timeTextSelected: {
    color: COLORS.primary,
    fontWeight: FONT_WEIGHTS.semibold,
  },
  modalActions: {
    flexDirection: 'row',
    padding: CONTAINER_SPACING.screen,
    gap: SPACING.md,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray[200],
  },
  cancelModalButton: {
    flex: 1,
    padding: CONTAINER_SPACING.button,
    borderRadius: BORDER_RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.gray[200],
    alignItems: 'center',
  },
  cancelModalButtonText: {
    fontSize: FONT_SIZES.base,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.gray[500],
  },
  confirmButton: {
    flex: 1,
    padding: CONTAINER_SPACING.button,
    borderRadius: BORDER_RADIUS.sm,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
  },
  confirmButtonText: {
    fontSize: FONT_SIZES.base,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.white,
  },
});

export default AppointmentScreen;
