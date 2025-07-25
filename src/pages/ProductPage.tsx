import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import { type Product } from '../libs/interfaces';

export default function ProductPage() {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock product data - replace with actual API call
    const mockProducts: Product[] = [
      {
        id: '1',
        name: 'Smartphone Premium',
        description: 'Téléphone haute performance avec écran OLED de 6.7 pouces, processeur octa-core, 8GB RAM, 256GB stockage, triple caméra 108MP, batterie 5000mAh avec charge rapide. Design élégant et résistant à l\'eau IP68.',
        price: 699,
        stockQuantity: 15,
        isActive: true,
        categoryId: 'electronique'
      },
      {
        id: '2',
        name: 'Chaussures de Sport',
        description: 'Baskets confortables pour le running avec semelle amortissante en mousse, upper respirant en mesh, support de la voûte plantaire. Parfaites pour la course et l\'entraînement quotidien.',
        price: 89,
        stockQuantity: 32,
        isActive: true,
        categoryId: 'mode'
      },
      {
        id: '3',
        name: 'Casque Audio',
        description: 'Son immersif avec réduction de bruit active, autonomie 30h, charge rapide 15min = 3h d\'écoute, compatible Bluetooth 5.0, microphone intégré pour appels.',
        price: 159,
        stockQuantity: 8,
        isActive: true,
        categoryId: 'electronique'
      },
      {
        id: '4',
        name: 'Sac à Dos',
        description: 'Sac ergonomique pour ordinateur portable jusqu\'à 17 pouces, compartiments multiples, tissu résistant à l\'eau, bretelles rembourrées, parfait pour travail et voyage.',
        price: 45,
        stockQuantity: 25,
        isActive: true,
        categoryId: 'accessoires'
      },
      {
        id: '5',
        name: 'Montre Connectée',
        description: 'Suivi fitness et notifications intelligentes, GPS intégré, mesure fréquence cardiaque, étanche 50m, autonomie 7 jours, écran AMOLED.',
        price: 249,
        stockQuantity: 12,
        isActive: true,
        categoryId: 'electronique'
      },
      {
        id: '6',
        name: 'Livre de Cuisine',
        description: 'Recettes traditionnelles et modernes de la cuisine française, 300 pages, photos couleur, techniques de base expliquées, index des ingrédients.',
        price: 25,
        stockQuantity: 50,
        isActive: true,
        categoryId: 'livres'
      },
      {
        id: '7',
        name: 'Lampe de Bureau',
        description: 'Éclairage LED ajustable et économique, 3 niveaux d\'intensité, bras flexible, base stable, protection oculaire, consommation 12W.',
        price: 39,
        stockQuantity: 18,
        isActive: true,
        categoryId: 'maison'
      },
      {
        id: '8',
        name: 'Café Premium',
        description: 'Grains torréfiés artisanalement, origine unique Colombie, notes de chocolat et caramel, mouture disponible, sachet 500g refermable.',
        price: 15,
        stockQuantity: 75,
        isActive: true,
        categoryId: 'alimentation'
      }
    ];

    setTimeout(() => {
      const foundProduct = mockProducts.find(p => p.id === productId);
      setProduct(foundProduct || null);
      setLoading(false);
    }, 500);
  }, [productId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement du produit...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 mb-4">
            <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Produit non trouvé</h1>
          <p className="text-gray-600 mb-6">Le produit que vous recherchez n'existe pas ou a été supprimé.</p>
          <a
            href="/"
            className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            Retour à l'accueil
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <a href="/" className="hover:text-primary transition-colors">Accueil</a>
            <span>/</span>
            <a href="/products" className="hover:text-primary transition-colors">Produits</a>
            <span>/</span>
            <span className="text-gray-800">{product.name}</span>
          </div>
        </nav>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            
            {/* Product Image */}
            <div className="flex items-center justify-center">
              <div className="w-full max-w-md h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                {product.imageUrl ? (
                  <img 
                    src={product.imageUrl} 
                    alt={product.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <svg
                    className="w-24 h-24 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
                <p className="text-2xl font-bold text-primary">{product.price} FCFA </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-gray-700">Stock disponible:</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    product.stockQuantity > 10 
                      ? 'bg-success-100 text-success-800' 
                      : product.stockQuantity > 0 
                        ? 'bg-secondary-100 text-secondary-800' 
                        : 'bg-error-100 text-error-800'
                  }`}>
                    {product.stockQuantity > 0 ? `${product.stockQuantity} unités` : 'Rupture de stock'}
                  </span>
                </div>

                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-gray-700">Statut:</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    product.isActive 
                      ? 'bg-success-100 text-success-800' 
                      : 'bg-error-100 text-error-800'
                  }`}>
                    {product.isActive ? 'Actif' : 'Inactif'}
                  </span>
                </div>

                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-gray-700">ID Produit:</span>
                  <span className="text-sm text-gray-600 font-mono">{product.id}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-gray-200">
                <div className="space-y-3">
                  <button 
                    className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
                      product.stockQuantity > 0 && product.isActive
                        ? 'bg-primary text-white hover:bg-primary-600'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    disabled={product.stockQuantity === 0 || !product.isActive}
                  >
                    {product.stockQuantity === 0 
                      ? 'Rupture de stock' 
                      : !product.isActive 
                        ? 'Produit indisponible' 
                        : 'Ajouter au panier'
                    }
                  </button>
                  
                  <button className="w-full py-3 px-6 border-2 border-primary text-primary rounded-lg font-medium hover:bg-primary hover:text-white transition-colors">
                    Ajouter aux favoris
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