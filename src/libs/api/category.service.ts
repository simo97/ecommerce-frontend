import type { Category, ApiResponse } from '../interfaces/index.js';
import { BaseResource, type HttpClientConfig } from './index.js';

export class CategoryService extends BaseResource {
  constructor(config?: HttpClientConfig) {
    super(config);
  }

  async getCategories(): Promise<ApiResponse<Category[]>> {
    return this.get<Category[]>('/categories');
  }

  async getActiveCategories(): Promise<ApiResponse<Category[]>> {
    return this.get<Category[]>('/categories/active');
  }

  async getCategory(id: string): Promise<ApiResponse<Category>> {
    return this.get<Category>(`/categories/${id}`);
  }

  async getCategoryWithProducts(id: string): Promise<ApiResponse<Category>> {
    return this.get<Category>(`/categories/${id}/products`);
  }

  // Admin methods
  async createCategory(categoryData: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Category>> {
    return this.post<Category>('/admin/categories', categoryData);
  }

  async updateCategory(id: string, categoryData: Partial<Category>): Promise<ApiResponse<Category>> {
    return this.patch<Category>(`/admin/categories/${id}`, categoryData);
  }

  async deleteCategory(id: string): Promise<ApiResponse<void>> {
    return this.delete<void>(`/admin/categories/${id}`);
  }

  async toggleCategoryStatus(id: string): Promise<ApiResponse<Category>> {
    return this.patch<Category>(`/admin/categories/${id}/toggle-status`);
  }
}