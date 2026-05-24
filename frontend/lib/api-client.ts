/**
 * Centralized API Client for PFE Management Platform
 * Handles authentication, base URLs, and error reporting.
 */

// Default base URL mapping for development across multiple microservices.
// If NEXT_PUBLIC_API_BASE_URL is set, use it as a fallback for unknown routes.
const DEV_SERVICE_MAP: Record<string, string> = {
  '/api/subjects': 'http://localhost:8081', // projects service
  '/api/tasks': 'http://localhost:8081', // projects service (tasks endpoint)
  '/api/free-subjects': 'http://localhost:8081', // projects service
  '/api/projects/free-subjects': 'http://localhost:8081', // projects service
  '/api/users': 'http://localhost:8082', // user service
  '/api/notifications': 'http://localhost:8085', // notification service
}

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || (process.env.NODE_ENV === 'development' ? '' : '');

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
    let url: string
    if (path.startsWith('http')) {
      url = path
    } else if (process.env.NODE_ENV === 'development') {
      // Determine which dev service should handle this path by matching prefixes.
      const match = Object.keys(DEV_SERVICE_MAP).find(prefix => path.startsWith(prefix))
      const serviceBase = match ? DEV_SERVICE_MAP[match] : BASE_URL || window.location.origin
      url = `${serviceBase}${path}`
    } else {
      url = `${BASE_URL}${path}`
    }

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

    // Dev logging: request details
    if (process.env.NODE_ENV === 'development') {
      try {
        const method = (config.method || 'GET').toString()
        const headersObj: Record<string, string> = {}
        if (headers && typeof (headers as any).entries === 'function') {
          for (const [k, v] of (headers as Headers).entries()) {
            headersObj[k] = v
          }
        }
        const bodyPreview = options.body && typeof options.body === 'string' ? options.body : JSON.stringify(options.body)
        // eslint-disable-next-line no-console
        console.debug('[apiClient] request ->', { method, url, headers: headersObj, body: bodyPreview })
      } catch (err) {
        // ignore
      }
    }

    let response: Response | null = null;
    try {
      response = await fetch(url, config);
    } catch (err) {
      // Fallback: if we're in the browser and the path is a relative API path, try origin-prefixed URL
      try {
        if (typeof window !== 'undefined' && !path.startsWith('http')) {
          const originUrl = `${window.location.origin}${path}`
          response = await fetch(originUrl, config)
        }
      } catch (err2) {
        // ignore second-level errors
      }

      if (!response) {
        throw new ApiError(
          `Unable to reach the API at ${url}. Check that the backend is running and the Next.js API proxy is configured.`,
          0
        )
      }
    }

    // Dev logging: response details
    if (process.env.NODE_ENV === 'development') {
      try {
        const clone = response.clone()
        const isJson = clone.headers.get('content-type')?.includes('application/json')
        const respBody = isJson ? await clone.json().catch(() => null) : await clone.text().catch(() => null)
        // eslint-disable-next-line no-console
        console.debug('[apiClient] response <-', { url, status: response.status, body: respBody })
      } catch (err) {
        // ignore
      }
    }

    return handleResponse<T>(response);
  },
};
