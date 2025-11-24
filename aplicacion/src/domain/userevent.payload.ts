export interface UserEventPayload {
  eventType: string;            // login, logout, viewProfile, deleteAccount, register, googleSignup, passwordRecovery
  userId?: string;              // ID interno del usuario
  email?: string;               // correo del usuario
  timestamp: string;            // fecha y hora del evento
  source: 'web',
  ipAddress?: string;           // IP del cliente
  userAgent?: string;           // navegador / app info
  sessionId?: string;           // ID de sesión, si aplica
  details?: Record<string, any>; // información contextual: perfil visto, cambios de datos, error ocurrido, etc.
  outcome?: 'success' | 'failure'; // si la acción fue exitosa o no
}
