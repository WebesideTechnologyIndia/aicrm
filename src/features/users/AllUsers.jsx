import { useState } from 'react';
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
  XCircle
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Badge from '../../components/ui/Badge';
import { formatDate, formatPhone } from '../../utils/format';

const AllUsers = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showActionMenu, setShowActionMenu] = useState(null);

  // Mock data - Replace with API
  const users = [
    {
      id: 1,
      name: 'Amit Sharma',
      email: 'amit.sharma@aicrm.com',
      phone: '9876543210',
      role: 'sales',
      status: 'active',
      team: 'Team A',
      joiningDate: '2025-01-15',
      leadsAssigned: 45,
      lastActive: '2 hours ago',
    },
    {
      id: 2,
      name: 'Priya Singh',
      email: 'priya.singh@aicrm.com',
      phone: '9876543211',
      role: 'sales',
      status: 'active',
      team: 'Team B',
      joiningDate: '2025-02-10',
      leadsAssigned: 38,
      lastActive: '1 hour ago',
    },
    {
      id: 3,
      name: 'Rajesh Kumar',
      email: 'rajesh.kumar@aicrm.com',
      phone: '9876543212',
      role: 'tl',
      status: 'active',
      team: 'Team A',
      joiningDate: '2024-11-20',
      leadsAssigned: 25,
      lastActive: '30 mins ago',
    },
    {
      id: 4,
      name: 'Sneha Patel',
      email: 'sneha.patel@aicrm.com',
      phone: '9876543213',
      role: 'manager',
      status: 'active',
      team: 'All Teams',
      joiningDate: '2024-09-05',
      leadsAssigned: 15,
      lastActive: '5 mins ago',
    },
    {
      id: 5,
      name: 'Vikram Rao',
      email: 'vikram.rao@aicrm.com',
      phone: '9876543214',
      role: 'director',
      status: 'active',
      team: 'All Teams',
      joiningDate: '2024-06-01',
      leadsAssigned: 8,
      lastActive: 'Just now',
    },
    {
      id: 6,
      name: 'Anita Desai',
      email: 'anita.desai@aicrm.com',
      phone: '9876543215',
      role: 'partner',
      status: 'active',
      team: 'External',
      joiningDate: '2025-03-12',
      leadsAssigned: 52,
      lastActive: '3 hours ago',
    },
    {
      id: 7,
      name: 'Admin User',
      email: 'admin@aicrm.com',
      phone: '9876543216',
      role: 'admin',
      status: 'active',
      team: 'Admin',
      joiningDate: '2024-01-01',
      leadsAssigned: 0,
      lastActive: 'Just now',
    },
  ];

  const tabs = [
    { id: 'all', label: 'All Users', count: users.length },
    { id: 'sales', label: 'Sales', count: users.filter(u => u.role === 'sales').length },
    { id: 'tl', label: 'Team Leaders', count: users.filter(u => u.role === 'tl').length },
    { id: 'manager', label: 'Managers', count: users.filter(u => u.role === 'manager').length },
    { id: 'director', label: 'Directors', count: users.filter(u => u.role === 'director').length },
    { id: 'partner', label: 'Channel Partners', count: users.filter(u => u.role === 'partner').length },
    { id: 'admin', label: 'Admin', count: users.filter(u => u.role === 'admin').length },
  ];

  const getRoleBadgeColor = (role) => {
    const colors = {
      sales: 'info',
      tl: 'primary',
      manager: 'warning',
      director: 'danger',
      partner: 'success',
      admin: 'default',
    };
    return colors[role] || 'default';
  };

  const getRoleLabel = (role) => {
    const labels = {
      sales: 'Sales',
      tl: 'Team Leader',
      manager: 'Manager',
      director: 'Director',
      partner: 'Channel Partner',
      admin: 'Admin',
    };
    return labels[role] || role;
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || user.role === activeTab;
    return matchesSearch && matchesTab;
  });

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
          <p className="text-sm text-gray-600">Active</p>
          <p className="text-2xl font-bold text-green-600 mt-1">
            {users.filter(u => u.status === 'active').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Sales Team</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">
            {users.filter(u => u.role === 'sales').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Channel Partners</p>
          <p className="text-2xl font-bold text-purple-600 mt-1">
            {users.filter(u => u.role === 'partner').length}
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
                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Team</th>
                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Leads</th>
                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Joining Date</th>
                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Last Active</th>
                <th className="text-right py-3 px-4 font-semibold text-sm text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                        <span className="text-sm font-semibold text-primary-600">
                          {user.name.split(' ').map(n => n[0]).join('')}
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
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Phone className="h-4 w-4 text-gray-400" />
                        {formatPhone(user.phone)}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <Badge variant={getRoleBadgeColor(user.role)}>
                      {getRoleLabel(user.role)}
                    </Badge>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-sm text-gray-700">{user.team}</p>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      {user.status === 'active' ? (
                        <>
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-sm text-green-600 font-medium">Active</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="h-4 w-4 text-red-600" />
                          <span className="text-sm text-red-600 font-medium">Inactive</span>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-sm font-medium text-gray-900">{user.leadsAssigned}</p>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-sm text-gray-700">{formatDate(user.joiningDate)}</p>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-sm text-gray-600">{user.lastActive}</p>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => navigate(`/users/edit/${user.id}`)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit className="h-4 w-4 text-gray-600" />
                      </button>
                      <button
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Permissions"
                      >
                        <Shield className="h-4 w-4 text-gray-600" />
                      </button>
                      <div className="relative">
                        <button
                          onClick={() => setShowActionMenu(showActionMenu === user.id ? null : user.id)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <MoreVertical className="h-4 w-4 text-gray-600" />
                        </button>
                        {showActionMenu === user.id && (
                          <>
                            <div 
                              className="fixed inset-0 z-10" 
                              onClick={() => setShowActionMenu(null)}
                            />
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
                              <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                <Shield className="h-4 w-4" />
                                Manage Permissions
                              </button>
                              <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                Reset Password
                              </button>
                              <hr className="my-2" />
                              <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                                <Trash2 className="h-4 w-4" />
                                Delete User
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
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
            <Button variant="outline" size="sm">1</Button>
            <Button size="sm">2</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AllUsers;