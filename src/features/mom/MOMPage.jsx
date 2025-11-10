import { useState } from 'react';
import { Plus, Calendar, User, FileText, Search } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Textarea from '../../components/ui/Textarea';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import { formatDate } from '../../utils/format';
import toast from 'react-hot-toast';

const MOMPage = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedType, setSelectedType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const [formData, setFormData] = useState({
    type: 'client',
    name: '',
    email: '',
    phone: '',
    source: '',
    dob: '',
    meetingDate: '',
    meetingNotes: '',
    followUpDate: '',
    actionItems: '',
  });

  // Mock data
  const meetings = [
    {
      id: 1,
      type: 'client',
      name: 'Rajesh Kumar',
      email: 'rajesh@email.com',
      phone: '9876543210',
      source: 'LinkedIn',
      meetingDate: '2025-11-08',
      notes: 'Discussed 3BHK requirements in Dwarka',
      followUp: '2025-11-10',
      status: 'pending',
    },
    {
      id: 2,
      type: 'partner',
      name: 'Amit Sharma',
      email: 'amit@email.com',
      phone: '9876543211',
      source: 'Referral',
      meetingDate: '2025-11-07',
      notes: 'Partnership discussion for South Delhi projects',
      followUp: '2025-11-09',
      status: 'completed',
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Meeting record added successfully!');
    setShowAddModal(false);
    setFormData({
      type: 'client',
      name: '',
      email: '',
      phone: '',
      source: '',
      dob: '',
      meetingDate: '',
      meetingNotes: '',
      followUpDate: '',
      actionItems: '',
    });
  };

  const typeOptions = [
    { value: 'client', label: 'Client' },
    { value: 'partner', label: 'Channel Partner' },
  ];

  const sourceOptions = [
    { value: 'LinkedIn', label: 'LinkedIn' },
    { value: 'Facebook', label: 'Facebook' },
    { value: 'Referral', label: 'Referral' },
    { value: 'Walk-in', label: 'Walk-in' },
    { value: 'Others', label: 'Others' },
  ];

  const filteredMeetings = meetings.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || m.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Minutes of Meeting (MOM)</h1>
          <p className="text-gray-600 mt-1">Track all client and partner meetings</p>
        </div>
        <Button onClick={() => setShowAddModal(true)} icon={<Plus className="h-4 w-4" />}>
          Add MOM
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            placeholder="Search by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<Search className="h-5 w-5" />}
          />
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedType('all')}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedType === 'all' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setSelectedType('client')}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedType === 'client' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              Clients
            </button>
            <button
              onClick={() => setSelectedType('partner')}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedType === 'partner' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              Partners
            </button>
          </div>
        </div>
      </Card>

      {/* Meetings List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredMeetings.map((meeting) => (
          <Card key={meeting.id}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                    <span className="text-lg font-semibold text-primary-600">
                      {meeting.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{meeting.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant={meeting.type === 'client' ? 'info' : 'success'}>
                        {meeting.type === 'client' ? 'Client' : 'Partner'}
                      </Badge>
                      <Badge variant={meeting.status === 'completed' ? 'success' : 'warning'}>
                        {meeting.status === 'completed' ? 'Completed' : 'Pending'}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <User className="h-4 w-4 text-gray-400" />
                      <span>{meeting.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <User className="h-4 w-4 text-gray-400" />
                      <span>{meeting.phone}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span>Meeting: {formatDate(meeting.meetingDate)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Calendar className="h-4 w-4 text-orange-400" />
                      <span className="text-orange-600 font-medium">Follow-up: {formatDate(meeting.followUp)}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-gray-700 mb-2">Meeting Notes:</p>
                  <p className="text-sm text-gray-600">{meeting.notes}</p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Add MOM Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add Minutes of Meeting"
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Select
            label="Type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            options={typeOptions}
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Name" name="name" value={formData.name} onChange={handleChange} required />
            <Input label="Email" type="email" name="email" value={formData.email} onChange={handleChange} required />
            <Input label="Phone" name="phone" value={formData.phone} onChange={handleChange} required />
            <Select label="Source" name="source" value={formData.source} onChange={handleChange} options={sourceOptions} required />
            <Input label="Date of Birth" type="date" name="dob" value={formData.dob} onChange={handleChange} />
            <Input label="Meeting Date" type="date" name="meetingDate" value={formData.meetingDate} onChange={handleChange} required />
          </div>

          <Textarea
            label="Meeting Notes"
            name="meetingNotes"
            value={formData.meetingNotes}
            onChange={handleChange}
            rows={4}
            required
          />

          <Input label="Follow-up Date" type="date" name="followUpDate" value={formData.followUpDate} onChange={handleChange} />

          <Textarea
            label="Action Items"
            name="actionItems"
            value={formData.actionItems}
            onChange={handleChange}
            rows={3}
          />

          <div className="flex items-center gap-3 justify-end pt-4">
            <Button type="button" variant="outline" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button type="submit">Save MOM</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default MOMPage;