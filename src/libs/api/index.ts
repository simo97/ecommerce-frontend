import type { ApiResponse } from '../interfaces/index.js';

export interface HttpClientConfig {
    baseURL?: string;
    headers?: Record<string, string>;
    timeout?: number;
}

export abstract class BaseResource {
    protected client: (url: string, options?: RequestInit) => Promise<Response>;
    protected baseURL: string;
    protected defaultHeaders: Record<string, string>;

    constructor(config: HttpClientConfig = {}) {
        this.baseURL = config.baseURL || 'http://localhost:3000/api';
        this.defaultHeaders = {
            'Content-Type': 'application/json',
            ...config.headers,
        };
        this.client = this.createHttpClient();
    }

    private createHttpClient() {
        return async (url: string, options: RequestInit = {}) => {
            const fullUrl = url.startsWith('http') ? url : `${this.baseURL}${url}`;
            
            // Automatically handle authentication
            const headers = {
                ...this.defaultHeaders,
                ...this.getAuthHeaders(),
                ...options.headers,
            };
            
            const config: RequestInit = {
                headers,
                ...options,
            };

            try {
                const response = await fetch(fullUrl, config);
                return response;
            } catch (error) {
                throw new Error(`HTTP request failed: ${error}`);
            }
        };
    }

    private getAuthHeaders(): Record<string, string> {
        const headers: Record<string, string> = {};
        
        // Check for auth token first (authenticated user)
        const authToken = localStorage.getItem('authToken');
        if (authToken) {
            headers['Authorization'] = `Bearer ${authToken}`;
        } else {
            // Use session token for anonymous users
            let sessionToken = localStorage.getItem('sessionToken');
            if (!sessionToken) {
                sessionToken = crypto.randomUUID();
                localStorage.setItem('sessionToken', sessionToken);
            }
            headers['x-session-token'] = sessionToken;
        }
        
        return headers;
    }

    protected async get<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
        const response = await this.client(endpoint, {
            method: 'GET',
            ...options,
        });
        return this.parseResponse<T>(response);
    }

    protected async post<T>(endpoint: string, data?: any, options: RequestInit = {}): Promise<ApiResponse<T>> {
        const response = await this.client(endpoint, {
            method: 'POST',
            body: data ? JSON.stringify(data) : undefined,
            ...options,
        });
        return this.parseResponse<T>(response);
    }

    protected async put<T>(endpoint: string, data?: any, options: RequestInit = {}): Promise<ApiResponse<T>> {
        const response = await this.client(endpoint, {
            method: 'PUT',
            body: data ? JSON.stringify(data) : undefined,
            ...options,
        });
        return this.parseResponse<T>(response);
    }

    protected async patch<T>(endpoint: string, data?: any, options: RequestInit = {}): Promise<ApiResponse<T>> {
        const response = await this.client(endpoint, {
            method: 'PATCH',
            body: data ? JSON.stringify(data) : undefined,
            ...options,
        });
        return this.parseResponse<T>(response);
    }

    protected async delete<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
        const response = await this.client(endpoint, {
            method: 'DELETE',
            ...options,
        });
        return this.parseResponse<T>(response);
    }

    private async parseResponse<T>(response: Response): Promise<ApiResponse<T>> {
        let data: T;
        
        try {
            const text = await response.text();
            data = text ? JSON.parse(text) : null as T;
        } catch (error) {
            if (!response.ok) {
                throw new Error(`${response.statusText}`);
            }
            data = null as T;
        }

        if (!response.ok) {
            const errorMessage = (data as any)?.message || response.statusText || 'Request failed';
            throw new Error(`${errorMessage}`);
        }

        return {
            data,
            message: response.statusText,
            status: response.status,
        };
    }

    public setAuthToken(token: string): void {
        this.defaultHeaders['Authorization'] = `Bearer ${token}`;
    }

    protected setSessionToken(sessionToken: string): void {
        this.defaultHeaders['x-session-token'] = sessionToken;
    }

    public removeAuthToken(): void {
        delete this.defaultHeaders['Authorization'];
    }
}