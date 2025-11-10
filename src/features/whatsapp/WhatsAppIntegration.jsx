import { useState } from 'react';
import { 
  MessageSquare, 
  Send, 
  Users, 
  Check,
  Clock,
  AlertCircle,
  Image as ImageIcon,
  FileText,
  Link as LinkIcon,
  Settings,
  Zap
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Textarea from '../../components/ui/Textarea';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import Select from '../../components/ui/Select';
import toast from 'react-hot-toast';
import { formatRelativeTime } from '../../utils/format';

const WhatsAppIntegration = () => {
  const [showSendModal, setShowSendModal] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [activeTab, setActiveTab] = useState('send');

  const [messageData, setMessageData] = useState({
    recipients: 'all',
    message: '',
    template: '',
    mediaType: 'none',
    scheduledTime: '',
  });

  // Mock data
  const stats = {
    connected: true,
    phoneNumber: '+91 98765 43210',
    messagesToday: 245,
    delivered: 238,
    read: 195,
    failed: 7,
  };

  const templates = [
    {
      id: 1,
      name: 'Property Follow-up',
      content: 'Hi {name}, Thank you for your interest in {project}. Would you like to schedule a site visit?',
      category: 'Marketing',
      status: 'approved',
      usage: 145,
    },
    {
      id: 2,
      name: 'Payment Reminder',
      content: 'Dear {name}, This is a reminder for your upcoming payment of ₹{amount} due on {date}.',
      category: 'Transactional',
      status: 'approved',
      usage: 89,
    },
    {
      id: 3,
      name: 'Site Visit Confirmation',
      content: 'Hi {name}, Your site visit is confirmed for {date} at {time}. Location: {address}',
      category: 'Utility',
      status: 'approved',
      usage: 67,
    },
  ];

  const recentMessages = [
    {
      id: 1,
      recipient: 'Rajesh Kumar',
      phone: '+91 9876543210',
      message: 'Property brochure sent for Luxury Villas',
      status: 'delivered',
      timestamp: '2025-11-08T14:30:00',
    },
    {
      id: 2,
      recipient: 'Priya Sharma',
      phone: '+91 9876543211',
      message: 'Follow-up message for site visit',
      status: 'read',
      timestamp: '2025-11-08T13:15:00',
    },
    {
      id: 3,
      recipient: 'Amit Patel',
      phone: '+91 9876543212',
      message: 'Payment reminder sent',
      status: 'delivered',
      timestamp: '2025-11-08T12:00:00',
    },
    {
      id: 4,
      recipient: 'Neha Gupta',
      phone: '+91 9876543213',
      message: 'Booking confirmation details',
      status: 'failed',
      timestamp: '2025-11-08T11:45:00',
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMessageData(prev => ({ ...prev, [name]: value }));
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    toast.success('Messages queued for sending!');
    setShowSendModal(false);
    setMessageData({
      recipients: 'all',
      message: '',
      template: '',
      mediaType: 'none',
      scheduledTime: '',
    });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <Check className="h-4 w-4 text-green-600" />;
      case 'read':
        return (
          <div className="flex">
            <Check className="h-4 w-4 text-blue-600 -mr-2" />
            <Check className="h-4 w-4 text-blue-600" />
          </div>
        );
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const recipientOptions = [
    { value: 'all', label: 'All Leads' },
    { value: 'hot', label: 'Hot Leads' },
    { value: 'warm', label: 'Warm Leads' },
    { value: 'clients', label: 'Active Clients' },
    { value: 'custom', label: 'Custom Selection' },
  ];

  const mediaTypeOptions = [
    { value: 'none', label: 'Text Only' },
    { value: 'image', label: 'Image' },
    { value: 'pdf', label: 'PDF Document' },
    { value: 'link', label: 'Link/URL' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">WhatsApp Business Integration</h1>
          <p className="text-gray-600 mt-1">Send bulk messages and manage templates</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" icon={<Settings className="h-4 w-4" />}>
            Settings
          </Button>
          <Button onClick={() => setShowSendModal(true)} icon={<Send className="h-4 w-4" />}>
            Send Message
          </Button>
        </div>
      </div>

      {/* Connection Status */}
      <Card>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
              stats.connected ? 'bg-green-100' : 'bg-red-100'
            }`}>
              <MessageSquare className={`h-8 w-8 ${
                stats.connected ? 'text-green-600' : 'text-red-600'
              }`} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold text-gray-900">WhatsApp Business</h3>
                <Badge variant={stats.connected ? 'success' : 'danger'}>
                  {stats.connected ? 'Connected' : 'Disconnected'}
                </Badge>
              </div>
              <p className="text-sm text-gray-600 mt-1">{stats.phoneNumber}</p>
            </div>
          </div>
          {stats.connected && (
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium text-green-600">Active</span>
            </div>
          )}
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Today's Messages</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{stats.messagesToday}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Delivered</p>
          <p className="text-2xl font-bold text-green-600 mt-1">{stats.delivered}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Read</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">{stats.read}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Failed</p>
          <p className="text-2xl font-bold text-red-600 mt-1">{stats.failed}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('send')}
          className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
            activeTab === 'send'
              ? 'border-primary-600 text-primary-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          Recent Messages
        </button>
        <button
          onClick={() => setActiveTab('templates')}
          className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
            activeTab === 'templates'
              ? 'border-primary-600 text-primary-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          Templates
        </button>
      </div>

      {/* Content */}
      {activeTab === 'send' && (
        <div className="space-y-4">
          {recentMessages.map((msg) => (
            <Card key={msg.id} className="hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <MessageSquare className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-gray-900">{msg.recipient}</h4>
                      <Badge variant="default" size="sm">{msg.phone}</Badge>
                    </div>
                    <p className="text-sm text-gray-600">{msg.message}</p>
                    <p className="text-xs text-gray-500 mt-2">{formatRelativeTime(msg.timestamp)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(msg.status)}
                  <span className="text-sm text-gray-600 capitalize">{msg.status}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'templates' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {templates.map((template) => (
            <Card key={template.id} className="hover:shadow-md transition-shadow">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900">{template.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="info" size="sm">{template.category}</Badge>
                      <Badge variant="success" size="sm">{template.status}</Badge>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">Use</Button>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-700">{template.content}</p>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Used {template.usage} times</span>
                  <button className="text-primary-600 hover:text-primary-700 font-medium">
                    Edit
                  </button>
                </div>
              </div>
            </Card>
          ))}
          <Card className="border-2 border-dashed border-gray-300 hover:border-primary-500 transition-colors cursor-pointer">
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mb-3">
                <FileText className="h-6 w-6 text-primary-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">Create New Template</h4>
              <p className="text-sm text-gray-600">Add a new message template</p>
            </div>
          </Card>
        </div>
      )}

      {/* Send Message Modal */}
      <Modal
        isOpen={showSendModal}
        onClose={() => setShowSendModal(false)}
        title="Send WhatsApp Message"
        size="lg"
      >
        <form onSubmit={handleSendMessage} className="space-y-4">
          <Select
            label="Recipients"
            name="recipients"
            value={messageData.recipients}
            onChange={handleChange}
            options={recipientOptions}
            required
          />

          <Select
            label="Use Template (Optional)"
            name="template"
            value={messageData.template}
            onChange={handleChange}
            options={[
              { value: '', label: 'None - Custom Message' },
              ...templates.map(t => ({ value: t.id, label: t.name }))
            ]}
          />

          <Textarea
            label="Message"
            name="message"
            value={messageData.message}
            onChange={handleChange}
            rows={5}
            placeholder="Type your message here..."
            required
          />

          <Select
            label="Attach Media"
            name="mediaType"
            value={messageData.mediaType}
            onChange={handleChange}
            options={mediaTypeOptions}
          />

          {messageData.mediaType !== 'none' && (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
              <input type="file" className="text-sm" />
            </div>
          )}

          <Input
            label="Schedule (Optional)"
            type="datetime-local"
            name="scheduledTime"
            value={messageData.scheduledTime}
            onChange={handleChange}
          />

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800">
              <strong>Preview:</strong> Message will be sent to approximately{' '}
              <strong>45 recipients</strong>
            </p>
          </div>

          <div className="flex items-center gap-3 justify-end pt-4">
            <Button type="button" variant="outline" onClick={() => setShowSendModal(false)}>
              Cancel
            </Button>
            <Button type="submit" icon={<Send className="h-4 w-4" />}>
              Send Messages
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default WhatsAppIntegration;