export default function AdminDashboard() {
  const stats = [
    {
      title: 'Total des ventes',
      value: '2,847,500 FCFA',
      change: '+12.5%',
      changeType: 'positive',
      icon: (
        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      )
    },
    {
      title: 'Commandes',
      value: '156',
      change: '+8.2%',
      changeType: 'positive',
      icon: (
        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      title: 'Produits',
      value: '89',
      change: '+3.1%',
      changeType: 'positive',
      icon: (
        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      )
    },
    {
      title: 'Utilisateurs',
      value: '1,247',
      change: '+15.3%',
      changeType: 'positive',
      icon: (
        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
      )
    }
  ];

  const recentOrders = [
    { id: '#12345', customer: 'Jean Dupont', amount: '89,500 FCFA', status: 'En attente', date: '2024-01-15' },
    { id: '#12346', customer: 'Marie Martin', amount: '156,000 FCFA', status: 'Expédiée', date: '2024-01-15' },
    { id: '#12347', customer: 'Pierre Durand', amount: '45,200 FCFA', status: 'Livrée', date: '2024-01-14' },
    { id: '#12348', customer: 'Sophie Bernard', amount: '78,900 FCFA', status: 'En traitement', date: '2024-01-14' },
    { id: '#12349', customer: 'Thomas Moreau', amount: '234,700 FCFA', status: 'Confirmée', date: '2024-01-13' }
  ];

  const lowStockProducts = [
    { name: 'Smartphone Premium', stock: 3, category: 'Électronique' },
    { name: 'Casque Audio', stock: 7, category: 'Électronique' },
    { name: 'Sac à Dos', stock: 5, category: 'Accessoires' },
    { name: 'Montre Connectée', stock: 2, category: 'Électronique' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'En attente': return 'bg-secondary-100 text-secondary-800';
      case 'Confirmée': return 'bg-primary-100 text-primary-800';
      case 'En traitement': return 'bg-accent-100 text-accent-800';
      case 'Expédiée': return 'bg-blue-100 text-blue-800';
      case 'Livrée': return 'bg-success-100 text-success-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
                <div className="flex items-center mt-2">
                  <span className={`text-sm font-medium ${
                    stat.changeType === 'positive' ? 'text-success-600' : 'text-error-600'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="text-gray-500 text-sm ml-1">ce mois</span>
                </div>
              </div>
              <div className="bg-primary-50 p-3 rounded-lg">
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">Commandes récentes</h3>
              <a href="/admin/orders" className="text-primary hover:text-primary-600 text-sm font-medium">
                Voir tout
              </a>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-gray-800">{order.id}</p>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">{order.customer}</p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-primary font-semibold text-sm">{order.amount}</p>
                      <p className="text-gray-500 text-xs">{order.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">Stock faible</h3>
              <a href="/admin/products" className="text-primary hover:text-primary-600 text-sm font-medium">
                Gérer stock
              </a>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {lowStockProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{product.name}</p>
                    <p className="text-gray-600 text-sm">{product.category}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold text-sm ${
                      product.stock <= 3 ? 'text-error-600' : 'text-secondary-600'
                    }`}>
                      {product.stock} unités
                    </p>
                    <p className="text-gray-500 text-xs">Stock restant</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Actions rapides</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <a
            href="/admin/products/new"
            className="flex items-center justify-center p-4 border-2 border-dashed border-primary-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors group"
          >
            <div className="text-center">
              <svg className="w-8 h-8 text-primary-400 group-hover:text-primary-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <p className="text-primary-600 font-medium">Ajouter produit</p>
            </div>
          </a>
          
          <a
            href="/admin/orders"
            className="flex items-center justify-center p-4 border-2 border-dashed border-primary-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors group"
          >
            <div className="text-center">
              <svg className="w-8 h-8 text-primary-400 group-hover:text-primary-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <p className="text-primary-600 font-medium">Gérer commandes</p>
            </div>
          </a>
          
          <a
            href="/admin/users"
            className="flex items-center justify-center p-4 border-2 border-dashed border-primary-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors group"
          >
            <div className="text-center">
              <svg className="w-8 h-8 text-primary-400 group-hover:text-primary-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
              <p className="text-primary-600 font-medium">Voir utilisateurs</p>
            </div>
          </a>
          
          <div className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg">
            <div className="text-center">
              <svg className="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <p className="text-gray-500 font-medium">Rapports</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}