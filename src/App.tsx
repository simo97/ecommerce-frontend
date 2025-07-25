import { Routes, Route } from 'react-router'
import { lazy, Suspense } from 'react'
import MainLayout from './pages/layouts/MainLayout'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import CategoriesPage from './pages/CategoriesPage'
import ProductListPage from './pages/ProductListPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'

// Lazy load admin components
const AdminLayout = lazy(() => import('./pages/layouts/AdminLayout'))
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'))
const AdminProducts = lazy(() => import('./pages/admin/AdminProducts'))
const AdminOrders = lazy(() => import('./pages/admin/AdminOrders'))
const AdminUsers = lazy(() => import('./pages/admin/AdminUsers'))

// Mock authentication check - replace with real auth logic
const isAuthenticated = () => {
  // This would check your auth state (localStorage, context, etc.)
  return localStorage.getItem('isAdmin') === 'true'
}

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  if (!isAuthenticated()) {
    // Redirect to login or show unauthorized message
    window.location.href = '/login'
    return null
  }
  return <>{children}</>
}

function App() {
  return (
    <Routes>
      {/* Auth pages without layout */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<SignupPage />} />
      
      {/* Admin pages with AdminLayout - only load if authenticated */}
      <Route path="/admin/*" element={
        <AdminRoute>
          <Suspense fallback={
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-gray-600">Chargement du panneau d'administration...</p>
              </div>
            </div>
          }>
            <AdminLayout>
              <Routes>
                <Route path="/" element={<AdminDashboard />} />
                <Route path="/products" element={<AdminProducts />} />
                <Route path="/orders" element={<AdminOrders />} />
                <Route path="/users" element={<AdminUsers />} />
              </Routes>
            </AdminLayout>
          </Suspense>
        </AdminRoute>
      } />
      
      {/* Main app pages with MainLayout */}
      <Route path="/*" element={
        <MainLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductListPage />} />
            <Route path="/products/:productId" element={<ProductPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </MainLayout>
      } />
    </Routes>
  )
}

export default App
