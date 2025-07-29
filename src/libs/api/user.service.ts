import type { User, ApiResponse, UserRole, DataListResponse } from '../interfaces/index.js';
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

export interface UserQuery {
  role?: string;
  search?: string;
  page?: number;
  limit?: number;
  activityFilter?: string;
}

export interface UserListResponse {
  users: User[];
  total: number;
  page: number;
  totalPages: number;
  data: User[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  }
}

export interface UpdateUserRoleDto {
  role: UserRole;
}

export interface UserStats {
  ordersCount: number;
  totalSpent: number;
  lastActivity: string;
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

  // Admin user management operations
  async getAllUsers(query?: UserQuery): Promise<ApiResponse<DataListResponse<User>>> {
    const searchParams = new URLSearchParams();
    
    if (query) {
      Object.entries(query).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
    }

    const endpoint = `/users/admin/all${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
    return this.get<DataListResponse<User>>(endpoint);
  }

  async getUserById(userId: string): Promise<ApiResponse<User>> {
    return this.get<User>(`/users/admin/${userId}`);
  }

  async updateUserRole(userId: string, roleUpdate: UpdateUserRoleDto): Promise<ApiResponse<User>> {
    return this.patch<User>(`/users/admin/${userId}/role`, roleUpdate);
  }

  async deleteUser(userId: string): Promise<ApiResponse<void>> {
    return this.delete<void>(`/users/admin/${userId}`);
  }

  async getUserStats(userId: string): Promise<ApiResponse<UserStats>> {
    return this.get<UserStats>(`/users/admin/${userId}/stats`);
  }

  async getAllUsersStats(): Promise<ApiResponse<{ [userId: string]: UserStats }>> {
    return this.get<{ [userId: string]: UserStats }>('/users/admin/stats/all');
  }
}