import { Routes, Route, Navigate } from 'react-router'
import { lazy, Suspense } from 'react'
import { useAuth } from './hooks/useAuth.js'
import MainLayout from './pages/layouts/MainLayout'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import CategoriesPage from './pages/CategoriesPage'
import ProductListPage from './pages/ProductListPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'


const AdminLayout = lazy(() => import('./pages/layouts/AdminLayout'))
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'))
const AdminProducts = lazy(() => import('./pages/admin/AdminProducts'))
const AdminOrders = lazy(() => import('./pages/admin/AdminOrders'))
const AdminUsers = lazy(() => import('./pages/admin/AdminUsers'))

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Vérification de l'authentification...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Accès refusé</h1>
          <p className="text-gray-600 mb-4">Vous n'avez pas les permissions d'administrateur.</p>
          <Navigate to="/" replace />
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

function App() {
  return (
    <Routes>
      {/* Auth pages without layout */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<SignupPage />} />
      
      {/* Admin pages with AdminLayout - requires admin authentication */}
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
      
      {/* Protected user pages - requires authentication */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <MainLayout>
            <div className="container mx-auto px-4 py-8">
              <h1 className="text-2xl font-bold mb-4">Mon Tableau de Bord</h1>
              <p>Bienvenue dans votre espace personnel.</p>
            </div>
          </MainLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/account/*" element={
        <ProtectedRoute>
          <MainLayout>
            <Routes>
              <Route path="/profile" element={<div>Profile Page</div>} />
              <Route path="/orders" element={<div>My Orders</div>} />
              <Route path="/settings" element={<div>Settings</div>} />
            </Routes>
          </MainLayout>
        </ProtectedRoute>
      } />
      
      {/* Main app pages with MainLayout - public access */}
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
