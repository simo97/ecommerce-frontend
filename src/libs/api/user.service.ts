import type { User, ApiResponse } from '../interfaces/index.js';
import { BaseResource, type HttpClientConfig } from './index.js';

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface AuthResponse {
  user: User;
  access_token: string;
  refreshToken: string;
}

export class UserService extends BaseResource {
  constructor(config?: HttpClientConfig) {
    super(config);
  }

  async login(credentials: LoginDto): Promise<ApiResponse<AuthResponse>> {
    return this.post<AuthResponse>('/auth/signin', credentials);
  }

  async register(userData: RegisterDto): Promise<ApiResponse<AuthResponse>> {
    return this.post<AuthResponse>('/auth/register', userData);
  }

  async getProfile(): Promise<ApiResponse<User>> {
    return this.get<User>('/auth/profile');
  }

  async updateProfile(userData: Partial<User>): Promise<ApiResponse<User>> {
    return this.patch<User>('/auth/profile', userData);
  }

  async refreshToken(refreshToken: string): Promise<ApiResponse<AuthResponse>> {
    return this.post<AuthResponse>('/auth/refresh', { refreshToken });
  }

  async logout(): Promise<ApiResponse<void>> {
    const response = await this.post<void>('/auth/logout');
    this.removeAuthToken();
    return response;
  }
}