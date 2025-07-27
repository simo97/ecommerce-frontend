import type { Cart, CartItem, AddToCartDto, UpdateCartItemDto, CartSummaryDto, ApiResponse } from '../interfaces/index.js';
import { BaseResource, type HttpClientConfig } from './index.js';

export class CartService extends BaseResource {
  constructor(config?: HttpClientConfig) {
    super(config);
  }

  // Authenticated cart operations
  async getCart(): Promise<ApiResponse<Cart>> {
    return this.get<Cart>('/cart');
  }

  async addToCart(item: AddToCartDto): Promise<ApiResponse<CartItem>> {
    return this.post<CartItem>('/cart/add', item);
  }

  async updateCartItem(itemId: string, update: UpdateCartItemDto): Promise<ApiResponse<CartItem>> {
    return this.patch<CartItem>(`/cart/${itemId}/update`, update);
  }

  async removeCartItem(itemId: string): Promise<ApiResponse<void>> {
    return this.delete<void>(`/cart/remove/${itemId}`);
  }

  async emptyCart(): Promise<ApiResponse<void>> {
    return this.delete<void>('/cart/empty');
  }

  async getCartSummary(): Promise<ApiResponse<CartSummaryDto>> {
    return this.get<CartSummaryDto>('/cart/summary');
  }

  // Anonymous cart operations (using session token)
  async addToAnonymousCart(item: AddToCartDto): Promise<ApiResponse<CartItem>> {
    return this.post<CartItem>('/cart/anonymous/add', item);
  }

  async getAnonymousCart(): Promise<ApiResponse<Cart>> {
    return this.get<Cart>('/cart/anonymous');
  }

  async updateAnonymousCartItem(itemId: string, update: UpdateCartItemDto): Promise<ApiResponse<CartItem>> {
    return this.patch<CartItem>(`/cart/anonymous/${itemId}/update`, update);
  }

  async removeAnonymousCartItem(itemId: string): Promise<ApiResponse<void>> {
    return this.delete<void>(`/cart/anonymous/remove/${itemId}`);
  }

  async emptyAnonymousCart(): Promise<ApiResponse<void>> {
    return this.delete<void>('/cart/anonymous/empty');
  }

  async getAnonymousCartSummary(): Promise<ApiResponse<CartSummaryDto>> {
    return this.get<CartSummaryDto>('/cart/anonymous/summary');
  }

  // Utility method to set session token for anonymous operations
  setSessionToken(sessionToken: string): void {
    super.setSessionToken(sessionToken);
  }
}