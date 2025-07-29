// Base Entity
export interface BaseEntity {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Enums
export enum UserRole {
  CUSTOMER = 'customer',
  ADMIN = 'admin',
}

export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

// Core Entities
export interface User extends BaseEntity {
  email: string;
  password: string; // Note: Usually excluded in API responses
  firstName: string;
  lastName: string;
  role: UserRole;
  refreshToken?: string; // Note: Usually excluded in API responses
  cart?: Cart;
  orders: Order[];
}

export interface Category extends BaseEntity {
  name: string;
  description?: string;
  isActive: boolean;
  products?: Product[];
  productCount?: number; // For display purposes
}

export interface Product extends BaseEntity {
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  imageUrl?: string;
  isActive: boolean;
  category?: string; // Category ID for filtering
  categoryId?: string;
  cartItems?: CartItem[];
  orderItems?: OrderItem[];
}

export interface Cart extends BaseEntity {
  user?: User;
  userId?: string;
  userSession?: string; // For anonymous users
  items: CartItem[];
}

export interface CartItem extends BaseEntity {
  quantity: number;
  cart: Cart;
  cartId: string;
  product: Product;
  productId: string;
}

export interface Order extends BaseEntity {
  totalAmount: number;
  status: OrderStatus;
  user: User;
  userId: string;
  items: OrderItem[];
  shippingAddress?: string;
  notes?: string;
}

export interface OrderItem extends BaseEntity {
  quantity: number;
  priceAtTime: number; // Price when order was placed
  order: Order;
  orderId: string;
  product: Product;
  productId: string;
}

// DTOs (Data Transfer Objects)
export interface AddToCartDto {
  productId: string;
  quantity: number; // minimum: 1
}

export interface UpdateCartItemDto {
  quantity: number; // minimum: 1
}

export interface CartSummaryDto {
  totalItems: number;
  totalValue: number;
  uniqueProducts: number;
}

export interface CreateOrderDto {
  shippingAddress?: string;
  notes?: string;
}

export interface UpdateOrderStatusDto {
  status: OrderStatus;
}

export interface OrderSummaryDto {
  id: string;
  totalAmount: number;
  status: OrderStatus;
  totalItems: number;
  createdAt: Date;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}


export interface ProductCardProps {
  product: Product;
  showStock?: boolean;
  showAddToCart?: boolean;
}


export interface EcommerceState {
  user: User | null;
  cart: Cart | null;
  orders: Order[];
  products: Product[];
  categories: Category[];
  loading: boolean;
  error: string | null;
}

export interface EcommerceActions {
  addToCart: (item: AddToCartDto) => Promise<void>;
  updateCartItem: (itemId: string, update: UpdateCartItemDto) => Promise<void>;
  createOrder: (orderData: CreateOrderDto) => Promise<Order>;
  getOrders: () => Promise<Order[]>;
  getOrderSummaries: () => Promise<OrderSummaryDto[]>;
}

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
  accessToken: string;
  refreshToken: string;
}

export interface ProductQuery {
  category?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'name' | 'price' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}


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

// Dashboard interfaces
export interface DashboardRecentOrder {
  id: string;
  totalAmount: number;
  status: OrderStatus;
  customerName: string;
  createdAt: string;
}

export interface AdminDashboardStats {
  totalSales: number;
  totalOrders: number;
  totalProducts: number;
  totalUsers: number;
  recentOrders: DashboardRecentOrder[];
}

// this is the list of any data from the backend
export interface DataListResponse<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  }
}