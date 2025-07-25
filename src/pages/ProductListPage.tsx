import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import ProductCard from '../components/ProductCard';
import { type Product } from '../libs/interfaces';

export default function ProductListPage() {
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category');
  
  const [products] = useState<Product[]>([
    {
      id: '1',
      name: 'Smartphone Premium',
      description: 'Téléphone haute performance avec écran OLED',
      price: 699,
      stockQuantity: 15,
      isActive: true,
      category: 'electronique'
    },
    {
      id: '2',
      name: 'Chaussures de Sport',
      description: 'Baskets confortables pour le running',
      price: 89,
      stockQuantity: 32,
      isActive: true,
      category: 'mode'
    },
    {
      id: '3',
      name: 'Casque Audio',
      description: 'Son immersif avec réduction de bruit',
      price: 159,
      stockQuantity: 8,
      isActive: true,
      category: 'electronique'
    },
    {
      id: '4',
      name: 'Sac à Dos',
      description: 'Sac ergonomique pour ordinateur portable',
      price: 45,
      stockQuantity: 25,
      isActive: true,
      category: 'accessoires'
    },
    {
      id: '5',
      name: 'Montre Connectée',
      description: 'Suivi fitness et notifications intelligentes',
      price: 249,
      stockQuantity: 12,
      isActive: true,
      category: 'electronique'
    },
    {
      id: '6',
      name: 'Livre de Cuisine',
      description: 'Recettes traditionnelles et modernes',
      price: 25,
      stockQuantity: 50,
      isActive: true,
      category: 'livres'
    },
    {
      id: '7',
      name: 'Lampe de Bureau',
      description: 'Éclairage LED ajustable et économique',
      price: 39,
      stockQuantity: 18,
      isActive: true,
      category: 'maison'
    },
    {
      id: '8',
      name: 'Café Premium',
      description: 'Grains torréfiés artisanalement',
      price: 15,
      stockQuantity: 75,
      isActive: true,
      category: 'alimentation'
    },
    {
      id: '9',
      name: 'Écouteurs Bluetooth',
      description: 'Son cristallin sans fil',
      price: 79,
      stockQuantity: 20,
      isActive: true,
      category: 'electronique'
    },
    {
      id: '10',
      name: 'T-shirt Bio',
      description: 'Coton biologique ultra-confortable',
      price: 35,
      stockQuantity: 40,
      isActive: true,
      category: 'mode'
    },
    {
      id: '11',
      name: 'Lunettes de Soleil',
      description: 'Protection UV 100% style moderne',
      price: 55,
      stockQuantity: 15,
      isActive: true,
      category: 'accessoires'
    },
    {
      id: '12',
      name: 'Roman Bestseller',
      description: 'Fiction captivante prix littéraire',
      price: 18,
      stockQuantity: 30,
      isActive: true,
      category: 'livres'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categoryFilter || '');
  const [priceRange, setPriceRange] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

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

  // Update selected category when URL changes
  useEffect(() => {
    if (categoryFilter) {
      setSelectedCategory(categoryFilter);
    }
  }, [categoryFilter]);

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    
    let matchesPrice = true;
    if (priceRange) {
      const [min, max] = priceRange.split('-').map(p => p.replace('+', ''));
      if (priceRange === '200+') {
        matchesPrice = product.price >= 200;
      } else {
        matchesPrice = product.price >= parseInt(min) && product.price <= parseInt(max);
      }
    }

    return matchesSearch && matchesCategory && matchesPrice && product.isActive;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      case 'price':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'stock':
        return b.stockQuantity - a.stockQuantity;
      default:
        return 0;
    }
  });

  // Pagination
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = sortedProducts.slice(startIndex, startIndex + itemsPerPage);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setPriceRange('');
    setSortBy('name');
    setCurrentPage(1);
  };

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
              {selectedCategory && (
                <>
                  <span>/</span>
                  <span className="text-gray-800">{getCategoryName(selectedCategory)}</span>
                </>
              )}
            </div>
          </nav>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {selectedCategory ? getCategoryName(selectedCategory) : 'Tous les produits'}
          </h1>
          <p className="text-gray-600">
            {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} trouvé{filteredProducts.length > 1 ? 's' : ''}
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
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
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
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
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
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
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
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
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

        {/* Products Grid */}
        {paginatedProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {paginatedProducts.map(product => (
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