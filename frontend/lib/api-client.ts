/**
 * Centralized API Client for PFE Management Platform
 * Handles authentication, base URLs, and error reporting.
 */

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

export class ApiError extends Error {
  status?: number;
  errors?: Record<string, string>;

  constructor(message: string, status?: number, errors?: Record<string, string>) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.errors = errors;
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  const isJson = response.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await response.json() : null;

  if (!response.ok) {
    const error = new ApiError(
      data?.message || response.statusText || 'An unexpected error occurred',
      response.status,
      data?.errors
    );

    // Global handling for specific status codes
    if (response.status === 401) {
      // Logic for unauthorized (e.g., clear tokens, redirect to login)
      console.warn('Unauthorized access - redirecting to login');
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
        // window.location.href = '/login';
      }
    }

    throw error;
  }

  return data as T;
}

export const apiClient = {
  async get<T>(path: string, options: RequestInit = {}): Promise<T> {
    return apiClient.request<T>(path, { ...options, method: 'GET' });
  },

  async post<T>(path: string, body: any, options: RequestInit = {}): Promise<T> {
    return apiClient.request<T>(path, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body),
    });
  },

  async put<T>(path: string, body: any, options: RequestInit = {}): Promise<T> {
    return apiClient.request<T>(path, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(body),
    });
  },

  async patch<T>(path: string, body: any, options: RequestInit = {}): Promise<T> {
    return apiClient.request<T>(path, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(body),
    });
  },

  async delete<T>(path: string, options: RequestInit = {}): Promise<T> {
    return apiClient.request<T>(path, { ...options, method: 'DELETE' });
  },

  async request<T>(path: string, options: RequestInit = {}): Promise<T> {
    const url = path.startsWith('http') ? path : `${BASE_URL}${path}`;

    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;

    const headers = new Headers(options.headers);
    if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
      headers.set('Content-Type', 'application/json');
    }
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    const config: RequestInit = {
      ...options,
      headers,
    };

    let response: Response;
    try {
      response = await fetch(url, config);
    } catch (err) {
      throw new ApiError(
        `Unable to reach the API at ${url}. Check that the backend is running and the Next.js API proxy is configured.`,
        0
      );
    }

    return handleResponse<T>(response);
  },
};
