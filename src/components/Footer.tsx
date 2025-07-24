import { Link } from 'react-router';

export default function Footer() {
  return (
    <footer className="bg-primary-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">Ktalog</h3>
            <p className="text-primary-200 mb-4">
              Votre boutique unique pour des produits de qualité à prix avantageux. 
              Découvrez des offres exceptionnelles et un service remarquable.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-primary-200 hover:text-secondary transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="text-primary-200 hover:text-secondary transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987c6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.348-1.051-2.348-2.348c0-1.297 1.051-2.348 2.348-2.348c1.297 0 2.348 1.051 2.348 2.348C10.797 15.937 9.746 16.988 8.449 16.988z"/>
                </svg>
              </a>
              <a href="#" className="text-primary-200 hover:text-secondary transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.991c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 6.92c-.8.355-1.659.593-2.560.702a4.484 4.484 0 001.962-2.472 8.939 8.939 0 01-2.844 1.086 4.478 4.478 0 00-7.625 4.083 12.711 12.711 0 01-9.227-4.675 4.478 4.478 0 001.386 5.976A4.464 4.464 0 012.8 10.97v.056a4.478 4.478 0 003.591 4.387 4.491 4.491 0 01-2.02.077 4.479 4.479 0 004.182 3.104A8.946 8.946 0 012 20.263a12.66 12.66 0 006.29 1.84"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Liens Rapides</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-primary-200 hover:text-secondary transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-primary-200 hover:text-secondary transition-colors">
                  Tous les Produits
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-primary-200 hover:text-secondary transition-colors">
                  Catégories
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-primary-200 hover:text-secondary transition-colors">
                  Panier
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Service Client</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-primary-200 hover:text-secondary transition-colors">
                  Nous Contacter
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-primary-200 hover:text-secondary transition-colors">
                  Centre d'Aide
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-primary-200 hover:text-secondary transition-colors">
                  Livraison
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-primary-200 hover:text-secondary transition-colors">
                  Retours
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-primary-200 text-sm">
            © 2024 Ktalog. Tous droits réservés.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-primary-200 hover:text-secondary text-sm transition-colors">
              Politique de Confidentialité
            </Link>
            <Link to="/terms" className="text-primary-200 hover:text-secondary text-sm transition-colors">
              Conditions d'Utilisation
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}