# API Client Library

Complete TypeScript API client for the platform with type-safe service classes.

## Quick Start

```typescript
import { apiClient } from './libs/api/client.js';

// Login user
const loginResponse = await apiClient.users.login({
  email: 'user@example.com',
  password: 'password123'
});

// Set auth token for authenticated requests
if (loginResponse.data?.accessToken) {
  apiClient.setAuthToken(loginResponse.data.accessToken);
}

// Get products
const products = await apiClient.products.getProducts();

// Add to cart
await apiClient.cart.addToCart({
  productId: 'product-123',
  quantity: 2
});
```

## Services

### UserService
- `login(credentials)` - User authentication
- `register(userData)` - User registration
- `getProfile()` - Get user profile
- `updateProfile(data)` - Update user profile
- `logout()` - User logout

### ProductService
- `getProducts(query?)` - Get products with filtering/pagination
- `getProduct(id)` - Get single product
- `getFeaturedProducts()` - Get featured products
- `searchProducts(query)` - Search products
- `getProductsByCategory(categoryId)` - Get products by category

### CategoryService
- `getCategories()` - Get all categories
- `getActiveCategories()` - Get active categories only
- `getCategory(id)` - Get single category
- `getCategoryWithProducts(id)` - Get category with its products

### CartService
- `getCart()` - Get authenticated user cart
- `addToCart(item)` - Add item to cart
- `updateCartItem(itemId, update)` - Update cart item quantity
- `removeCartItem(itemId)` - Remove item from cart
- `emptyCart()` - Empty entire cart
- `getCartSummary()` - Get cart summary

**Anonymous Cart Operations:**
- `addToAnonymousCart(item)` - Add to anonymous cart
- `getAnonymousCart()` - Get anonymous cart
- Similar methods for anonymous users

### OrderService
- `createOrder(orderData)` - Create order from cart
- `getUserOrders(query?)` - Get user order history
- `getOrder(orderId)` - Get specific order
- `cancelOrder(orderId)` - Cancel order
- `getOrderSummaries()` - Get order summaries

## Configuration

```typescript
import { createApiClient } from './libs/api/client.js';

const customClient = createApiClient({
  baseURL: 'https://your-api.com/api',
  headers: {
    'Custom-Header': 'value'
  }
});
```

## Authentication

```typescript
// Set JWT token for authenticated requests
apiClient.setAuthToken('your-jwt-token');

// Set session token for anonymous operations
apiClient.setSessionToken('session-token');

// Remove authentication
apiClient.removeAuthToken();
```

## Error Handling

All methods throw errors for failed requests. Wrap in try-catch:

```typescript
try {
  const products = await apiClient.products.getProducts();
} catch (error) {
  console.error('API Error:', error.message);
}
```
