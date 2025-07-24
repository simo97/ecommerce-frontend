import { Link } from 'react-router';

export default function Header() {
  return (
    <header className="bg-primary text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold">
              Ktalog
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link 
              to="/" 
              className="hover:text-secondary transition-colors duration-200"
            >
              Accueil
            </Link>
            <Link 
              to="/products" 
              className="hover:text-secondary transition-colors duration-200"
            >
              Produits
            </Link>
            <Link 
              to="/categories" 
              className="hover:text-secondary transition-colors duration-200"
            >
              Catégories
            </Link>
          </nav>

          {/* Right side: Cart and User */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Link 
              to="/cart" 
              className="relative hover:text-secondary transition-colors duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 9M9 22a1 1 0 100-2 1 1 0 000 2zm10 0a1 1 0 100-2 1 1 0 000 2z" />
              </svg>
              <span className="absolute -top-2 -right-2 bg-error text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Link>

            {/* User Menu */}
            <div className="flex items-center space-x-2">
              <Link 
                to="/login" 
                className="hover:text-secondary transition-colors duration-200"
              >
                Connexion
              </Link>
              <span className="text-secondary">|</span>
              <Link 
                to="/register" 
                className="hover:text-secondary transition-colors duration-200"
              >
                S'inscrire
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-white hover:text-secondary">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}