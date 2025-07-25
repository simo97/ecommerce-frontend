import { Routes, Route } from 'react-router'
import MainLayout from './pages/layouts/MainLayout'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import CategoriesPage from './pages/CategoriesPage'
import ProductListPage from './pages/ProductListPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'

function App() {
  return (
    <Routes>
      {/* Auth pages without MainLayout */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<SignupPage />} />
      
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
