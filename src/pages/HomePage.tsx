import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import type { Product, ProductQuery } from '../libs/interfaces';
import { apiClient } from '../libs/api/client';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState('');

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [perPage,] = useState(10);
  const [products, setProducts] = useState<Product[]>([]);


  const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
  
      try {
        const query: ProductQuery = {
        };
  
        const response = await apiClient.products.getProducts(query);
        
        if (response.data.data.length > 0) {
          setProducts(response.data.data);
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to load products');
        console.error('Products API error:', error);
      } finally {
        setIsLoading(false);
      }
  };

  useEffect(() => {
    fetchProducts();
  }, [ perPage,]);

  const categories = [
    { value: '', label: 'Toutes les catégories' },
    { value: 'electronique', label: 'Électronique' },
    { value: 'mode', label: 'Mode' },
    { value: 'accessoires', label: 'Accessoires' },
    { value: 'livres', label: 'Livres' },
    { value: 'maison', label: 'Maison' },
    { value: 'alimentation', label: 'Alimentation' }
  ];

  const priceRanges = [
    { value: '', label: 'Tous les prix' },
    { value: '0-50', label: 'Moins de 50€' },
    { value: '50-100', label: '50€ - 100€' },
    { value: '100-200', label: '100€ - 200€' },
    { value: '200+', label: 'Plus de 200€' }
  ];

  // Filter products based on selected filters
  const filteredProducts = products.filter(product => {
    const categoryMatch = !selectedCategory || product.category === selectedCategory;
    
    let priceMatch = true;
    if (priceRange) {
      const [min, max] = priceRange.split('-').map(p => p.replace('+', ''));
      if (priceRange === '200+') {
        priceMatch = product.price >= 200;
      } else {
        priceMatch = product.price >= parseInt(min) && product.price <= parseInt(max);
      }
    }
    
    return categoryMatch && priceMatch;
  });

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="bg-gradient-to-r from-primary to-primary-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Bienvenue chez Ktalog
          </h1>
          <p className="text-xl md:text-2xl text-primary-100">
            Découvrez nos produits exceptionnels à prix imbattables
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Filtrer les produits
          </h2>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">
                Catégorie
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Filter */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">
                Prix
              </label>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {priceRanges.map(range => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Reset Button */}
            <div className="flex flex-col justify-end">
              <button
                onClick={() => {
                  setSelectedCategory('');
                  setPriceRange('');
                }}
                className="px-6 py-2 bg-accent text-white rounded-md hover:bg-accent-600 transition-colors duration-200"
              >
                Réinitialiser
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>

      
        {isLoading ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4V2m0 20v-2m8.485-14.485l1.414-1.414M4.929 19.071l1.414-1.414M20 12h2m-20 0h2m14.485 8.485l1.414 1.414M4.929 4.929l1.414 1.414" />
              </svg>
            </div>
          </div>):
          filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                Aucun produit trouvé
              </h3>
              <p className="text-gray-500">
                Essayez de modifier vos filtres pour voir plus de produits.
              </p>
            </div>
        )}
        {error && (
          <div className="text-red-500 text-center py-4">
            <p>{error}</p> 
          </div>
        )}
      </div>
    </div>
  );
}