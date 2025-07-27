import type { Order, CreateOrderDto, UpdateOrderStatusDto, OrderSummaryDto, ApiResponse } from '../interfaces/index.js';
import { BaseResource, type HttpClientConfig } from './index.js';

export interface OrderQuery {
  status?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

export interface OrderListResponse {
  orders: Order[];
  total: number;
  page: number;
  totalPages: number;
}

export class OrderService extends BaseResource {
  constructor(config?: HttpClientConfig) {
    super(config);
  }

  // User order operations
  async createOrder(orderData: CreateOrderDto): Promise<ApiResponse<Order>> {
    return this.post<Order>('/orders', orderData);
  }

  async getUserOrders(query?: OrderQuery): Promise<ApiResponse<OrderListResponse>> {
    const searchParams = new URLSearchParams();
    
    if (query) {
      Object.entries(query).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
    }

    const endpoint = `/orders${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
    return this.get<OrderListResponse>(endpoint);
  }

  async getOrderSummaries(): Promise<ApiResponse<OrderSummaryDto[]>> {
    return this.get<OrderSummaryDto[]>('/orders/summaries');
  }

  async getOrder(orderId: string): Promise<ApiResponse<Order>> {
    return this.get<Order>(`/orders/${orderId}`);
  }

  async cancelOrder(orderId: string): Promise<ApiResponse<Order>> {
    return this.patch<Order>(`/orders/${orderId}/cancel`);
  }

  // Anonymous order operations
  async createAnonymousOrder(orderData: CreateOrderDto): Promise<ApiResponse<Order>> {
    return this.post<Order>('/orders/anonymous', orderData);
  }

  // Admin order operations
  async getAllOrders(query?: OrderQuery): Promise<ApiResponse<OrderListResponse>> {
    const searchParams = new URLSearchParams();
    
    if (query) {
      Object.entries(query).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
    }

    const endpoint = `/orders/admin/all${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
    return this.get<OrderListResponse>(endpoint);
  }

  async updateOrderStatus(orderId: string, statusUpdate: UpdateOrderStatusDto): Promise<ApiResponse<Order>> {
    return this.patch<Order>(`/orders/${orderId}/status`, statusUpdate);
  }

  async getOrderById(orderId: string): Promise<ApiResponse<Order>> {
    return this.get<Order>(`/orders/admin/${orderId}`);
  }

  // Utility method to set session token for anonymous operations
  setSessionToken(sessionToken: string): void {
    super.setSessionToken(sessionToken);
  }
}