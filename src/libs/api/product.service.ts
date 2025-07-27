import type { Product, ApiResponse } from '../interfaces/index.js';
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

export interface ProductListResponse {
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
}

export class ProductService extends BaseResource {
  constructor(config?: HttpClientConfig) {
    super(config);
  }

  async getProducts(query?: ProductQuery): Promise<ApiResponse<ProductListResponse>> {
    const searchParams = new URLSearchParams();
    
    if (query) {
      Object.entries(query).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
    }

    const endpoint = `/products${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
    return this.get<ProductListResponse>(endpoint);
  }

  async getProduct(id: string): Promise<ApiResponse<Product>> {
    return this.get<Product>(`/products/${id}`);
  }

  async getFeaturedProducts(): Promise<ApiResponse<Product[]>> {
    return this.get<Product[]>('/products/featured');
  }

  async searchProducts(query: string): Promise<ApiResponse<Product[]>> {
    return this.get<Product[]>(`/products/search?q=${encodeURIComponent(query)}`);
  }

  async getProductsByCategory(categoryId: string): Promise<ApiResponse<Product[]>> {
    return this.get<Product[]>(`/products/category/${categoryId}`);
  }

  // Admin methods
  async createProduct(productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Product>> {
    return this.post<Product>('/admin/products', productData);
  }

  async updateProduct(id: string, productData: Partial<Product>): Promise<ApiResponse<Product>> {
    return this.patch<Product>(`/admin/products/${id}`, productData);
  }

  async deleteProduct(id: string): Promise<ApiResponse<void>> {
    return this.delete<void>(`/admin/products/${id}`);
  }
}