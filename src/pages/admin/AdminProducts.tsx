import { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { apiClient } from '../../libs/api/client.js';
import type { Product, ProductQuery, Category } from '../../libs/interfaces/index.js';

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const [filters, setFilters] = useState({
    search: '',
    category: '',
    status: '',
    stock: ''
  });

  useEffect(() => {
    fetchProducts();
  }, [currentPage, perPage, filters]);

  useEffect(() => {
    fetchCategories();
  }, []);

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

      const response = await apiClient.products.getAdminProducts(query);
      
      if (response.data) {
        setProducts(response.data.data);
        setTotalProducts(response.data.meta.total);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to load products');
      console.error('Products API error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await apiClient.categories.getCategories();
      
      if (response.data) {
        setCategories(response.data);
      }
    } catch (error) {
      console.error('Categories API error:', error);
      // Don't set error state for categories as it's not critical
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1); 
  };

  const resetFilters = () => {
    setFilters({
      search: '',
      category: '',
      status: '',
      stock: ''
    });
    setCurrentPage(1);
  };
  
  console.log({products})
  
  const filteredProducts = products.filter(product => {
    if (filters.status === 'active' && !product.isActive) return false;
    if (filters.status === 'inactive' && product.isActive) return false;
    if (filters.stock === 'low' && product.stockQuantity > 10) return false;
    if (filters.stock === 'medium' && (product.stockQuantity <= 10 || product.stockQuantity > 20)) return false;
    if (filters.stock === 'high' && product.stockQuantity <= 20) return false;
    return true;
  });

  const handleEdit = (product: Product) => {
    console.log('Edit product:', product);
  };

  const handleDelete = async (product: Product) => {
    if (confirm(`Êtes-vous sûr de vouloir supprimer "${product.name}" ?`)) {
      try {
        await apiClient.products.deleteProduct(product.id!);
        // Refresh the products lis
        fetchProducts();
      } catch (error) {
        alert('Erreur lors de la suppression du produit');
        console.error('Delete product error:', error);
      }
    }
  };

  const handleView = (product: Product) => {
    console.log('View product:', product);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XAF',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const columns = [
    {
      name: 'Nom',
      selector: (row: Product) => row.name,
      sortable: true,
      width: '200px'
    },
    {
      name: 'Description',
      selector: (row: Product) => row.description,
      width: '250px',
      cell: (row: Product) => (
        <div className="text-sm text-gray-600 truncate" title={row.description}>
          {row.description}
        </div>
      )
    },
    {
      name: 'Prix',
      selector: (row: Product) => row.price,
      sortable: true,
      width: '120px',
      cell: (row: Product) => (
        <span className="font-semibold text-primary">
          {formatCurrency(row.price)}
        </span>
      )
    },
    {
      name: 'Stock',
      selector: (row: Product) => row.stockQuantity,
      sortable: true,
      width: '100px',
      cell: (row: Product) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          row.stockQuantity > 20 
            ? 'bg-success-100 text-success-800' 
            : row.stockQuantity > 10 
              ? 'bg-secondary-100 text-secondary-800' 
              : 'bg-error-100 text-error-800'
        }`}>
          {row.stockQuantity}
        </span>
      )
    },
    {
      name: 'Catégorie',
      selector: (row: Product) => row.categoryId || '',
      sortable: true,
      width: '120px',
      cell: (row: Product) => {
        const category = categories.find(cat => cat.id === row.categoryId);
        return (
          <span className="capitalize text-gray-600">
            {category?.name || 'Non définie'}
          </span>
        );
      }
    },
    {
      name: 'Statut',
      selector: (row: Product) => row.isActive,
      sortable: true,
      width: '100px',
      cell: (row: Product) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          row.isActive 
            ? 'bg-success-100 text-success-800' 
            : 'bg-error-100 text-error-800'
        }`}>
          {row.isActive ? 'Actif' : 'Inactif'}
        </span>
      )
    },
    {
      name: 'Actions',
      cell: (row: Product) => (
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleView(row)}
            className="text-primary hover:text-primary-600 p-1 rounded hover:bg-primary-50 transition-colors"
            title="Voir"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
          <button
            onClick={() => handleEdit(row)}
            className="text-accent hover:text-accent-600 p-1 rounded hover:bg-accent-50 transition-colors"
            title="Modifier"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={() => handleDelete(row)}
            className="text-error hover:text-error-600 p-1 rounded hover:bg-error-50 transition-colors"
            title="Supprimer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      ),
      width: '120px'
    }
  ];

  const customStyles = {
    header: {
      style: {
        minHeight: '56px',
      },
    },
    headRow: {
      style: {
        backgroundColor: '#f9fafb',
        borderBottomWidth: '1px',
        borderBottomColor: '#e5e7eb',
      },
    },
    headCells: {
      style: {
        fontSize: '12px',
        fontWeight: '600',
        color: '#6b7280',
        textTransform: 'uppercase' as const,
        letterSpacing: '0.05em',
        paddingLeft: '16px',
        paddingRight: '16px',
      },
    },
    cells: {
      style: {
        fontSize: '14px',
        color: '#111827',
        paddingLeft: '16px',
        paddingRight: '16px',
      },
    },
    rows: {
      style: {
        '&:hover': {
          backgroundColor: '#f9fafb',
        },
      },
    },
  };

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Gestion des Produits</h1>
          <p className="text-gray-600 mt-1">Gérez votre catalogue de produits</p>
        </div>
        <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors flex items-center space-x-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span>Ajouter un produit</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-2 bg-primary-100 rounded-lg">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-800">{totalProducts}</p>
              <p className="text-gray-600 text-sm">Total produits</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-2 bg-success-100 rounded-lg">
              <svg className="w-6 h-6 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-800">{products.filter(p => p.isActive).length}</p>
              <p className="text-gray-600 text-sm">Produits actifs</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-2 bg-secondary-100 rounded-lg">
              <svg className="w-6 h-6 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-800">{products.reduce((sum, p) => sum + p.stockQuantity, 0)}</p>
              <p className="text-gray-600 text-sm">Stock total</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-2 bg-error-100 rounded-lg">
              <svg className="w-6 h-6 text-error-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.464 0L4.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-800">{products.filter(p => p.stockQuantity <= 10).length}</p>
              <p className="text-gray-600 text-sm">Stock faible</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Filtres</h3>
          <button 
            onClick={resetFilters}
            className="text-primary hover:text-primary-600 text-sm font-medium"
          >
            Réinitialiser
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Rechercher</label>
            <input
              type="text"
              placeholder="Nom du produit..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Catégorie</label>
            <select 
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">Toutes les catégories</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Statut</label>
            <select 
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">Tous les statuts</option>
              <option value="active">Actif</option>
              <option value="inactive">Inactif</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Stock</label>
            <select 
              value={filters.stock}
              onChange={(e) => handleFilterChange('stock', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">Tous les stocks</option>
              <option value="low">Stock faible (≤10)</option>
              <option value="medium">Stock moyen (11-20)</option>
              <option value="high">Stock élevé (&gt;20)</option>
            </select>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          <div className="flex">
            <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <div>
              <h3 className="font-medium">Erreur de chargement</h3>
              <p className="text-sm mt-1">{error}</p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <DataTable
          columns={columns}
          data={filteredProducts}
          pagination
          paginationServer
          paginationTotalRows={totalProducts}
          paginationDefaultPage={currentPage}
          paginationPerPage={perPage}
          paginationRowsPerPageOptions={[5, 10, 15, 20]}
          onChangeRowsPerPage={setPerPage}
          onChangePage={setCurrentPage}
          customStyles={customStyles}
          highlightOnHover
          striped
          responsive
          progressPending={isLoading}
          progressComponent={
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-gray-600">Chargement des produits...</p>
            </div>
          }
          noDataComponent={
            <div className="text-center py-12">
              <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <h3 className="text-lg font-medium text-gray-700 mb-2">Aucun produit trouvé</h3>
              <p className="text-gray-500">Aucun produit ne correspond à vos critères de recherche.</p>
            </div>
          }
        />
      </div>
    </div>
  );
}