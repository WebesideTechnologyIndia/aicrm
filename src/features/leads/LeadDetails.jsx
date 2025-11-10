import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft, 
  Phone, 
  Mail, 
  MessageSquare,
  Edit,
  Trash2,
  Calendar,
  MapPin,
  Home,
  IndianRupee,
  Clock,
  User,
  Activity
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { formatDate, formatPhone, formatRelativeTime } from '../../utils/format';

const LeadDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');

  // Dummy data - Replace with API call
  const lead = {
    id: 1,
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@email.com',
    phone: '9876543210',
    stage: 'Contacted',
    status: 'Follow up',
    source: 'Website',
    score: 85,
    propertyType: '3BHK Apartment',
    budget: '50-75L',
    location: 'Dwarka, Delhi',
    bedrooms: '3',
    assignedTo: 'Sales Team A',
    createdAt: '2025-11-08',
    notes: 'Very interested in South Delhi properties. Prefers ready-to-move-in flats.',
  };

  const activities = [
    {
      id: 1,
      type: 'call',
      title: 'Phone Call',
      description: 'Called and discussed property requirements',
      user: 'Sales Rep',
      time: '2 hours ago',
    },
    {
      id: 2,
      type: 'email',
      title: 'Email Sent',
      description: 'Sent property brochure for 3BHK in Dwarka',
      user: 'Sales Rep',
      time: '5 hours ago',
    },
    {
      id: 3,
      type: 'note',
      title: 'Note Added',
      description: 'Customer very interested, schedule site visit',
      user: 'Manager',
      time: '1 day ago',
    },
    {
      id: 4,
      type: 'status',
      title: 'Status Changed',
      description: 'Changed from "New" to "Contacted"',
      user: 'System',
      time: '1 day ago',
    },
    {
      id: 5,
      type: 'created',
      title: 'Lead Created',
      description: 'Lead added from Website',
      user: 'System',
      time: '2 days ago',
    },
  ];

  const communications = [
    {
      id: 1,
      type: 'call',
      subject: 'Discussion about 3BHK properties',
      date: '2025-11-08 10:30 AM',
      duration: '15 mins',
      notes: 'Customer wants properties in South Delhi, ready to move',
    },
    {
      id: 2,
      type: 'email',
      subject: 'Property brochure sent',
      date: '2025-11-07 03:00 PM',
      status: 'Opened',
    },
    {
      id: 3,
      type: 'whatsapp',
      subject: 'Follow-up message',
      date: '2025-11-06 11:00 AM',
      status: 'Delivered',
    },
  ];

  const interestedProperties = [
    {
      id: 1,
      name: 'Luxury 3BHK in Dwarka Sec 12',
      price: '₹65 Lakhs',
      location: 'Dwarka, Delhi',
      status: 'Shortlisted',
    },
    {
      id: 2,
      name: '3BHK Ready to Move in Janakpuri',
      price: '₹58 Lakhs',
      location: 'Janakpuri, Delhi',
      status: 'Viewed',
    },
  ];

  const getActivityIcon = (type) => {
    const icons = {
      call: <Phone className="h-4 w-4" />,
      email: <Mail className="h-4 w-4" />,
      note: <MessageSquare className="h-4 w-4" />,
      status: <Activity className="h-4 w-4" />,
      created: <User className="h-4 w-4" />,
    };
    return icons[type] || <Activity className="h-4 w-4" />;
  };

  const getActivityColor = (type) => {
    const colors = {
      call: 'bg-blue-100 text-blue-600',
      email: 'bg-green-100 text-green-600',
      note: 'bg-yellow-100 text-yellow-600',
      status: 'bg-purple-100 text-purple-600',
      created: 'bg-gray-100 text-gray-600',
    };
    return colors[type] || 'bg-gray-100 text-gray-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <button
            onClick={() => navigate('/leads')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors mt-1"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900">{lead.name}</h1>
              <Badge variant="info">{lead.stage}</Badge>
              <Badge variant="warning">{lead.status}</Badge>
            </div>
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Mail className="h-4 w-4" />
                {lead.email}
              </div>
              <div className="flex items-center gap-1">
                <Phone className="h-4 w-4" />
                {formatPhone(lead.phone)}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                Created {formatDate(lead.createdAt)}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" icon={<Phone className="h-4 w-4" />}>
            Call
          </Button>
          <Button variant="outline" icon={<Mail className="h-4 w-4" />}>
            Email
          </Button>
          <Button variant="outline" icon={<MessageSquare className="h-4 w-4" />}>
            WhatsApp
          </Button>
          <Button 
            variant="primary" 
            icon={<Edit className="h-4 w-4" />}
            onClick={() => navigate(`/leads/edit/${id}`)}
          >
            Edit
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex gap-6">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-3 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'overview'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('activity')}
            className={`pb-3 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'activity'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Activity
          </button>
          <button
            onClick={() => setActiveTab('communications')}
            className={`pb-3 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'communications'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Communications
          </button>
          <button
            onClick={() => setActiveTab('properties')}
            className={`pb-3 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'properties'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Properties
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {activeTab === 'overview' && (
            <>
              {/* Property Requirements */}
              <Card title="Property Requirements">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <Home className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Property Type</p>
                      <p className="font-semibold text-gray-900">{lead.propertyType}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                      <IndianRupee className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Budget</p>
                      <p className="font-semibold text-gray-900">₹{lead.budget}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Location</p>
                      <p className="font-semibold text-gray-900">{lead.location}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
                      <Home className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Bedrooms</p>
                      <p className="font-semibold text-gray-900">{lead.bedrooms} BHK</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Notes */}
              <Card title="Notes">
                <p className="text-gray-700">{lead.notes}</p>
              </Card>
            </>
          )}

          {activeTab === 'activity' && (
            <Card title="Activity Timeline">
              <div className="space-y-4">
                {activities.map((activity, index) => (
                  <div key={activity.id} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getActivityColor(activity.type)}`}>
                        {getActivityIcon(activity.type)}
                      </div>
                      {index < activities.length - 1 && (
                        <div className="w-0.5 h-full bg-gray-200 mt-2" />
                      )}
                    </div>
                    <div className="flex-1 pb-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-semibold text-gray-900">{activity.title}</p>
                          <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                        </div>
                        <span className="text-xs text-gray-500">{activity.time}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">By {activity.user}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {activeTab === 'communications' && (
            <Card title="Communication History">
              <div className="space-y-3">
                {communications.map((comm) => (
                  <div key={comm.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          comm.type === 'call' ? 'bg-blue-100' : 
                          comm.type === 'email' ? 'bg-green-100' : 'bg-yellow-100'
                        }`}>
                          {comm.type === 'call' && <Phone className="h-5 w-5 text-blue-600" />}
                          {comm.type === 'email' && <Mail className="h-5 w-5 text-green-600" />}
                          {comm.type === 'whatsapp' && <MessageSquare className="h-5 w-5 text-yellow-600" />}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{comm.subject}</p>
                          <p className="text-sm text-gray-600 mt-1">{comm.date}</p>
                          {comm.notes && <p className="text-sm text-gray-700 mt-2">{comm.notes}</p>}
                        </div>
                      </div>
                      {comm.status && (
                        <Badge variant="success" size="sm">{comm.status}</Badge>
                      )}
                      {comm.duration && (
                        <Badge variant="info" size="sm">{comm.duration}</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {activeTab === 'properties' && (
            <Card title="Interested Properties">
              <div className="space-y-3">
                {interestedProperties.map((property) => (
                  <div key={property.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{property.name}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {property.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <IndianRupee className="h-4 w-4" />
                            {property.price}
                          </div>
                        </div>
                      </div>
                      <Badge variant={property.status === 'Shortlisted' ? 'warning' : 'info'}>
                        {property.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Lead Info */}
          <Card title="Lead Information">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Lead Source</p>
                <p className="font-semibold text-gray-900 mt-1">{lead.source}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Assigned To</p>
                <p className="font-semibold text-gray-900 mt-1">{lead.assignedTo}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-2">Lead Score</p>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-primary-600 h-3 rounded-full transition-all"
                      style={{ width: `${lead.score}%` }}
                    />
                  </div>
                  <span className="text-lg font-bold text-primary-600">{lead.score}</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Quick Actions */}
          <Card title="Quick Actions">
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start" icon={<Calendar className="h-4 w-4" />}>
                Schedule Site Visit
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start" icon={<MessageSquare className="h-4 w-4" />}>
                Add Note
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start" icon={<User className="h-4 w-4" />}>
                Reassign Lead
              </Button>
              <Button variant="danger" size="sm" className="w-full justify-start" icon={<Trash2 className="h-4 w-4" />}>
                Delete Lead
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LeadDetails;