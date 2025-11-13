import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Shield,
  Mail,
  Phone,
  CheckCircle,
  XCircle,
  Eye
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Badge from '../../components/ui/Badge';
import toast from 'react-hot-toast';
import { usersAPI } from '../../services/api';
import useAuthStore from '../../store/authStore';

const AllUsers = () => {
  const navigate = useNavigate();
  const { user: currentUser } = useAuthStore();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showActionMenu, setShowActionMenu] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data } = await usersAPI.getAll();
      
      if (data.success) {
        setUsers(data.users || []);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try {
      const { data } = await usersAPI.delete(userId);
      
      if (data.success) {
        toast.success('User deleted successfully!');
        fetchUsers();
        setShowActionMenu(null);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error(error.response?.data?.message || 'Failed to delete user');
    }
  };

  const tabs = [
    { id: 'all', label: 'All Users', count: users.length },
    { id: 'Admin', label: 'Admin', count: users.filter(u => u.role === 'Admin').length },
    { id: 'Manager', label: 'Managers', count: users.filter(u => u.role === 'Manager').length },
    { id: 'Sales', label: 'Sales', count: users.filter(u => u.role === 'Sales').length },
    { id: 'Support', label: 'Support', count: users.filter(u => u.role === 'Support').length },
  ];

  const getRoleBadgeColor = (role) => {
    const colors = {
      'Admin': 'error',
      'Manager': 'warning',
      'Sales': 'success',
      'Support': 'info',
    };
    return colors[role] || 'default';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatPhone = (phone) => {
    if (!phone) return 'N/A';
    return phone;
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || user.role === activeTab;
    return matchesSearch && matchesTab;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600 mt-1">Manage users, roles, and permissions</p>
        </div>
        <Button onClick={() => navigate('/users/add')} icon={<Plus className="h-4 w-4" />}>
          Add User
        </Button>
      </div>

      {/* Tabs */}
      <Card>
        <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Search & Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <Input
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<Search className="h-5 w-5" />}
            className="md:col-span-2"
          />
          <Button variant="outline" icon={<Filter className="h-4 w-4" />} className="w-full">
            More Filters
          </Button>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Total Users</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{users.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Admins</p>
          <p className="text-2xl font-bold text-red-600 mt-1">
            {users.filter(u => u.role === 'Admin').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Sales Team</p>
          <p className="text-2xl font-bold text-green-600 mt-1">
            {users.filter(u => u.role === 'Sales').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Managers</p>
          <p className="text-2xl font-bold text-orange-600 mt-1">
            {users.filter(u => u.role === 'Manager').length}
          </p>
        </div>
      </div>

      {/* Users Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">User</th>
                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Contact</th>
                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Role</th>
                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Joining Date</th>
                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Last Updated</th>
                <th className="text-right py-3 px-4 font-semibold text-sm text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-gray-500">
                    {searchQuery ? 'No users found matching your search' : 'No users available'}
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                          <span className="text-sm font-semibold text-primary-600">
                            {user.name?.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <Mail className="h-4 w-4 text-gray-400" />
                          {user.email}
                        </div>
                        {user.phone && (
                          <div className="flex items-center gap-2 text-sm text-gray-700">
                            <Phone className="h-4 w-4 text-gray-400" />
                            {formatPhone(user.phone)}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant={getRoleBadgeColor(user.role)}>
                        {user.role}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-sm text-gray-700">{formatDate(user.createdAt)}</p>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-sm text-gray-600">{formatDate(user.updatedAt)}</p>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => navigate(`/users/edit/${user._id}`)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4 text-gray-600" />
                        </button>
                        <div className="relative">
                          <button
                            onClick={() => setShowActionMenu(showActionMenu === user._id ? null : user._id)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            <MoreVertical className="h-4 w-4 text-gray-600" />
                          </button>
                          {showActionMenu === user._id && (
                            <>
                              <div 
                                className="fixed inset-0 z-10" 
                                onClick={() => setShowActionMenu(null)}
                              />
                              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
                                <button 
                                  onClick={() => navigate(`/users/edit/${user._id}`)}
                                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                >
                                  <Edit className="h-4 w-4" />
                                  Edit User
                                </button>
                                <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                  <Shield className="h-4 w-4" />
                                  Manage Permissions
                                </button>
                                <hr className="my-2" />
                                {currentUser?.role === 'Admin' && user._id !== currentUser._id && (
                                  <button 
                                    onClick={() => handleDeleteUser(user._id)}
                                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                    Delete User
                                  </button>
                                )}
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Showing {filteredUsers.length} of {users.length} users
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">Previous</Button>
            <Button size="sm">1</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AllUsers;