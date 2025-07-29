import type { Product, ApiResponse, DataListResponse } from '../interfaces/index.js';
import { BaseResource, type HttpClientConfig } from './index.js';

export interface ProductQuery {
  categoryId?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'name' | 'price' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export class ProductService extends BaseResource {
  constructor(config?: HttpClientConfig) {
    super(config);
  }

  async getProducts(query?: ProductQuery): Promise<ApiResponse<DataListResponse<Product>>> {
    const searchParams = new URLSearchParams();
    
    if (query) {
      Object.entries(query).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
    }

    const endpoint = `/catalogue${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
    return this.get<DataListResponse<Product>>(endpoint);
  }

  async getProduct(id: string): Promise<ApiResponse<Product>> {
    return this.get<Product>(`/catalogue/${id}`);
  }

  async searchProducts(query: string): Promise<ApiResponse<Product[]>> {
    return this.get<Product[]>(`/catalogue/search?q=${encodeURIComponent(query)}`);
  }

  async getProductsByCategory(categoryId: string): Promise<ApiResponse<Product[]>> {
    return this.get<Product[]>(`/catalogue/category/${categoryId}`);
  }

  // Admin methods
  async createProduct(productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Product>> {
    return this.post<Product>('/catalogue/admin/products', productData);
  }

  async updateProduct(id: string, productData: Partial<Product>): Promise<ApiResponse<Product>> {
    return this.patch<Product>(`/catalogue/admin/${id}`, productData);
  }

  async deleteProduct(id: string): Promise<ApiResponse<void>> {
    return this.delete<void>(`/catalogue/admin/${id}`);
  }

  async getAdminProducts(query?: ProductQuery): Promise<ApiResponse<DataListResponse<Product>>> {
    const searchParams = new URLSearchParams();
    
    if (query) {
      Object.entries(query).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
    }

    const endpoint = `/catalogue/admin/products${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
    return this.get<DataListResponse<Product>>(endpoint);
  }
}
