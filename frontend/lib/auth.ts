// Mock authentication data with test accounts
export type UserRole = 'student' | 'teacher' | 'coordinator';

export interface User {
  id: string;
  email: string;
  password: string;
  role: UserRole;
  name: string;
}

// Test accounts for development
export const MOCK_USERS: User[] = [
  {
    id: 'std001',
    email: 'student@example.com',
    password: 'password123',
    role: 'student',
    name: 'Ahmed Ben Ali',
  },
  {
    id: 'tch001',
    email: 'teacher@example.com',
    password: 'password123',
    role: 'teacher',
    name: 'Dr. Fatima Zahra',
  },
  {
    id: 'coo001',
    email: 'coordinator@example.com',
    password: 'password123',
    role: 'coordinator',
    name: 'Coordinator Admin',
  },
];

// Validate user credentials
export function validateUser(email: string, password: string): User | null {
  const user = MOCK_USERS.find(
    (u) => u.email === email && u.password === password
  );
  return user || null;
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
  }
}
