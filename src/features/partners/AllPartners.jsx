import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Mail,
  Phone,
  Eye,
  TrendingUp
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Badge from '../../components/ui/Badge';
import { formatDate, formatPhone } from '../../utils/format';

const AllPartners = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showActionMenu, setShowActionMenu] = useState(null);

  // Mock data
  const partners = [
    {
      id: 1,
      name: 'Amit Properties',
      contactPerson: 'Amit Sharma',
      email: 'amit@properties.com',
      phone: '9876543210',
      city: 'Delhi',
      state: 'Delhi',
      propertyTypes: ['Residential', 'Commercial'],
      dealsCompleted: 45,
      activeLeads: 12,
      totalCommission: '15.5L',
      status: 'active',
      joinedDate: '2024-06-15',
      rating: 4.5,
    },
    {
      id: 2,
      name: 'Real Estate Hub',
      contactPerson: 'Priya Verma',
      email: 'priya@realestate.com',
      phone: '9876543211',
      city: 'Gurgaon',
      state: 'Haryana',
      propertyTypes: ['Residential', 'Plot'],
      dealsCompleted: 32,
      activeLeads: 8,
      totalCommission: '12.8L',
      status: 'active',
      joinedDate: '2024-08-20',
      rating: 4.8,
    },
    {
      id: 3,
      name: 'Prime Realty',
      contactPerson: 'Rajesh Gupta',
      email: 'rajesh@prime.com',
      phone: '9876543212',
      city: 'Noida',
      state: 'Uttar Pradesh',
      propertyTypes: ['Commercial', 'Farmland'],
      dealsCompleted: 28,
      activeLeads: 15,
      totalCommission: '18.2L',
      status: 'active',
      joinedDate: '2024-05-10',
      rating: 4.3,
    },
    {
      id: 4,
      name: 'Elite Properties',
      contactPerson: 'Sneha Kapoor',
      email: 'sneha@elite.com',
      phone: '9876543213',
      city: 'Faridabad',
      state: 'Haryana',
      propertyTypes: ['Residential'],
      dealsCompleted: 18,
      activeLeads: 6,
      totalCommission: '8.5L',
      status: 'inactive',
      joinedDate: '2024-09-01',
      rating: 4.0,
    },
  ];

  const filteredPartners = partners.filter(partner => {
    const matchesSearch = 
      partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const getRatingStars = (rating) => {
    return '⭐'.repeat(Math.floor(rating));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Channel Partners</h1>
          <p className="text-gray-600 mt-1">Manage all your channel partners</p>
        </div>
        <Button onClick={() => navigate('/partners/add')} icon={<Plus className="h-4 w-4" />}>
          Add Partner
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            placeholder="Search partners..."
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
          <p className="text-sm text-gray-600">Total Partners</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{partners.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Active</p>
          <p className="text-2xl font-bold text-green-600 mt-1">
            {partners.filter(p => p.status === 'active').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Total Deals</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">
            {partners.reduce((sum, p) => sum + p.dealsCompleted, 0)}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Active Leads</p>
          <p className="text-2xl font-bold text-purple-600 mt-1">
            {partners.reduce((sum, p) => sum + p.activeLeads, 0)}
          </p>
        </div>
      </div>

      {/* Partners Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredPartners.map((partner) => (
          <Card key={partner.id} className="hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                      <span className="text-lg font-semibold text-primary-600">
                        {partner.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{partner.name}</h3>
                      <p className="text-sm text-gray-600">{partner.contactPerson}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={partner.status === 'active' ? 'success' : 'default'}>
                      {partner.status === 'active' ? 'Active' : 'Inactive'}
                    </Badge>
                    <div className="relative">
                      <button
                        onClick={() => setShowActionMenu(showActionMenu === partner.id ? null : partner.id)}
                        className="p-2 hover:bg-gray-100 rounded-lg"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </button>
                      {showActionMenu === partner.id && (
                        <>
                          <div className="fixed inset-0 z-10" onClick={() => setShowActionMenu(null)} />
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
                            <button
                              onClick={() => navigate(`/partners/edit/${partner.id}`)}
                              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            >
                              <Edit className="h-4 w-4" />
                              Edit Partner
                            </button>
                            <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
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
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Mail className="h-4 w-4 text-gray-400" />
                    {partner.email}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Phone className="h-4 w-4 text-gray-400" />
                    {formatPhone(partner.phone)}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="text-gray-400">📍</span>
                    {partner.city}, {partner.state}
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {partner.propertyTypes.map((type, idx) => (
                    <Badge key={idx} variant="info" size="sm">{type}</Badge>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-xl font-bold text-gray-900">{partner.dealsCompleted}</p>
                      <p className="text-xs text-gray-600 mt-1">Deals Closed</p>
                    </div>
                    <div>
                      <p className="text-xl font-bold text-orange-600">{partner.activeLeads}</p>
                      <p className="text-xs text-gray-600 mt-1">Active Leads</p>
                    </div>
                    <div>
                      <p className="text-xl font-bold text-green-600">₹{partner.totalCommission}</p>
                      <p className="text-xs text-gray-600 mt-1">Commission</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Rating:</span>
                    <span className="text-sm">{getRatingStars(partner.rating)}</span>
                    <span className="text-sm text-gray-600">({partner.rating})</span>
                  </div>
                  <p className="text-xs text-gray-500">Joined {formatDate(partner.joinedDate)}</p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AllPartners;