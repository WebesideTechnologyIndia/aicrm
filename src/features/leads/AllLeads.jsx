import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Upload,
  Phone,
  Mail,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  UserPlus
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Badge from '../../components/ui/Badge';
import { formatDate, formatPhone } from '../../utils/format';

const AllLeads = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStage, setSelectedStage] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [showActionMenu, setShowActionMenu] = useState(null);

  // Dummy data - Replace with API call
  const leads = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      email: 'rajesh.kumar@email.com',
      phone: '9876543210',
      stage: 'New',
      status: 'Unanswered',
      source: 'Website',
      budget: '50-75L',
      property: '3BHK in Dwarka',
      assignedTo: 'Sales Team A',
      createdAt: '2025-11-08',
      score: 85,
    },
    {
      id: 2,
      name: 'Priya Sharma',
      email: 'priya.sharma@email.com',
      phone: '9876543211',
      stage: 'Contacted',
      status: 'Follow up',
      source: 'Facebook Ads',
      budget: '75L-1Cr',
      property: '4BHK in Gurgaon',
      assignedTo: 'Sales Team B',
      createdAt: '2025-11-07',
      score: 92,
    },
    {
      id: 3,
      name: 'Amit Patel',
      email: 'amit.patel@email.com',
      phone: '9876543212',
      stage: 'Site Visit',
      status: 'Scheduled',
      source: 'Referral',
      budget: '1-1.5Cr',
      property: 'Villa in Noida',
      assignedTo: 'Manager',
      createdAt: '2025-11-06',
      score: 78,
    },
    {
      id: 4,
      name: 'Neha Gupta',
      email: 'neha.gupta@email.com',
      phone: '9876543213',
      stage: 'Negotiation',
      status: 'Hot Lead',
      source: 'Google Ads',
      budget: '40-60L',
      property: '2BHK in Delhi',
      assignedTo: 'Sales Team A',
      createdAt: '2025-11-05',
      score: 95,
    },
    {
      id: 5,
      name: 'Vikram Singh',
      email: 'vikram.singh@email.com',
      phone: '9876543214',
      stage: 'Closed',
      status: 'Won',
      source: 'Website',
      budget: '80L-1Cr',
      property: '3BHK in Faridabad',
      assignedTo: 'Sales Team B',
      createdAt: '2025-11-04',
      score: 88,
    },
  ];

  const stageOptions = [
    { value: '', label: 'All Stages' },
    { value: 'New', label: 'New' },
    { value: 'Contacted', label: 'Contacted' },
    { value: 'Site Visit', label: 'Site Visit' },
    { value: 'Negotiation', label: 'Negotiation' },
    { value: 'Closed', label: 'Closed' },
    { value: 'Lost', label: 'Lost' },
  ];

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'Unanswered', label: 'Unanswered' },
    { value: 'Follow up', label: 'Follow up' },
    { value: 'Scheduled', label: 'Scheduled' },
    { value: 'Hot Lead', label: 'Hot Lead' },
    { value: 'Won', label: 'Won' },
    { value: 'Lost', label: 'Lost' },
  ];

  const getStageColor = (stage) => {
    const colors = {
      'New': 'default',
      'Contacted': 'info',
      'Site Visit': 'warning',
      'Negotiation': 'primary',
      'Closed': 'success',
      'Lost': 'danger',
    };
    return colors[stage] || 'default';
  };

  const getStatusColor = (status) => {
    const colors = {
      'Unanswered': 'default',
      'Follow up': 'warning',
      'Scheduled': 'info',
      'Hot Lead': 'danger',
      'Won': 'success',
      'Lost': 'danger',
    };
    return colors[status] || 'default';
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lead.phone.includes(searchQuery);
    const matchesStage = !selectedStage || lead.stage === selectedStage;
    const matchesStatus = !selectedStatus || lead.status === selectedStatus;
    return matchesSearch && matchesStage && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">All Leads</h1>
          <p className="text-gray-600 mt-1">Manage and track all your leads</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" icon={<Upload className="h-4 w-4" />}>
            Import
          </Button>
          <Button variant="outline" icon={<Download className="h-4 w-4" />}>
            Export
          </Button>
          <Button onClick={() => navigate('/leads/add')} icon={<Plus className="h-4 w-4" />}>
            Add Lead
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Input
            placeholder="Search by name, email, phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<Search className="h-5 w-5" />}
          />
          <Select
            value={selectedStage}
            onChange={(e) => setSelectedStage(e.target.value)}
            options={stageOptions}
          />
          <Select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            options={statusOptions}
          />
          <Button variant="outline" icon={<Filter className="h-4 w-4" />} className="w-full">
            More Filters
          </Button>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Total Leads</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{leads.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">New</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">
            {leads.filter(l => l.stage === 'New').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Contacted</p>
          <p className="text-2xl font-bold text-purple-600 mt-1">
            {leads.filter(l => l.stage === 'Contacted').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Hot Leads</p>
          <p className="text-2xl font-bold text-orange-600 mt-1">
            {leads.filter(l => l.status === 'Hot Lead').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Closed</p>
          <p className="text-2xl font-bold text-green-600 mt-1">
            {leads.filter(l => l.stage === 'Closed').length}
          </p>
        </div>
      </div>

      {/* Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Lead</th>
                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Contact</th>
                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Stage</th>
                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Property</th>
                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Budget</th>
                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Score</th>
                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Assigned To</th>
                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Date</th>
                <th className="text-right py-3 px-4 font-semibold text-sm text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                        <span className="text-sm font-semibold text-primary-600">
                          {lead.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{lead.name}</p>
                        <p className="text-sm text-gray-500">{lead.source}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Mail className="h-4 w-4 text-gray-400" />
                        {lead.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Phone className="h-4 w-4 text-gray-400" />
                        {formatPhone(lead.phone)}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <Badge variant={getStageColor(lead.stage)}>{lead.stage}</Badge>
                  </td>
                  <td className="py-4 px-4">
                    <Badge variant={getStatusColor(lead.status)}>{lead.status}</Badge>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-sm text-gray-900">{lead.property}</p>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-sm font-medium text-gray-900">{lead.budget}</p>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-12 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            lead.score >= 90 ? 'bg-green-500' : 
                            lead.score >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${lead.score}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-700">{lead.score}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-sm text-gray-700">{lead.assignedTo}</p>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-sm text-gray-700">{formatDate(lead.createdAt)}</p>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => navigate(`/leads/${lead.id}`)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4 text-gray-600" />
                      </button>
                      <button
                        onClick={() => navigate(`/leads/edit/${lead.id}`)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit className="h-4 w-4 text-gray-600" />
                      </button>
                      <div className="relative">
                        <button
                          onClick={() => setShowActionMenu(showActionMenu === lead.id ? null : lead.id)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <MoreVertical className="h-4 w-4 text-gray-600" />
                        </button>
                        {showActionMenu === lead.id && (
                          <>
                            <div 
                              className="fixed inset-0 z-10" 
                              onClick={() => setShowActionMenu(null)}
                            />
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
                              <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                <Phone className="h-4 w-4" />
                                Call Lead
                              </button>
                              <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                <Mail className="h-4 w-4" />
                                Send Email
                              </button>
                              <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                <UserPlus className="h-4 w-4" />
                                Assign Lead
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Showing {filteredLeads.length} of {leads.length} leads
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">Previous</Button>
            <Button variant="outline" size="sm">1</Button>
            <Button size="sm">2</Button>
            <Button variant="outline" size="sm">3</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AllLeads;