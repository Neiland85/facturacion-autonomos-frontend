// Estructura centralizada de endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    REFRESH_TOKEN: '/auth/refresh-token',
    LOGOUT: '/auth/logout',
  },
  USERS: {
    BASE: '/users',
    DETAILS: (id: string) => `/users/${id}`,
    UPDATE: (id: string) => `/users/${id}`,
  },
  CLIENTS: {
    BASE: '/clients',
    DETAILS: (id: string) => `/clients/${id}`,
    CREATE: '/clients',
    UPDATE: (id: string) => `/clients/${id}`,
    DELETE: (id: string) => `/clients/${id}`,
  },
  INVOICES: {
    BASE: '/invoices',
    CREATE: '/invoices',
    DETAILS: (id: string) => `/invoices/${id}`,
    UPDATE: (id: string) => `/invoices/${id}`,
    DELETE: (id: string) => `/invoices/${id}`,
    BY_USER: (userId: string) => `/invoices/user// Estructura centralizada de endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    REFRESH_TOKEN: '/auth/refresh-token',
    LOGOUT: '/auth/logout',
  },
  USERS: {
    BASE: '/users',
    DETAILS: (id: string) => `/users/${id}`,
    UPDATE: (id: string) => `/users/${id}`,
  },
  CLIENTS: {
    BASE: '/clients',
    DETAILS: (id: string) => `/clients/${id}`,
    CREATE: '/clients',
    UPDATE: (id: string) => `/clients/${id}`,
    DELETE: (id: string) => `/clients/${id}`,
  },
  INVOICES: {
    BASE: '/invoices',
    CREATE: '/invoices',
    DETAILS: (id: string) => `/invoices/${id}`,
    UPDATE: (id: string) => `/invoices/${id}`,
    DELETE: (id: string) => `/invoices/${id}`,
    BY_USER: (userId: string) => `/invoices/user
