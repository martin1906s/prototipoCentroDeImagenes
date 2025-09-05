// Colores del tema - Esquema vibrante y profesional
export const COLORS = {
  // Colores primarios vibrantes
  primary: '#6366f1', // Indigo vibrante
  primaryDark: '#4f46e5',
  primaryLight: '#818cf8',
  
  // Colores secundarios modernos
  secondary: '#ec4899', // Rosa vibrante
  secondaryDark: '#db2777',
  secondaryLight: '#f472b6',
  
  // Colores de acento vibrantes
  accent: '#06b6d4', // Cian vibrante
  accentDark: '#0891b2',
  accentLight: '#22d3ee',
  
  // Colores de estado vibrantes
  danger: '#ef4444', // Rojo vibrante
  dangerDark: '#dc2626',
  dangerLight: '#f87171',
  warning: '#f59e0b', // Ámbar vibrante
  warningDark: '#d97706',
  warningLight: '#fbbf24',
  success: '#10b981', // Verde esmeralda
  successDark: '#059669',
  successLight: '#34d399',
  info: '#3b82f6', // Azul vibrante
  infoDark: '#2563eb',
  infoLight: '#60a5fa',
  
  // Gradientes vibrantes
  gradientPrimary: ['#6366f1', '#8b5cf6', '#ec4899'],
  gradientSecondary: ['#06b6d4', '#3b82f6', '#6366f1'],
  gradientAccent: ['#f59e0b', '#f97316', '#ef4444'],
  gradientSuccess: ['#10b981', '#34d399', '#06b6d4'],
  gray: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
  white: '#ffffff',
  black: '#000000',
};

// Tamaños de fuente
export const FONT_SIZES = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 28,
  '4xl': 32,
  '5xl': 36,
};

// Pesos de fuente
export const FONT_WEIGHTS = {
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
};

// Espaciado - Sistema de 8px base para mejor consistencia
export const SPACING = {
  xs: 4,      // 4px - Espaciado mínimo
  sm: 8,      // 8px - Espaciado pequeño
  md: 12,     // 12px - Espaciado medio
  lg: 16,     // 16px - Espaciado grande
  xl: 20,     // 20px - Espaciado extra grande
  '2xl': 24,  // 24px - Espaciado doble
  '3xl': 32,  // 32px - Espaciado triple
  '4xl': 40,  // 40px - Espaciado cuádruple
  '5xl': 48,  // 48px - Espaciado quíntuple
  '6xl': 56,  // 56px - Espaciado sextuple
  '7xl': 64,  // 64px - Espaciado séptuple
  '8xl': 72,  // 72px - Espaciado octuple
  '9xl': 80,  // 80px - Espaciado nonuple
  '10xl': 88, // 88px - Espaciado décuple
};

// Espaciado específico para contenedores
export const CONTAINER_SPACING = {
  screen: 24,        // Padding general de pantalla
  card: 20,          // Padding interno de tarjetas
  section: 32,       // Espaciado entre secciones
  header: 24,        // Padding del header
  content: 20,       // Padding del contenido principal
  modal: 24,         // Padding de modales
  form: 20,          // Padding de formularios
  list: 16,          // Padding de listas
  button: 16,        // Padding de botones
  input: 16,         // Padding de inputs
};

// Radios de borde
export const BORDER_RADIUS = {
  none: 0,
  sm: 4,
  md: 6,
  lg: 8,
  xl: 12,
  '2xl': 16,
  '3xl': 20,
  full: 9999,
};

// Sombras
export const SHADOWS = {
  sm: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
};

// Servicios médicos
export const MEDICAL_SERVICES = [
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
  },
];

// Categorías de servicios
export const SERVICE_CATEGORIES = [
  { id: 'all', name: 'Todos', icon: 'grid-outline' },
  { id: 'radiografias', name: 'Radiografías', icon: 'scan-outline' },
  { id: 'ecografias', name: 'Ecografías', icon: 'pulse-outline' },
  { id: 'mamografias', name: 'Mamografías', icon: 'heart-outline' },
  { id: 'tomografias', name: 'Tomografías', icon: 'layers-outline' },
  { id: 'resonancias', name: 'Resonancias', icon: 'magnet-outline' },
  { id: 'densitometrias', name: 'Densitometrías', icon: 'fitness-outline' },
];

// Centros médicos
export const MEDICAL_CENTERS = [
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
    description: 'Centro de diagnóstico por imágenes en Ambato, ciudad de las flores y las frutas.',
    specialties: ['Radiología General', 'Radiología Pediátrica']
  }
];

// Horarios de citas disponibles
export const TIME_SLOTS = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
  '11:00', '11:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30'
];

// Estados de citas
export const APPOINTMENT_STATUS = {
  SCHEDULED: 'scheduled',
  CONFIRMED: 'confirmed',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  NO_SHOW: 'no_show',
};

// Estados de resultados
export const RESULT_STATUS = {
  PROCESSING: 'processing',
  READY: 'ready',
  COMPLETED: 'completed',
  PENDING: 'pending',
};

// Roles de usuario
export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin',
  DOCTOR: 'doctor',
  TECHNICIAN: 'technician',
};

// Configuración de la aplicación
export const APP_CONFIG = {
  name: 'Centro Imagen',
  version: '1.0.0',
  description: 'Aplicación para gestión de citas y resultados médicos',
  supportEmail: 'soporte@centroimagen.com',
  supportPhone: '02-2345678',
  website: 'www.centroimagen.com',
  whatsapp: '+593-99-123-4567',
};

// Mensajes de error comunes
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Error de conexión. Verifica tu internet.',
  INVALID_CREDENTIALS: 'Credenciales inválidas.',
  USER_NOT_FOUND: 'Usuario no encontrado.',
  APPOINTMENT_NOT_FOUND: 'Cita no encontrada.',
  RESULT_NOT_FOUND: 'Resultado no encontrado.',
  INVALID_DATA: 'Datos inválidos.',
  UNAUTHORIZED: 'No autorizado.',
  FORBIDDEN: 'Acceso denegado.',
  SERVER_ERROR: 'Error del servidor. Intenta más tarde.',
  UNKNOWN_ERROR: 'Error desconocido.',
};

// Mensajes de éxito comunes
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Inicio de sesión exitoso.',
  REGISTER_SUCCESS: 'Registro exitoso.',
  APPOINTMENT_CREATED: 'Cita creada exitosamente.',
  APPOINTMENT_UPDATED: 'Cita actualizada exitosamente.',
  APPOINTMENT_CANCELLED: 'Cita cancelada exitosamente.',
  RESULT_UPLOADED: 'Resultado cargado exitosamente.',
  PROFILE_UPDATED: 'Perfil actualizado exitosamente.',
  PASSWORD_CHANGED: 'Contraseña cambiada exitosamente.',
};

// Validaciones
export const VALIDATION_RULES = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^[0-9]{10}$/,
  DNI_REGEX: /^[0-9]{10}$/,
  PASSWORD_MIN_LENGTH: 6,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
};

// Configuración de notificaciones
export const NOTIFICATION_CONFIG = {
  APPOINTMENT_REMINDER_HOURS: 24,
  RESULT_READY_DELAY_MINUTES: 30,
  WHATSAPP_MESSAGE_DELAY_SECONDS: 2,
};

export default {
  COLORS,
  FONT_SIZES,
  FONT_WEIGHTS,
  SPACING,
  CONTAINER_SPACING,
  BORDER_RADIUS,
  SHADOWS,
  MEDICAL_SERVICES,
  SERVICE_CATEGORIES,
  MEDICAL_CENTERS,
  TIME_SLOTS,
  APPOINTMENT_STATUS,
  RESULT_STATUS,
  USER_ROLES,
  APP_CONFIG,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  VALIDATION_RULES,
  NOTIFICATION_CONFIG,
};
