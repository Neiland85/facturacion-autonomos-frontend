import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// Configuración de base
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

// Creación de cliente HTTP
export const createApiClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  // Añadir interceptores
  client.interceptors.request.use(
    (config) => {
      // Obtener token de localStorage/session
      const token = localStorage.getItem('auth_token');
      
      // Añadir token a las cabeceras si existe
      if (token) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        };
      }
      
      return config;
    },
    (error) => Promise.reject(error)
  );
  
  client.interceptors.response.use(
    (response) => response,
    (error) => {
      // Manejar errores (401, 403, etc)
      if (error.response?.status === 401) {
        // Redirigir a login o refrescar token
        console.log('Session expirada');
        localStorage.removeItem('auth_token');
        // window.location.href = '/login';
      }
      
      return Promise.reject(error);
    }
  );
  
  return client;
};

// Cliente predeterminado para uso en toda la aplicación
export const apiClient = createApiClient();

// Función de utilidad para hacer peticiones tipadas
export const apiRequest = async <T>(config: AxiosRequestConfig): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await apiClient(config);
    return response.data;
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
};
