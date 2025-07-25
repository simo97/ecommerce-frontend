import { useState } from 'react';
import { type Category } from '../libs/interfaces';

export default function CategoriesPage() {
  const [categories] = useState<Category[]>([
    {
      id: 'electronique',
      name: 'Électronique',
      description: 'Smartphones, ordinateurs, casques audio et tous vos appareils électroniques',
      isActive: true,
      productCount: 15
    },
    {
      id: 'mode',
      name: 'Mode & Vêtements',
      description: 'Vêtements, chaussures et accessoires de mode pour hommes et femmes',
      isActive: true,
      productCount: 32
    },
    {
      id: 'accessoires',
      name: 'Accessoires',
      description: 'Sacs, montres, bijoux et tous types d\'accessoires',
      isActive: true,
      productCount: 18
    },
    {
      id: 'livres',
      name: 'Livres & Média',
      description: 'Livres, magazines, films et contenu éducatif',
      isActive: true,
      productCount: 45
    },
    {
      id: 'maison',
      name: 'Maison & Jardin',
      description: 'Mobilier, décoration, électroménager et jardinage',
      isActive: true,
      productCount: 28
    },
    {
      id: 'alimentation',
      name: 'Alimentation & Boissons',
      description: 'Produits alimentaires, boissons et spécialités culinaires',
      isActive: true,
      productCount: 52
    },
    {
      id: 'sport',
      name: 'Sport & Loisirs',
      description: 'Équipements sportifs, jeux et articles de loisirs',
      isActive: true,
      productCount: 24
    },
    {
      id: 'beaute',
      name: 'Beauté & Santé',
      description: 'Cosmétiques, soins personnels et produits de bien-être',
      isActive: true,
      productCount: 38
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (category.description && category.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <nav className="mb-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <a href="/" className="hover:text-primary transition-colors">Accueil</a>
              <span>/</span>
              <span className="text-gray-800">Catégories</span>
            </div>
          </nav>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Toutes les catégories</h1>
          <p className="text-gray-600 mb-6">Découvrez nos différentes catégories de produits</p>

          {/* Search */}
          <div className="max-w-md">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher une catégorie..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        {filteredCategories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCategories.map((category) => (
              <a
                key={category.id}
                href={`/products?category=${category.id}`}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden group"
              >
                {/* Category Icon/Image */}
                <div className="h-32 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center group-hover:from-primary-200 group-hover:to-primary-300 transition-all duration-200">
                  <div className="text-primary-600">
                    {category.id === 'electronique' && (
                      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a1 1 0 001-1v-1a1 1 0 00-1-1H8a1 1 0 00-1 1v1a1 1 0 001 1zM8 3h8a1 1 0 011 1v9a1 1 0 01-1 1H8a1 1 0 01-1-1V4a1 1 0 011-1z" />
                      </svg>
                    )}
                    {category.id === 'mode' && (
                      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    )}
                    {category.id === 'accessoires' && (
                      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                    )}
                    {category.id === 'livres' && (
                      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    )}
                    {category.id === 'maison' && (
                      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    )}
                    {category.id === 'alimentation' && (
                      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                      </svg>
                    )}
                    {category.id === 'sport' && (
                      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    )}
                    {category.id === 'beaute' && (
                      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    )}
                  </div>
                </div>

                {/* Category Info */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-800 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-1 rounded-full">
                      {category.productCount} produits
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{category.description}</p>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              Aucune catégorie trouvée
            </h3>
            <p className="text-gray-500">
              Essayez de modifier votre recherche.
            </p>
          </div>
        )}

        {/* Summary */}
        <div className="mt-12 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Résumé des catégories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{categories.length}</div>
              <div className="text-sm text-gray-600">Catégories totales</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {categories.reduce((sum, cat) => sum + cat.productCount, 0)}
              </div>
              <div className="text-sm text-gray-600">Produits totaux</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {categories.filter(cat => cat.isActive).length}
              </div>
              <div className="text-sm text-gray-600">Catégories actives</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {Math.round(categories.reduce((sum, cat) => sum + cat.productCount, 0) / categories.length)}
              </div>
              <div className="text-sm text-gray-600">Produits/catégorie</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}