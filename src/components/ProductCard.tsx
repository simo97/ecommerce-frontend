import { type Product, type ProductCardProps } from '../libs/interfaces';

export default function ProductCard({ 
  product, 
  showStock = false, 
  showAddToCart = false 
}: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
      {/* Product Image */}
      <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
        {product.imageUrl ? (
          <img 
            src={product.imageUrl} 
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <svg
            className="w-16 h-16 text-gray-400"
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

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-800 mb-2">
          <a 
            href={`/products/${product.id}`}
            className="hover:text-primary transition-colors"
          >
            {product.name}
          </a>
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex justify-between items-center mb-3">
          <span className="text-xl font-bold text-primary">
            {product.price} FCFA
          </span>
          {showStock && product.stockQuantity !== undefined && (
            <span className={`text-xs px-2 py-1 rounded-full ${
              product.stockQuantity > 10 
                ? 'bg-success-100 text-success-800' 
                : product.stockQuantity > 0 
                  ? 'bg-secondary-100 text-secondary-800' 
                  : 'bg-error-100 text-error-800'
            }`}>
              {product.stockQuantity > 0 ? `${product.stockQuantity} en stock` : 'Rupture'}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className={showAddToCart ? "flex space-x-2" : ""}>
          <a 
            href={`/products/${product.id}`}
            className={`px-4 py-2 bg-primary text-white text-sm rounded-md hover:bg-primary-600 transition-colors duration-200 text-center inline-block ${
              showAddToCart ? "flex-1" : "w-full"
            }`}
          >
            Voir d�tails
          </a>
          
          {showAddToCart && (
            <button className="px-3 py-2 border border-primary text-primary rounded-md hover:bg-primary hover:text-white transition-colors duration-200">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 9M9 22a1 1 0 100-2 1 1 0 000 2zm10 0a1 1 0 100-2 1 1 0 000 2z" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}