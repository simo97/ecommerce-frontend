import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import ProductCard from '../components/ProductCard';
import { apiClient } from '../libs/api/client.js';

import { type Product, type ProductQuery } from '../libs/interfaces';

export default function ProductListPage() {
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalProducts, setTotalProducts] = useState(0);
  const [perPage] = useState(10);
  const [products, setProducts] = useState<Product[]>([]);

  const [currentPage, setCurrentPage] = useState(1);

  const [filters, setFilters] = useState({
    search: '',
    category: categoryFilter || '',
    priceMin: '',
    priceMax: '',
    sortBy: 'name'
  });
  

  const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
  
      try {
        const query: ProductQuery = {
          page: currentPage,
          limit: perPage,
          search: filters.search || undefined,
          category: filters.category || undefined,
        };
  
        const response = await apiClient.products.getProducts(query);
        
        setProducts(response.data.data);
        setTotalProducts(response.data.meta.total);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to load products');
        console.error('Products API error:', error);
      } finally {
        setIsLoading(false);
      }
  };

  const updateFilter = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1); // Reset to first page when filtering
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      category: '',
      priceMin: '',
      priceMax: '',
      sortBy: 'name'
    });
    setCurrentPage(1);
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage, perPage, filters]);

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
    { value: '0-50', label: 'Moins de 50 FCFA' },
    { value: '50-100', label: '50 - 100 FCFA' },
    { value: '100-200', label: '100 - 200 FCFA' },
    { value: '200+', label: 'Plus de 200 FCFA' }
  ];

  const sortOptions = [
    { value: 'name', label: 'Nom (A-Z)' },
    { value: 'name-desc', label: 'Nom (Z-A)' },
    { value: 'price', label: 'Prix (croissant)' },
    { value: 'price-desc', label: 'Prix (décroissant)' },
    { value: 'stock', label: 'Stock disponible' }
  ];

  // Update category filter when URL changes
  useEffect(() => {
    if (categoryFilter && categoryFilter !== filters.category) {
      setFilters(prev => ({ ...prev, category: categoryFilter }));
    }
  }, [categoryFilter]);

  // Calculate pagination from API data
  const totalPages = Math.ceil(totalProducts / perPage);

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(cat => cat.value === categoryId);
    return category ? category.label : 'Catégorie';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <nav className="mb-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <a href="/" className="hover:text-primary transition-colors">Accueil</a>
              <span>/</span>
              <a href="/products" className="hover:text-primary transition-colors">Produits</a>
              {filters.category && (
                <>
                  <span>/</span>
                  <span className="text-gray-800">{getCategoryName(filters.category)}</span>
                </>
              )}
            </div>
          </nav>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {filters.category ? getCategoryName(filters.category) : 'Tous les produits'}
          </h1>
          <p className="text-gray-600">
            {totalProducts} produit{totalProducts > 1 ? 's' : ''} trouvé{totalProducts > 1 ? 's' : ''}
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
            
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Rechercher un produit..."
                  value={filters.search}
                  onChange={(e) => updateFilter('search', e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={filters.category}
                onChange={(e) => updateFilter('category', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Filter */}
            <div>
              <select
                value={`${filters.priceMin}-${filters.priceMax}`}
                onChange={(e) => {
                  const [min, max] = e.target.value.split('-');
                  updateFilter('priceMin', min);
                  updateFilter('priceMax', max);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {priceRanges.map(range => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div>
              <select
                value={filters.sortBy}
                onChange={(e) => updateFilter('sortBy', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Clear Filters */}
          <div className="flex justify-between items-center">
            <button
              onClick={clearFilters}
              className="text-primary hover:text-primary-600 font-medium transition-colors"
            >
              Effacer tous les filtres
            </button>
            <div className="text-sm text-gray-600">
              Page {currentPage} sur {totalPages}
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-gray-600">Chargement des produits...</p>
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="text-red-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              Erreur de chargement
            </h3>
            <p className="text-gray-500 mb-4">{error}</p>
            <button
              onClick={fetchProducts}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-600 transition-colors"
            >
              Réessayer
            </button>
          </div>
        ) : products.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {products.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  showStock={true}
                  showAddToCart={true}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Précédent
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-2 border rounded-md ${
                      page === currentPage
                        ? 'bg-primary text-white border-primary'
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Suivant
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              Aucun produit trouvé
            </h3>
            <p className="text-gray-500 mb-4">
              Essayez de modifier vos filtres pour voir plus de produits.
            </p>
            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-600 transition-colors"
            >
              Effacer tous les filtres
            </button>
          </div>
        )}
      </div>
    </div>
  );
}