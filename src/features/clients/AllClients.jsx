import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Filter,
  Mail,
  Phone,
  MapPin,
  Edit,
  Trash2,
  Eye,
  MoreVertical
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Badge from '../../components/ui/Badge';
import { formatDate, formatPhone } from '../../utils/format';

const AllClients = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showActionMenu, setShowActionMenu] = useState(null);

  // Mock data
  const clients = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      email: 'rajesh.kumar@email.com',
      phone: '9876543210',
      city: 'Delhi',
      state: 'Delhi',
      propertyType: '3BHK Apartment',
      budget: '50-75L',
      leadStatus: 'Hot',
      source: 'Website',
      assignedTo: 'Sales Team A',
      createdAt: '2025-11-08',
    },
    {
      id: 2,
      name: 'Priya Sharma',
      email: 'priya.sharma@email.com',
      phone: '9876543211',
      city: 'Gurgaon',
      state: 'Haryana',
      propertyType: '4BHK Villa',
      budget: '1-1.5Cr',
      leadStatus: 'Warm',
      source: 'Referral',
      assignedTo: 'Sales Team B',
      createdAt: '2025-11-07',
    },
    {
      id: 3,
      name: 'Amit Patel',
      email: 'amit.patel@email.com',
      phone: '9876543212',
      city: 'Noida',
      state: 'Uttar Pradesh',
      propertyType: 'Commercial Plot',
      budget: '2Cr+',
      leadStatus: 'Hot',
      source: 'Facebook Ads',
      assignedTo: 'Manager',
      createdAt: '2025-11-06',
    },
  ];

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getLeadStatusColor = (status) => {
    const colors = {
      'Hot': 'danger',
      'Warm': 'warning',
      'Cold': 'default',
    };
    return colors[status] || 'default';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">All Clients</h1>
          <p className="text-gray-600 mt-1">Manage all your clients and their requirements</p>
        </div>
        <Button onClick={() => navigate('/clients/add')} icon={<Plus className="h-4 w-4" />}>
          Add Client
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            placeholder="Search clients..."
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
          <p className="text-sm text-gray-600">Total Clients</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{clients.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Hot Leads</p>
          <p className="text-2xl font-bold text-red-600 mt-1">
            {clients.filter(c => c.leadStatus === 'Hot').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Warm Leads</p>
          <p className="text-2xl font-bold text-orange-600 mt-1">
            {clients.filter(c => c.leadStatus === 'Warm').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">This Month</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">15</p>
        </div>
      </div>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredClients.map((client) => (
          <Card key={client.id} className="hover:shadow-lg transition-shadow">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                    <span className="text-lg font-semibold text-primary-600">
                      {client.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{client.name}</h3>
                    <Badge variant={getLeadStatusColor(client.leadStatus)}>
                      {client.leadStatus} Lead
                    </Badge>
                  </div>
                </div>
                <div className="relative">
                  <button
                    onClick={() => setShowActionMenu(showActionMenu === client.id ? null : client.id)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </button>
                  {showActionMenu === client.id && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setShowActionMenu(null)} />
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-2 z-20">
                        <button
                          onClick={() => navigate(`/clients/edit/${client.id}`)}
                          className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50"
                        >
                          <Edit className="h-4 w-4" />
                          Edit Client
                        </button>
                        <button className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50">
                          <Eye className="h-4 w-4" />
                          View Details
                        </button>
                        <hr className="my-2" />
                        <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Mail className="h-4 w-4 text-gray-400" />
                  {client.email}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Phone className="h-4 w-4 text-gray-400" />
                  {formatPhone(client.phone)}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  {client.city}, {client.state}
                </div>
              </div>

              <div className="pt-3 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-600">Looking For</p>
                    <p className="text-sm font-medium text-gray-900 mt-1">{client.propertyType}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Budget</p>
                    <p className="text-sm font-medium text-gray-900 mt-1">₹{client.budget}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Source</p>
                    <p className="text-sm font-medium text-gray-900 mt-1">{client.source}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Assigned To</p>
                    <p className="text-sm font-medium text-gray-900 mt-1">{client.assignedTo}</p>
                  </div>
                </div>
              </div>

              <div className="text-xs text-gray-500">
                Added {formatDate(client.createdAt)}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AllClients;