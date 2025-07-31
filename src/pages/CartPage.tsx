import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { type CartItem, type CreateOrderDto } from '../libs/interfaces';
import { apiClient } from '../libs/api/client.js';
import { userAtom } from '../libs/atoms.js';

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [orderLoading, setOrderLoading] = useState(false);
  const [user] = useAtom(userAtom);

  console.log({user})

  const fetchCart = async () => {
    setLoading(true);
    try {
      let response;
      if (user) {
        response = await apiClient.cart.getCart();
        setCartItems(response.data.items || []);
      }
      
    } catch (error) {
      console.error('Failed to fetch cart:', error);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    try {
      if (user) {
        await apiClient.cart.updateCartItem(itemId, { quantity: newQuantity });
      } else {
        await apiClient.cart.updateAnonymousCartItem(itemId, { quantity: newQuantity });
      }
      setCartItems(items =>
        items.map(item =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error) {
      console.error('Failed to update quantity:', error);
    }
  };

  const removeItem = async (itemId: string) => {
    try {
      if (user) {
        await apiClient.cart.removeCartItem(itemId);
      } else {
        await apiClient.cart.removeAnonymousCartItem(itemId);
      }
      setCartItems(items => items.filter(item => item.id !== itemId));
    } catch (error) {
      console.error('Failed to remove item:', error);
    }
  };

  const clearCart = async () => {
    try {
      if (user) {
        await apiClient.cart.emptyCart();
      } else {
        await apiClient.cart.emptyAnonymousCart();
      }
      setCartItems([]);
    } catch (error) {
      console.error('Failed to clear cart:', error);
    }
  };

  const createOrder = async (orderData: CreateOrderDto = {}) => {
    if (cartItems.length === 0) {
      alert('Votre panier est vide');
      return;
    }

    setOrderLoading(true);
    try {
      let response;
      if (user) {
        // Create order for authenticated user
        response = await apiClient.orders.createOrder(orderData);
      } else {
        // Create anonymous order
        response = await apiClient.orders.createAnonymousOrder(orderData);
      }
      
      // Clear cart after successful order creation
      await clearCart();
      
      alert(`Commande créée avec succès! ID: ${response.data.id}`);
      
      // Optionally redirect to order confirmation page
      // window.location.href = `/orders/${response.data.id}`;
      
    } catch (error) {
      console.error('Failed to create order:', error);
      alert('Échec de la création de la commande. Veuillez réessayer.');
    } finally {
      setOrderLoading(false);
    }
  };

  const handleCheckout = () => {
    // Simple checkout - create order without additional data
    createOrder();
  };

  useEffect(() => {
    fetchCart();
  }, [user]); 

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalValue = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement du panier...</p>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="text-gray-400 mb-6">
              <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 7H6L5 9z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Votre panier est vide</h1>
            <p className="text-gray-600 mb-8">Découvrez nos produits exceptionnels et ajoutez-les à votre panier.</p>
            <a
              href="/"
              className="inline-block px-8 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-600 transition-colors"
            >
              Continuer mes achats
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <nav className="mb-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <a href="/" className="hover:text-primary transition-colors">Accueil</a>
              <span>/</span>
              <span className="text-gray-800">Panier</span>
            </div>
          </nav>
          <h1 className="text-3xl font-bold text-gray-800">Mon Panier</h1>
          <p className="text-gray-600 mt-2">{totalItems} article{totalItems > 1 ? 's' : ''} dans votre panier</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center space-x-4">
                  
                  {/* Product Image */}
                  <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                    {item.product.imageUrl ? (
                      <img 
                        src={item.product.imageUrl} 
                        alt={item.product.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-800 truncate">
                      <a 
                        href={`/products/${item.product.id}`}
                        className="hover:text-primary transition-colors"
                      >
                        {item.product.name}
                      </a>
                    </h3>
                    <p className="text-sm text-gray-600 truncate">{item.product.description}</p>
                    <p className="text-lg font-bold text-primary mt-1">{item.product.price} FCFA</p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => updateQuantity(item.id!, item.quantity - 1)}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    </button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id!, item.quantity + 1)}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </button>
                  </div>

                  {/* Subtotal */}
                  <div className="text-right">
                    <p className="font-bold text-gray-800">{(item.product.price * item.quantity).toLocaleString()} FCFA</p>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeItem(item.id!)}
                    className="text-error hover:text-error-600 p-2 transition-colors"
                    title="Supprimer l'article"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}

            {/* Clear Cart Button */}
            <div className="text-center pt-4">
              <button
                onClick={clearCart}
                className="text-error hover:text-error-600 font-medium transition-colors"
              >
                Vider le panier
              </button>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Résumé de commande</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Sous-total ({totalItems} article{totalItems > 1 ? 's' : ''})</span>
                  <span>{totalValue.toLocaleString()} FCFA</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Frais de livraison</span>
                  <span>Gratuit</span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-lg font-bold text-gray-800">
                    <span>Total</span>
                    <span>{totalValue.toLocaleString()} FCFA</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button 
                  onClick={handleCheckout}
                  disabled={orderLoading || cartItems.length === 0}
                  className={`w-full py-3 rounded-lg font-medium transition-colors ${
                    orderLoading || cartItems.length === 0
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-primary text-white hover:bg-primary-600'
                  }`}
                >
                  {orderLoading ? 'Création de la commande...' : 'Procéder au paiement'}
                </button>
                <a
                  href="/"
                  className="w-full py-3 border-2 border-primary text-primary rounded-lg font-medium hover:bg-primary hover:text-white transition-colors text-center block"
                >
                  Continuer mes achats
                </a>
              </div>

              {/* Promo Code */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-medium text-gray-800 mb-3">Code promo</h3>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Entrez votre code"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                  />
                  <button className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors text-sm">
                    Appliquer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}