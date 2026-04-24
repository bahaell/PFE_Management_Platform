import { apiClient } from './api-client';

export type UserRole = 'student' | 'teacher' | 'coordinator';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

// Validate user credentials via backend API
export async function validateUser(email: string, password: string): Promise<User | null> {
  try {
    const data = await apiClient.post<AuthResponse>('/api/auth/login', { email, password });
    if (data && data.token && data.user) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth_token', data.token);
      }
      if (data.user.role) data.user.role = data.user.role.toLowerCase() as UserRole;
      return data.user;
    }
    return null;
  } catch (error) {
    console.error('Login failed', error);
    return null;
  }
}

// Register a new user via backend API
export async function registerUser(userData: any): Promise<User | null> {
  try {
    const data = await apiClient.post<AuthResponse>('/api/auth/register', userData);
    if (data && data.token && data.user) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth_token', data.token);
      }
      if (data.user.role) data.user.role = data.user.role.toLowerCase() as UserRole;
      console.log(data.user);
      return data.user;
    }
    return null;
  } catch (error) {
    console.error('Registration failed', error);
    return null;
  }
}

// Store/retrieve auth state from localStorage
export function setAuthState(user: User) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('auth_user', JSON.stringify(user));
  }
}

export function getAuthState(): User | null {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem('auth_user');
  return stored ? JSON.parse(stored) : null;
}

export function clearAuthState() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_user');
    localStorage.removeItem('auth_token');
  }
}
