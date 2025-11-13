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
  Activity,
  Plus,
  CheckCircle2,
  Circle,
  AlertCircle
} from 'lucide-react';

// Mock Card Component
const Card = ({ title, children, className = '' }) => (
  <div className={`bg-white rounded-lg border border-gray-200 ${className}`}>
    {title && (
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>
    )}
    <div className="p-6">{children}</div>
  </div>
);

// Mock Button Component
const Button = ({ children, variant = 'primary', size = 'md', icon, className = '', onClick, disabled }) => {
  const baseStyles = 'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors';
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  };
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {icon}
      {children}
    </button>
  );
};

// Mock Badge Component
const Badge = ({ children, variant = 'default', size = 'md' }) => {
  const variants = {
    default: 'bg-gray-100 text-gray-700',
    primary: 'bg-blue-100 text-blue-700',
    success: 'bg-green-100 text-green-700',
    warning: 'bg-yellow-100 text-yellow-700',
    danger: 'bg-red-100 text-red-700',
    info: 'bg-purple-100 text-purple-700',
  };
  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
  };
  
  return (
    <span className={`inline-flex items-center rounded-full font-medium ${variants[variant]} ${sizes[size]}`}>
      {children}
    </span>
  );
};

// Mock Input Component
const Input = ({ label, error, ...props }) => (
  <div className="space-y-1">
    {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
    <input
      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
        error ? 'border-red-300' : 'border-gray-300'
      }`}
      {...props}
    />
    {error && <p className="text-sm text-red-600">{error}</p>}
  </div>
);

// Mock Textarea Component
const Textarea = ({ label, error, ...props }) => (
  <div className="space-y-1">
    {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
    <textarea
      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
        error ? 'border-red-300' : 'border-gray-300'
      }`}
      {...props}
    />
    {error && <p className="text-sm text-red-600">{error}</p>}
  </div>
);

// Mock Select Component
const Select = ({ label, options = [], error, ...props }) => (
  <div className="space-y-1">
    {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
    <select
      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
        error ? 'border-red-300' : 'border-gray-300'
      }`}
      {...props}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    {error && <p className="text-sm text-red-600">{error}</p>}
  </div>
);

const formatDate = (date) => new Date(date).toLocaleDateString('en-IN');
const formatPhone = (phone) => phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');

const LeadDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Form states for different tabs
  const [noteForm, setNoteForm] = useState({ content: '' });
  const [callForm, setCallForm] = useState({
    duration: '',
    outcome: '',
    nextAction: '',
    notes: ''
  });
  const [taskForm, setTaskForm] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium'
  });
  const [momForm, setMomForm] = useState({
    meetingDate: '',
    attendees: '',
    agenda: '',
    discussion: '',
    actionItems: ''
  });

  // Data states
  const [notes, setNotes] = useState([
    {
      id: 1,
      content: 'Customer is very interested in properties with good connectivity to metro stations.',
      user: 'Sales Rep',
      timestamp: '2025-11-08 14:30'
    },
    {
      id: 2,
      content: 'Prefers ready-to-move-in flats. Budget is flexible if the property meets all requirements.',
      user: 'Manager',
      timestamp: '2025-11-07 10:15'
    }
  ]);

  const [callSummaries, setCallSummaries] = useState([
    {
      id: 1,
      date: '2025-11-08 10:30',
      duration: '15 mins',
      outcome: 'Positive',
      nextAction: 'Schedule site visit for next weekend',
      notes: 'Customer wants properties in South Delhi, ready to move. Very interested in 3BHK options.',
      user: 'Sales Rep'
    },
    {
      id: 2,
      date: '2025-11-06 15:45',
      duration: '8 mins',
      outcome: 'Follow-up Required',
      nextAction: 'Send property brochures via email',
      notes: 'Initial discussion about requirements. Customer requested more information.',
      user: 'Sales Rep'
    }
  ]);

  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Schedule site visit',
      description: 'Arrange site visit for Dwarka properties',
      dueDate: '2025-11-15',
      priority: 'high',
      status: 'pending',
      assignedTo: 'Sales Rep',
      createdAt: '2025-11-08'
    },
    {
      id: 2,
      title: 'Send property brochures',
      description: 'Email detailed brochures for shortlisted properties',
      dueDate: '2025-11-10',
      priority: 'medium',
      status: 'completed',
      assignedTo: 'Sales Rep',
      createdAt: '2025-11-07'
    },
    {
      id: 3,
      title: 'Follow-up call',
      description: 'Call to confirm site visit details',
      dueDate: '2025-11-12',
      priority: 'high',
      status: 'pending',
      assignedTo: 'Sales Rep',
      createdAt: '2025-11-08'
    }
  ]);

  const [meetings, setMeetings] = useState([
    {
      id: 1,
      meetingDate: '2025-11-08 14:00',
      attendees: 'Rajesh Kumar, Sales Rep, Manager',
      agenda: 'Discuss property requirements and budget finalization',
      discussion: 'Discussed various 3BHK options in Dwarka and surrounding areas. Customer prefers ready-to-move-in properties with good connectivity. Willing to stretch budget slightly for the right property.',
      actionItems: '1. Share 5 shortlisted properties by Nov 10\n2. Schedule site visits for Nov 15-16\n3. Prepare loan assistance documentation',
      createdBy: 'Sales Rep',
      createdAt: '2025-11-08 16:30'
    }
  ]);

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

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'danger',
      medium: 'warning',
      low: 'info'
    };
    return colors[priority] || 'default';
  };

  // Handler functions
  const handleAddNote = (e) => {
    e.preventDefault();
    if (!noteForm.content.trim()) return;
    
    const newNote = {
      id: notes.length + 1,
      content: noteForm.content,
      user: 'Current User',
      timestamp: new Date().toLocaleString('en-IN', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      })
    };
    
    setNotes([newNote, ...notes]);
    setNoteForm({ content: '' });
  };

  const handleAddCallSummary = (e) => {
    e.preventDefault();
    if (!callForm.duration || !callForm.outcome) return;
    
    const newCall = {
      id: callSummaries.length + 1,
      date: new Date().toLocaleString('en-IN', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }),
      duration: callForm.duration,
      outcome: callForm.outcome,
      nextAction: callForm.nextAction,
      notes: callForm.notes,
      user: 'Current User'
    };
    
    setCallSummaries([newCall, ...callSummaries]);
    setCallForm({ duration: '', outcome: '', nextAction: '', notes: '' });
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!taskForm.title.trim() || !taskForm.dueDate) return;
    
    const newTask = {
      id: tasks.length + 1,
      title: taskForm.title,
      description: taskForm.description,
      dueDate: taskForm.dueDate,
      priority: taskForm.priority,
      status: 'pending',
      assignedTo: 'Current User',
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    setTasks([newTask, ...tasks]);
    setTaskForm({ title: '', description: '', dueDate: '', priority: 'medium' });
  };

  const handleAddMeeting = (e) => {
    e.preventDefault();
    if (!momForm.meetingDate || !momForm.agenda) return;
    
    const newMeeting = {
      id: meetings.length + 1,
      meetingDate: momForm.meetingDate,
      attendees: momForm.attendees,
      agenda: momForm.agenda,
      discussion: momForm.discussion,
      actionItems: momForm.actionItems,
      createdBy: 'Current User',
      createdAt: new Date().toLocaleString('en-IN')
    };
    
    setMeetings([newMeeting, ...meetings]);
    setMomForm({ meetingDate: '', attendees: '', agenda: '', discussion: '', actionItems: '' });
  };

  const toggleTaskStatus = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, status: task.status === 'completed' ? 'pending' : 'completed' }
        : task
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
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
        <div className="border-b border-gray-200 bg-white rounded-t-lg px-6">
          <div className="flex gap-6">
            {['overview', 'activity', 'communications', 'properties', 'notes', 'calls', 'tasks', 'meetings'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 px-1 border-b-2 font-medium text-sm transition-colors capitalize ${
                  activeTab === tab
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab === 'meetings' ? 'MOM' : tab}
              </button>
            ))}
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

            {activeTab === 'notes' && (
              <Card title="Notes">
                {/* Add Note Form */}
                <form onSubmit={handleAddNote} className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <Textarea
                    placeholder="Add a new note..."
                    value={noteForm.content}
                    onChange={(e) => setNoteForm({ content: e.target.value })}
                    rows={3}
                  />
                  <div className="mt-3 flex justify-end">
                    <Button type="submit" size="sm" icon={<Plus className="h-4 w-4" />}>
                      Add Note
                    </Button>
                  </div>
                </form>

                {/* Notes List */}
                <div className="space-y-4">
                  {notes.map((note) => (
                    <div key={note.id} className="p-4 border border-gray-200 rounded-lg bg-white">
                      <p className="text-gray-800 mb-2">{note.content}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>By {note.user}</span>
                        <span>{note.timestamp}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {activeTab === 'calls' && (
              <Card title="Call Summary">
                {/* Add Call Form */}
                <form onSubmit={handleAddCallSummary} className="mb-6 p-4 bg-gray-50 rounded-lg space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      label="Duration"
                      placeholder="e.g., 15 mins"
                      value={callForm.duration}
                      onChange={(e) => setCallForm({ ...callForm, duration: e.target.value })}
                    />
                    <Input
                      label="Outcome"
                      placeholder="e.g., Positive"
                      value={callForm.outcome}
                      onChange={(e) => setCallForm({ ...callForm, outcome: e.target.value })}
                    />
                  </div>
                  <Input
                    label="Next Action"
                    placeholder="What needs to be done next?"
                    value={callForm.nextAction}
                    onChange={(e) => setCallForm({ ...callForm, nextAction: e.target.value })}
                  />
                  <Textarea
                    label="Call Notes"
                    placeholder="Detailed notes about the call..."
                    value={callForm.notes}
                    onChange={(e) => setCallForm({ ...callForm, notes: e.target.value })}
                    rows={3}
                  />
                  <div className="flex justify-end">
                    <Button type="submit" size="sm" icon={<Plus className="h-4 w-4" />}>
                      Add Call Summary
                    </Button>
                  </div>
                </form>

                {/* Call Summaries List */}
                <div className="space-y-4">
                  {callSummaries.map((call) => (
                    <div key={call.id} className="p-4 border border-gray-200 rounded-lg bg-white">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Phone className="h-5 w-5 text-blue-600" />
                          <span className="font-semibold text-gray-900">{call.date}</span>
                        </div>
                        <Badge variant="info" size="sm">{call.duration}</Badge>
                      </div>
                      <div className="space-y-2">
                        <div>
                          <span className="text-sm font-medium text-gray-700">Outcome: </span>
                          <span className="text-sm text-gray-900">{call.outcome}</span>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-700">Next Action: </span>
                          <span className="text-sm text-gray-900">{call.nextAction}</span>
                        </div>
                        {call.notes && (
                          <div>
                            <span className="text-sm font-medium text-gray-700">Notes: </span>
                            <p className="text-sm text-gray-800 mt-1">{call.notes}</p>
                          </div>
                        )}
                      </div>
                      <div className="mt-3 text-xs text-gray-500">
                        By {call.user}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {activeTab === 'tasks' && (
              <Card title="Tasks">
                {/* Add Task Form */}
                <form onSubmit={handleAddTask} className="mb-6 p-4 bg-gray-50 rounded-lg space-y-3">
                  <Input
                    label="Task Title"
                    placeholder="e.g., Schedule site visit"
                    value={taskForm.title}
                    onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
                  />
                  <Textarea
                    label="Description"
                    placeholder="Task details..."
                    value={taskForm.description}
                    onChange={(e) => setTaskForm({ ...taskForm, description: e.target.value })}
                    rows={2}
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      label="Due Date"
                      type="date"
                      value={taskForm.dueDate}
                      onChange={(e) => setTaskForm({ ...taskForm, dueDate: e.target.value })}
                    />
                    <Select
                      label="Priority"
                      value={taskForm.priority}
                      onChange={(e) => setTaskForm({ ...taskForm, priority: e.target.value })}
                      options={[
                        { value: 'low', label: 'Low' },
                        { value: 'medium', label: 'Medium' },
                        { value: 'high', label: 'High' }
                      ]}
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button type="submit" size="sm" icon={<Plus className="h-4 w-4" />}>
                      Add Task
                    </Button>
                  </div>
                </form>

                {/* Tasks List */}
                <div className="space-y-3">
                  {tasks.map((task) => (
                    <div key={task.id} className="p-4 border border-gray-200 rounded-lg bg-white hover:bg-gray-50 transition-colors">
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => toggleTaskStatus(task.id)}
                          className="mt-1"
                        >
                          {task.status === 'completed' ? (
                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                          ) : (
                            <Circle className="h-5 w-5 text-gray-400" />
                          )}
                        </button>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className={`font-semibold ${task.status === 'completed' ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                                {task.title}
                              </h4>
                              {task.description && (
                                <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                              )}
                            </div>
                            <Badge variant={getPriorityColor(task.priority)} size="sm">
                              {task.priority}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              Due: {formatDate(task.dueDate)}
                            </div>
                            <div className="flex items-center gap-1">
                              <User className="h-4 w-4" />
                              {task.assignedTo}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {activeTab === 'meetings' && (
              <Card title="Minutes of Meeting (MOM)">
                {/* Add Meeting Form */}
                <form onSubmit={handleAddMeeting} className="mb-6 p-4 bg-gray-50 rounded-lg space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      label="Meeting Date & Time"
                      type="datetime-local"
                      value={momForm.meetingDate}
                      onChange={(e) => setMomForm({ ...momForm, meetingDate: e.target.value })}
                    />
                    <Input
                      label="Attendees"
                      placeholder="e.g., John, Sarah, Manager"
                      value={momForm.attendees}
                      onChange={(e) => setMomForm({ ...momForm, attendees: e.target.value })}
                    />
                  </div>
                  <Textarea
                    label="Agenda"
                    placeholder="Meeting agenda..."
                    value={momForm.agenda}
                    onChange={(e) => setMomForm({ ...momForm, agenda: e.target.value })}
                    rows={2}
                  />
                  <Textarea
                    label="Discussion"
                    placeholder="Key discussion points..."
                    value={momForm.discussion}
                    onChange={(e) => setMomForm({ ...momForm, discussion: e.target.value })}
                    rows={3}
                  />
                  <Textarea
                    label="Action Items"
                    placeholder="List action items (one per line)..."
                    value={momForm.actionItems}
                    onChange={(e) => setMomForm({ ...momForm, actionItems: e.target.value })}
                    rows={3}
                  />
                  <div className="flex justify-end">
                    <Button type="submit" size="sm" icon={<Plus className="h-4 w-4" />}>
                      Add Meeting
                    </Button>
                  </div>
                </form>

                {/* Meetings List */}
                <div className="space-y-4">
                  {meetings.map((meeting) => (
                    <div key={meeting.id} className="p-4 border border-gray-200 rounded-lg bg-white">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-5 w-5 text-purple-600" />
                          <span className="font-semibold text-gray-900">{meeting.meetingDate}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <span className="text-sm font-medium text-gray-700">Attendees: </span>
                          <span className="text-sm text-gray-900">{meeting.attendees}</span>
                        </div>
                        
                        <div>
                          <h5 className="text-sm font-medium text-gray-700 mb-1">Agenda:</h5>
                          <p className="text-sm text-gray-800">{meeting.agenda}</p>
                        </div>
                        
                        <div>
                          <h5 className="text-sm font-medium text-gray-700 mb-1">Discussion:</h5>
                          <p className="text-sm text-gray-800">{meeting.discussion}</p>
                        </div>
                        
                        <div>
                          <h5 className="text-sm font-medium text-gray-700 mb-1">Action Items:</h5>
                          <div className="text-sm text-gray-800 whitespace-pre-line">{meeting.actionItems}</div>
                        </div>
                      </div>
                      
                      <div className="mt-3 pt-3 border-t border-gray-200 text-xs text-gray-500">
                        Created by {meeting.createdBy} on {meeting.createdAt}
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
                        className="bg-blue-600 h-3 rounded-full transition-all"
                        style={{ width: `${lead.score}%` }}
                      />
                    </div>
                    <span className="text-lg font-bold text-blue-600">{lead.score}</span>
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
    </div>
  );
};

export default LeadDetails;