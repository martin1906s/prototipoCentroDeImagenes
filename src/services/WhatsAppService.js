import { Linking } from 'react-native';

class WhatsAppService {
  /**
   * Envía un mensaje de confirmación de cita por WhatsApp
   * @param {string} phoneNumber - Número de teléfono del usuario
   * @param {Object} appointmentData - Datos de la cita
   */
  static sendAppointmentConfirmation(phoneNumber, appointmentData) {
    const message = `🏥 *Centro Imagen - Confirmación de Cita*

¡Hola ${appointmentData.userName}! 

Tu cita ha sido confirmada exitosamente:

📅 *Fecha:* ${appointmentData.date}
🕐 *Hora:* ${appointmentData.time}
🏥 *Servicio:* ${appointmentData.service}
📍 *Centro:* ${appointmentData.center}
💰 *Precio:* $${appointmentData.price}

*Instrucciones importantes:*
• Llega 15 minutos antes de tu cita
• Trae tu cédula de identidad
• ${appointmentData.preparation || 'No requiere preparación especial'}

Si necesitas cancelar o reprogramar, contáctanos al 02-2345678.

¡Te esperamos! 🩺`;

    this.sendMessage(phoneNumber, message);
  }

  /**
   * Envía notificación de resultados listos
   * @param {string} phoneNumber - Número de teléfono del usuario
   * @param {Object} resultData - Datos del resultado
   */
  static sendResultsReady(phoneNumber, resultData) {
    const message = `🏥 *Centro Imagen - Resultados Listos*

¡Hola ${resultData.userName}!

Tus resultados están listos para revisar:

📅 *Fecha del estudio:* ${resultData.date}
🏥 *Servicio:* ${resultData.service}
👨‍⚕️ *Doctor:* ${resultData.doctor}

*Diagnóstico:* ${resultData.diagnosis}

Puedes acceder a tus resultados desde la aplicación o en nuestro centro médico.

Si tienes alguna pregunta, no dudes en contactarnos.

¡Gracias por confiar en nosotros! 🩺`;

    this.sendMessage(phoneNumber, message);
  }

  /**
   * Envía notificación de cita cancelada/reprogramada
   * @param {string} phoneNumber - Número de teléfono del usuario
   * @param {Object} appointmentData - Datos de la cita
   * @param {string} reason - Razón del cambio
   */
  static sendAppointmentUpdate(phoneNumber, appointmentData, reason) {
    const message = `🏥 *Centro Imagen - Actualización de Cita*

¡Hola ${appointmentData.userName}!

Tu cita ha sido ${reason}:

📅 *Nueva fecha:* ${appointmentData.newDate || appointmentData.date}
🕐 *Nueva hora:* ${appointmentData.newTime || appointmentData.time}
🏥 *Servicio:* ${appointmentData.service}
📍 *Centro:* ${appointmentData.center}

*Motivo:* ${appointmentData.reason || 'Por favor contacta con nosotros para más información'}

Si tienes alguna pregunta, contáctanos al 02-2345678.

¡Gracias por tu comprensión! 🩺`;

    this.sendMessage(phoneNumber, message);
  }

  /**
   * Envía recordatorio de cita
   * @param {string} phoneNumber - Número de teléfono del usuario
   * @param {Object} appointmentData - Datos de la cita
   */
  static sendAppointmentReminder(phoneNumber, appointmentData) {
    const message = `🏥 *Centro Imagen - Recordatorio de Cita*

¡Hola ${appointmentData.userName}!

Te recordamos que tienes una cita mañana:

📅 *Fecha:* ${appointmentData.date}
🕐 *Hora:* ${appointmentData.time}
🏥 *Servicio:* ${appointmentData.service}
📍 *Centro:* ${appointmentData.center}

*Instrucciones:*
• Llega 15 minutos antes
• Trae tu cédula de identidad
• ${appointmentData.preparation || 'No requiere preparación especial'}

Si necesitas cancelar o reprogramar, contáctanos al 02-2345678.

¡Te esperamos! 🩺`;

    this.sendMessage(phoneNumber, message);
  }

  /**
   * Envía mensaje de bienvenida a nuevos usuarios
   * @param {string} phoneNumber - Número de teléfono del usuario
   * @param {string} userName - Nombre del usuario
   */
  static sendWelcomeMessage(phoneNumber, userName) {
    const message = `🏥 *Centro Imagen - ¡Bienvenido!*

¡Hola ${userName}!

¡Bienvenido a Centro Imagen! 🎉

Ahora puedes:
• Agendar citas desde la app
• Ver tus resultados médicos
• Consultar nuestros servicios
• Encontrar nuestros centros

*Nuestros servicios:*
🩺 Radiografías
🩺 Ecografías  
🩺 Mamografías
🩺 Tomografías
🩺 Resonancias Magnéticas
🩺 Densitometrías

Si tienes alguna pregunta, contáctanos al 02-2345678.

¡Gracias por elegirnos! 🩺`;

    this.sendMessage(phoneNumber, message);
  }

  /**
   * Envía mensaje de promoción o notificación general
   * @param {string} phoneNumber - Número de teléfono del usuario
   * @param {string} title - Título del mensaje
   * @param {string} content - Contenido del mensaje
   */
  static sendPromotionalMessage(phoneNumber, title, content) {
    const message = `🏥 *Centro Imagen - ${title}*

${content}

Para más información, contáctanos al 02-2345678.

¡Gracias por confiar en nosotros! 🩺`;

    this.sendMessage(phoneNumber, message);
  }

  /**
   * Método principal para enviar mensajes por WhatsApp
   * @param {string} phoneNumber - Número de teléfono (formato: +593XXXXXXXXX)
   * @param {string} message - Mensaje a enviar
   */
  static sendMessage(phoneNumber, message) {
    try {
      // Limpiar el número de teléfono
      const cleanPhone = phoneNumber.replace(/\D/g, '');
      
      // Asegurar que tenga el código de país
      const formattedPhone = cleanPhone.startsWith('593') ? cleanPhone : `593${cleanPhone}`;
      
      // Crear la URL de WhatsApp
      const url = `whatsapp://send?phone=${formattedPhone}&text=${encodeURIComponent(message)}`;
      
      // Abrir WhatsApp
      Linking.openURL(url).catch(() => {
        console.error('No se pudo abrir WhatsApp');
        // Fallback: intentar abrir en el navegador
        const webUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`;
        Linking.openURL(webUrl);
      });
    } catch (error) {
      console.error('Error al enviar mensaje por WhatsApp:', error);
    }
  }

  /**
   * Verifica si WhatsApp está instalado
   * @returns {Promise<boolean>}
   */
  static async isWhatsAppInstalled() {
    try {
      const url = 'whatsapp://send?phone=593999999999&text=test';
      const canOpen = await Linking.canOpenURL(url);
      return canOpen;
    } catch (error) {
      console.error('Error al verificar WhatsApp:', error);
      return false;
    }
  }

  /**
   * Envía mensaje de contacto directo
   * @param {string} phoneNumber - Número de teléfono del usuario
   */
  static sendContactMessage(phoneNumber) {
    const message = `🏥 *Centro Imagen*

¡Hola! 👋

¿En qué podemos ayudarte hoy?

*Nuestros servicios:*
🩺 Radiografías
🩺 Ecografías
🩺 Mamografías
🩺 Tomografías
🩺 Resonancias Magnéticas
🩺 Densitometrías

*Horarios de atención:*
Lunes a Viernes: 7:00 AM - 7:00 PM
Sábados: 8:00 AM - 4:00 PM
Domingos: 8:00 AM - 2:00 PM

*Contacto:*
📞 02-2345678
📧 info@centroimagen.com
🌐 www.centroimagen.com

¡Estamos aquí para cuidar tu salud! 🩺`;

    this.sendMessage(phoneNumber, message);
  }
}

export default WhatsAppService;
