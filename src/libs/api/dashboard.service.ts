import type { AdminDashboardStats, ApiResponse } from '../interfaces/index.js';
import { BaseResource, type HttpClientConfig } from './index.js';

export class DashboardService extends BaseResource {
  constructor(config?: HttpClientConfig) {
    super(config);
  }

  async getAdminDashboard(): Promise<ApiResponse<AdminDashboardStats>> {
    return this.get<AdminDashboardStats>('/catalogue/admin/dashboard');
  }
}