import { UserService } from './user.service.js';
import { ProductService } from './product.service.js';
import { CategoryService } from './category.service.js';
import { CartService } from './cart.service.js';
import { OrderService } from './order.service.js';
import type { HttpClientConfig } from './index.js';

export class ApiClient {
  private _users: UserService;
  private _products: ProductService;
  private _categories: CategoryService;
  private _cart: CartService;
  private _orders: OrderService;
  private config: HttpClientConfig;

  constructor(config: HttpClientConfig = {}) {
    this.config = {
      baseURL: 'http://localhost:3000/api',
      ...config,
    };

    this._users = new UserService(this.config);
    this._products = new ProductService(this.config);
    this._categories = new CategoryService(this.config);
    this._cart = new CartService(this.config);
    this._orders = new OrderService(this.config);
  }

  get users(): UserService {
    return this._users;
  }

  get products(): ProductService {
    return this._products;
  }

  get categories(): CategoryService {
    return this._categories;
  }

  get cart(): CartService {
    return this._cart;
  }

  get orders(): OrderService {
    return this._orders;
  }

  // Global authentication methods
  setAuthToken(token: string): void {
    this._users.setAuthToken(token);
    this._products.setAuthToken(token);
    this._categories.setAuthToken(token);
    this._cart.setAuthToken(token);
    this._orders.setAuthToken(token);
  }

  setSessionToken(sessionToken: string): void {
    this._cart.setSessionToken(sessionToken);
    this._orders.setSessionToken(sessionToken);
  }

  removeAuthToken(): void {
    this._users.removeAuthToken();
    this._products.removeAuthToken();
    this._categories.removeAuthToken();
    this._cart.removeAuthToken();
    this._orders.removeAuthToken();
  }

  // Convenience method for updating base URL
  updateBaseURL(baseURL: string): void {
    this.config.baseURL = baseURL;
    // Recreate services with new config
    this._users = new UserService(this.config);
    this._products = new ProductService(this.config);
    this._categories = new CategoryService(this.config);
    this._cart = new CartService(this.config);
    this._orders = new OrderService(this.config);
  }
}

// Create and export a default instance
export const apiClient = new ApiClient();

// Export factory function for custom configurations
export function createApiClient(config?: HttpClientConfig): ApiClient {
  return new ApiClient(config);
}