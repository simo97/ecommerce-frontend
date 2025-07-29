import { OrderStatus, UserRole } from '../interfaces/index.js';

export const getOrderStatusColor = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.PENDING: return 'bg-secondary-100 text-secondary-800';
    case OrderStatus.CONFIRMED: return 'bg-primary-100 text-primary-800';
    case OrderStatus.PROCESSING: return 'bg-accent-100 text-accent-800';
    case OrderStatus.SHIPPED: return 'bg-blue-100 text-blue-800';
    case OrderStatus.DELIVERED: return 'bg-success-100 text-success-800';
    case OrderStatus.CANCELLED: return 'bg-error-100 text-error-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const getOrderStatusLabel = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.PENDING: return 'En attente';
    case OrderStatus.CONFIRMED: return 'Confirmée';
    case OrderStatus.PROCESSING: return 'En traitement';
    case OrderStatus.SHIPPED: return 'Expédiée';
    case OrderStatus.DELIVERED: return 'Livrée';
    case OrderStatus.CANCELLED: return 'Annulée';
    default: return status;
  }
};

export const getProductStatusColor = (isActive: boolean) => {
  return isActive 
    ? 'bg-success-100 text-success-800' 
    : 'bg-error-100 text-error-800';
};

export const getStockStatusColor = (stockQuantity: number) => {
  if (stockQuantity > 20) return 'bg-success-100 text-success-800';
  if (stockQuantity > 10) return 'bg-secondary-100 text-secondary-800';
  return 'bg-error-100 text-error-800';
};

export const getUserRoleColor = (role: UserRole) => {
  switch (role) {
    case UserRole.ADMIN: return 'bg-primary-100 text-primary-800';
    case UserRole.CUSTOMER: return 'bg-gray-100 text-gray-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const getUserRoleLabel = (role: UserRole) => {
  switch (role) {
    case UserRole.ADMIN: return 'Admin';
    case UserRole.CUSTOMER: return 'Client';
    default: return role;
  }
};