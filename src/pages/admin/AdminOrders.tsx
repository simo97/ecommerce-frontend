import { useState } from 'react';
import DataTable from 'react-data-table-component';
import { type Order, OrderStatus } from '../../libs/interfaces';

export default function AdminOrders() {
  const [orders] = useState<Order[]>([
    {
      id: 'ORD-12345',
      totalAmount: 89500,
      status: OrderStatus.PENDING,
      user: { id: '1', email: 'jean.dupont@email.com', firstName: 'Jean', lastName: 'Dupont' } as any,
      userId: '1',
      items: [],
      shippingAddress: '123 Rue de la Paix, Yaoundé',
      notes: 'Livraison urgente',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15')
    },
    {
      id: 'ORD-12346',
      totalAmount: 156000,
      status: OrderStatus.SHIPPED,
      user: { id: '2', email: 'marie.martin@email.com', firstName: 'Marie', lastName: 'Martin' } as any,
      userId: '2',
      items: [],
      shippingAddress: '45 Avenue de la Liberté, Douala',
      createdAt: new Date('2024-01-14'),
      updatedAt: new Date('2024-01-15')
    },
    {
      id: 'ORD-12347',
      totalAmount: 45200,
      status: OrderStatus.DELIVERED,
      user: { id: '3', email: 'pierre.durand@email.com', firstName: 'Pierre', lastName: 'Durand' } as any,
      userId: '3',
      items: [],
      shippingAddress: '78 Boulevard du Cameroun, Bafoussam',
      createdAt: new Date('2024-01-13'),
      updatedAt: new Date('2024-01-14')
    },
    {
      id: 'ORD-12348',
      totalAmount: 78900,
      status: OrderStatus.PROCESSING,
      user: { id: '4', email: 'sophie.bernard@email.com', firstName: 'Sophie', lastName: 'Bernard' } as any,
      userId: '4',
      items: [],
      shippingAddress: '92 Rue de la République, Garoua',
      createdAt: new Date('2024-01-12'),
      updatedAt: new Date('2024-01-14')
    },
    {
      id: 'ORD-12349',
      totalAmount: 234700,
      status: OrderStatus.CONFIRMED,
      user: { id: '5', email: 'thomas.moreau@email.com', firstName: 'Thomas', lastName: 'Moreau' } as any,
      userId: '5',
      items: [],
      shippingAddress: '15 Place de l\'Indépendance, Maroua',
      createdAt: new Date('2024-01-11'),
      updatedAt: new Date('2024-01-13')
    },
    {
      id: 'ORD-12350',
      totalAmount: 67300,
      status: OrderStatus.CANCELLED,
      user: { id: '6', email: 'claire.dubois@email.com', firstName: 'Claire', lastName: 'Dubois' } as any,
      userId: '6',
      items: [],
      shippingAddress: '33 Rue des Cocotiers, Kribi',
      notes: 'Annulée par le client',
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-01-11')
    }
  ]);

  const [filterText, setFilterText] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filteredItems = orders.filter(item => {
    const matchesText = item.id!.toLowerCase().includes(filterText.toLowerCase()) ||
                       `${item.user.firstName} ${item.user.lastName}`.toLowerCase().includes(filterText.toLowerCase()) ||
                       item.user.email.toLowerCase().includes(filterText.toLowerCase());
    
    const matchesStatus = !statusFilter || item.status === statusFilter;
    
    return matchesText && matchesStatus;
  });

  const handleView = (order: Order) => {
    console.log('View order:', order);
  };

  const handleUpdateStatus = (order: Order, newStatus: OrderStatus) => {
    console.log('Update order status:', order.id, newStatus);
  };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PENDING: return 'bg-secondary-100 text-secondary-800';
      case OrderStatus.CONFIRMED: return 'bg-primary-100 text-primary-800';
      case OrderStatus.PROCESSING: return 'bg-accent-100 text-accent-800';
      case OrderStatus.SHIPPED: return 'bg-blue-100 text-blue-800';
      case OrderStatus.DELIVERED: return 'bg-success-100 text-success-800';
      case OrderStatus.CANCELLED: return 'bg-error-100 text-error-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PENDING: return 'En attente';
      case OrderStatus.CONFIRMED: return 'Confirmée';
      case OrderStatus.PROCESSING: return 'En traitement';
      case OrderStatus.SHIPPED: return 'Expédiée';
      case OrderStatus.DELIVERED: return 'Livrée';
      case OrderStatus.CANCELLED: return 'Annulée';
      default: return status;
    }
  };

  const columns = [
    {
      name: 'ID Commande',
      selector: (row: Order) => row.id || '',
      sortable: true,
      width: '140px',
      cell: (row: Order) => (
        <span className="font-mono text-sm font-medium text-primary">
          {row.id}
        </span>
      )
    },
    {
      name: 'Client',
      selector: (row: Order) => `${row.user.firstName} ${row.user.lastName}`,
      sortable: true,
      width: '180px',
      cell: (row: Order) => (
        <div>
          <div className="font-medium text-gray-800">
            {row.user.firstName} {row.user.lastName}
          </div>
          <div className="text-sm text-gray-500">
            {row.user.email}
          </div>
        </div>
      )
    },
    {
      name: 'Montant',
      selector: (row: Order) => row.totalAmount,
      sortable: true,
      width: '130px',
      cell: (row: Order) => (
        <span className="font-semibold text-primary">
          {row.totalAmount.toLocaleString()} FCFA
        </span>
      )
    },
    {
      name: 'Statut',
      selector: (row: Order) => row.status,
      sortable: true,
      width: '140px',
      cell: (row: Order) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(row.status)}`}>
          {getStatusLabel(row.status)}
        </span>
      )
    },
    {
      name: 'Date',
      selector: (row: Order) => row.createdAt?.toISOString() || '',
      sortable: true,
      width: '120px',
      cell: (row: Order) => (
        <div className="text-sm text-gray-600">
          {row.createdAt?.toLocaleDateString('fr-FR')}
        </div>
      )
    },
    {
      name: 'Adresse',
      selector: (row: Order) => row.shippingAddress || '',
      width: '200px',
      cell: (row: Order) => (
        <div className="text-sm text-gray-600 truncate" title={row.shippingAddress}>
          {row.shippingAddress}
        </div>
      )
    },
    {
      name: 'Actions',
      cell: (row: Order) => (
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleView(row)}
            className="text-primary hover:text-primary-600 p-1 rounded hover:bg-primary-50 transition-colors"
            title="Voir détails"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
          
          {row.status !== OrderStatus.DELIVERED && row.status !== OrderStatus.CANCELLED && (
            <div className="relative group">
              <button className="text-accent hover:text-accent-600 p-1 rounded hover:bg-accent-50 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
              <div className="absolute right-0 top-8 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <div className="p-2">
                  <button
                    onClick={() => handleUpdateStatus(row, OrderStatus.CONFIRMED)}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded"
                  >
                    Marquer comme confirmée
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(row, OrderStatus.PROCESSING)}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded"
                  >
                    Marquer en traitement
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(row, OrderStatus.SHIPPED)}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded"
                  >
                    Marquer comme expédiée
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(row, OrderStatus.DELIVERED)}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded"
                  >
                    Marquer comme livrée
                  </button>
                  <hr className="my-1" />
                  <button
                    onClick={() => handleUpdateStatus(row, OrderStatus.CANCELLED)}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded text-error-600"
                  >
                    Annuler la commande
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ),
      width: '100px'
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
        textTransform: 'uppercase',
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

  const getStatusStats = () => {
    const stats = Object.values(OrderStatus).map(status => ({
      status,
      count: orders.filter(order => order.status === status).length,
      label: getStatusLabel(status)
    }));
    return stats;
  };

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Gestion des Commandes</h1>
          <p className="text-gray-600 mt-1">Suivez et gérez toutes les commandes</p>
        </div>
        <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors flex items-center space-x-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>Exporter</span>
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-800">{orders.length}</p>
            <p className="text-gray-600 text-sm">Total</p>
          </div>
        </div>
        
        {getStatusStats().map(({ status, count, label }) => (
          <div key={status} className="bg-white rounded-lg shadow-md p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-800">{count}</p>
              <p className="text-gray-600 text-sm">{label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Filtres</h3>
          <button 
            onClick={() => {
              setFilterText('');
              setStatusFilter('');
            }}
            className="text-primary hover:text-primary-600 text-sm font-medium"
          >
            Réinitialiser
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Rechercher</label>
            <input
              type="text"
              placeholder="ID, nom du client, email..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Statut</label>
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">Tous les statuts</option>
              {Object.values(OrderStatus).map(status => (
                <option key={status} value={status}>{getStatusLabel(status)}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Période</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
              <option value="">Toutes les périodes</option>
              <option value="today">Aujourd'hui</option>
              <option value="week">Cette semaine</option>
              <option value="month">Ce mois</option>
              <option value="quarter">Ce trimestre</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <DataTable
          columns={columns}
          data={filteredItems}
          pagination
          paginationPerPage={10}
          paginationRowsPerPageOptions={[5, 10, 15, 20]}
          // customStyles={customStyles}
          highlightOnHover
          striped
          responsive
          noDataComponent={
            <div className="text-center py-12">
              <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-700 mb-2">Aucune commande trouvée</h3>
              <p className="text-gray-500">Aucune commande ne correspond à vos critères de recherche.</p>
            </div>
          }
        />
      </div>
    </div>
  );
}