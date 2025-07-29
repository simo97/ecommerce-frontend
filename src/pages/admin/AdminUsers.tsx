import { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { type User, UserRole } from '../../libs/interfaces';
import { apiClient } from '../../libs/api/client.js';
import { type UserQuery} from '../../libs/api/user.service.js';
import { formatCurrency, formatDate, getUserRoleColor, getUserRoleLabel } from '../../libs/utils/index.js';
import { type UserStats } from '../../libs/api/user.service.js';

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [usersStats, setUsersStats] = useState<{ [userId: string]: UserStats }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalUsers, setTotalUsers] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const [filters, setFilters] = useState({
    search: '',
    role: '',
    activityFilter: ''
  });

  useEffect(() => {
    fetchUsers();
    // fetchUsersStats();
  }, [currentPage, perPage, filters]);

  const fetchUsers = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const query: UserQuery = {
        page: currentPage,
        limit: perPage,
        role: filters.role || undefined,
        search: filters.search || undefined,
        activityFilter: filters.activityFilter || undefined,
      };

      const response = await apiClient.users.getAllUsers(query);
      
      if (response.data.data.length > 0) {
        setUsers(response.data.data);
        setTotalUsers(response.data.data.length);
      }
    } catch (error) {
      console.error('Users API error:', error);
      setError(error instanceof Error ? error.message : 'Failed to load users');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUsersStats = async () => {
    try {
      const response = await apiClient.users.getAllUsersStats();
      if (response.data) {
        setUsersStats(response.data);
      }
    } catch (error) {
      console.error('Users stats API error:', error);
    }
  };

  const filteredUsers = users.filter(user => {
    if (!filters.search) return true;
    
    const searchLower = filters.search.toLowerCase();
    return (
      user.email.toLowerCase().includes(searchLower) ||
      `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchLower) ||
      user.id?.toLowerCase().includes(searchLower)
    );
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setFilters({
      search: '',
      role: '',
      activityFilter: ''
    });
    setCurrentPage(1);
  };

  const handleView = (user: User) => {
    console.log('View user:', user);
  };

  const handleEdit = (user: User) => {
    console.log('Edit user:', user);
  };

  const handleDelete = async (user: User) => {
    if (!user.id) return;
    
    if (confirm(`Êtes-vous sûr de vouloir supprimer l'utilisateur "${user.firstName} ${user.lastName}" ?`)) {
      try {
        await apiClient.users.deleteUser(user.id);
        fetchUsers();
      } catch (error) {
        console.error('Failed to delete user:', error);
        alert('Erreur lors de la suppression de l\'utilisateur');
      }
    }
  };

  const handleToggleRole = async (user: User) => {
    if (!user.id) return;
    
    const newRole = user.role === UserRole.ADMIN ? UserRole.CUSTOMER : UserRole.ADMIN;
    
    try {
      await apiClient.users.updateUserRole(user.id, { role: newRole });
      
      setUsers(prevUsers => 
        prevUsers.map(u => 
          u.id === user.id ? { ...u, role: newRole } : u
        )
      );
      
    } catch (error) {
      console.error('Failed to update user role:', error);
      alert('Erreur lors de la mise à jour du rôle utilisateur');
    }
  };


  const getUserStats = (userId: string) => {
    return usersStats[userId] || { ordersCount: 0, lastActivity: 'N/A', totalSpent: 0 };
  };

  const columns = [
    {
      name: 'ID',
      selector: (row: User) => row.id || '',
      sortable: true,
      width: '80px',
      cell: (row: User) => (
        <span className="font-mono text-xs text-gray-500">
          #{row.id}
        </span>
      )
    },
    {
      name: 'Utilisateur',
      selector: (row: User) => `${row.firstName} ${row.lastName}`,
      sortable: true,
      width: '200px',
      cell: (row: User) => (
        <div>
          <div className="font-medium text-gray-800">
            {row.firstName} {row.lastName}
          </div>
          <div className="text-sm text-gray-500">
            {row.email}
          </div>
        </div>
      )
    },
    {
      name: 'Rôle',
      selector: (row: User) => row.role,
      sortable: true,
      width: '100px',
      cell: (row: User) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUserRoleColor(row.role)}`}>
          {getUserRoleLabel(row.role)}
        </span>
      )
    },
    {
      name: 'Commandes',
      selector: (row: User) => getUserStats(row.id || '').ordersCount,
      sortable: true,
      width: '100px',
      cell: (row: User) => (
        <span className="text-sm font-medium text-gray-800">
          {getUserStats(row.id || '').ordersCount}
        </span>
      )
    },
    {
      name: 'Total dépensé',
      selector: (row: User) => getUserStats(row.id || '').totalSpent,
      sortable: true,
      width: '140px',
      cell: (row: User) => (
        <span className="text-sm font-medium text-primary">
          {formatCurrency(getUserStats(row.id || '').totalSpent)}
        </span>
      )
    },
    {
      name: 'Inscription',
      selector: (row: User) => row.createdAt?.toISOString() || '',
      sortable: true,
      width: '120px',
      cell: (row: User) => (
        <div className="text-sm text-gray-600">
          {row.createdAt ? formatDate(row.createdAt) : ''}
        </div>
      )
    },
    {
      name: 'Dernière activité',
      selector: (row: User) => getUserStats(row.id || '').lastActivity,
      sortable: true,
      width: '140px',
      cell: (row: User) => (
        <div className="text-sm text-gray-600">
          {getUserStats(row.id || '').lastActivity !== 'N/A' ? formatDate(getUserStats(row.id || '').lastActivity) : 'N/A'}
        </div>
      )
    },
    {
      name: 'Actions',
      cell: (row: User) => (
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleView(row)}
            className="text-primary hover:text-primary-600 p-1 rounded hover:bg-primary-50 transition-colors"
            title="Voir profil"
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
            onClick={() => handleToggleRole(row)}
            className="text-blue-600 hover:text-blue-700 p-1 rounded hover:bg-blue-50 transition-colors"
            title={row.role === UserRole.ADMIN ? 'Rétrograder en client' : 'Promouvoir en admin'}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
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
      width: '150px'
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

  const getTotalSpent = () => {
    return users.reduce((total, user) => {
      return total + getUserStats(user.id || '').totalSpent;
    }, 0);
  };

  const getTotalOrders = () => {
    return users.reduce((total, user) => {
      return total + getUserStats(user.id || '').ordersCount;
    }, 0);
  };

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Gestion des Utilisateurs</h1>
          <p className="text-gray-600 mt-1">Gérez les comptes clients et administrateurs</p>
        </div>
        <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors flex items-center space-x-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span>Ajouter utilisateur</span>
        </button>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-2 bg-primary-100 rounded-lg">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-800">{totalUsers}</p>
              <p className="text-gray-600 text-sm">Total utilisateurs</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-2 bg-success-100 rounded-lg">
              <svg className="w-6 h-6 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-800">{users.filter(u => u.role === UserRole.CUSTOMER).length}</p>
              <p className="text-gray-600 text-sm">Clients</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-2 bg-accent-100 rounded-lg">
              <svg className="w-6 h-6 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-800">{users.filter(u => u.role === UserRole.ADMIN).length}</p>
              <p className="text-gray-600 text-sm">Administrateurs</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-2 bg-secondary-100 rounded-lg">
              <svg className="w-6 h-6 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-800">{(getTotalSpent() / 1000000).toFixed(1)}M</p>
              <p className="text-gray-600 text-sm">Chiffre d'affaires</p>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Rechercher</label>
            <input
              type="text"
              placeholder="Nom, email, ID..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Rôle</label>
            <select 
              value={filters.role}
              onChange={(e) => handleFilterChange('role', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">Tous les rôles</option>
              <option value={UserRole.CUSTOMER}>Clients</option>
              <option value={UserRole.ADMIN}>Administrateurs</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Activité</label>
            <select 
              value={filters.activityFilter}
              onChange={(e) => handleFilterChange('activityFilter', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">Toute activité</option>
              <option value="active">Actif (7 derniers jours)</option>
              <option value="inactive">Inactif (plus de 30 jours)</option>
              <option value="new">Nouveau (moins de 7 jours)</option>
            </select>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
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
          data={filteredUsers}
          pagination
          paginationServer
          paginationTotalRows={totalUsers}
          paginationDefaultPage={currentPage}
          paginationPerPage={perPage}
          paginationRowsPerPageOptions={[5, 10, 15, 20]}
          onChangeRowsPerPage={setPerPage}
          onChangePage={setCurrentPage}
          // customStyles={customStyles}
          highlightOnHover
          striped
          responsive
          progressPending={isLoading}
          progressComponent={
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-gray-600">Chargement des utilisateurs...</p>
            </div>
          }
          noDataComponent={
            <div className="text-center py-12">
              <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-700 mb-2">Aucun utilisateur trouvé</h3>
              <p className="text-gray-500">Aucun utilisateur ne correspond à vos critères de recherche.</p>
            </div>
          }
        />
      </div>
    </div>
  );
}