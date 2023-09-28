// TurnosNotificationService.js
import PushNotification from 'react-native-push-notification';

// Configura las notificaciones programadas aquí
function scheduleNotifications(turno) {
  // ... Configuración de notificaciones programadas similar a la anterior
}

// Define la función principal del servicio Headless JS
const TurnosNotificationService = async (taskData) => {
  const { turno } = taskData;

  if (turno) {
    scheduleNotifications(turno);
  }

  // ¡Importante! Debes indicar que el servicio ha terminado
  // Esto es necesario para que el servicio se ejecute solo una vez
  // y se programe nuevamente según sea necesario
  PushNotification.finish(PushNotification.NOOP);
};

export default TurnosNotificationService;
