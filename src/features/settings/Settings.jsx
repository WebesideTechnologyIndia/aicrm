import { useState } from 'react';
import { 
  Building2, 
  User, 
  Bell, 
  Shield, 
  Mail, 
  Smartphone,
  Globe,
  CreditCard,
  Key,
  Save
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Textarea from '../../components/ui/Textarea';
import toast from 'react-hot-toast';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('company');
  const [loading, setLoading] = useState(false);

  const [companyData, setCompanyData] = useState({
    name: 'AI CRM Real Estate',
    email: 'info@aicrm.com',
    phone: '+91 98765 43210',
    address: 'Sector 54, Gurgaon, Haryana',
    website: 'www.aicrm.com',
    gst: 'GST1234567890',
  });

  const [profileData, setProfileData] = useState({
    name: 'Admin User',
    email: 'admin@aicrm.com',
    phone: '+91 98765 43210',
    role: 'admin',
    timezone: 'Asia/Kolkata',
  });

  const [notificationData, setNotificationData] = useState({
    emailNotifications: true,
    smsNotifications: true,
    whatsappNotifications: true,
    newLeadAlert: true,
    taskReminder: true,
    paymentReminder: true,
  });

  const [apiData, setApiData] = useState({
    whatsappApiKey: '••••••••••••••••',
    googleMapsApiKey: '••••••••••••••••',
    paymentGatewayKey: '••••••••••••••••',
  });

  const handleCompanyChange = (e) => {
    setCompanyData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleProfileChange = (e) => {
    setProfileData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleNotificationChange = (e) => {
    setNotificationData(prev => ({ 
      ...prev, 
      [e.target.name]: e.target.checked 
    }));
  };

  const handleApiChange = (e) => {
    setApiData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async (type) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Settings saved successfully!');
    } catch (error) {
      toast.error('Failed to save settings');
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'company', label: 'Company Profile', icon: Building2 },
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'api', label: 'API Integration', icon: Key },
    { id: 'security', label: 'Security', icon: Shield },
  ];

  const timezoneOptions = [
    { value: 'Asia/Kolkata', label: 'India (IST)' },
    { value: 'America/New_York', label: 'New York (EST)' },
    { value: 'Europe/London', label: 'London (GMT)' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your CRM configuration</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Company Profile */}
      {activeTab === 'company' && (
        <Card title="Company Information">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Company Name"
                name="name"
                value={companyData.name}
                onChange={handleCompanyChange}
                icon={<Building2 className="h-5 w-5" />}
              />
              <Input
                label="Email"
                type="email"
                name="email"
                value={companyData.email}
                onChange={handleCompanyChange}
                icon={<Mail className="h-5 w-5" />}
              />
              <Input
                label="Phone"
                name="phone"
                value={companyData.phone}
                onChange={handleCompanyChange}
                icon={<Smartphone className="h-5 w-5" />}
              />
              <Input
                label="Website"
                name="website"
                value={companyData.website}
                onChange={handleCompanyChange}
                icon={<Globe className="h-5 w-5" />}
              />
              <Input
                label="GST Number"
                name="gst"
                value={companyData.gst}
                onChange={handleCompanyChange}
              />
            </div>
            <Textarea
              label="Address"
              name="address"
              value={companyData.address}
              onChange={handleCompanyChange}
              rows={3}
            />
            <div className="flex justify-end">
              <Button onClick={() => handleSave('company')} loading={loading} icon={<Save className="h-4 w-4" />}>
                Save Changes
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* My Profile */}
      {activeTab === 'profile' && (
        <Card title="Profile Information">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-primary-600 flex items-center justify-center text-white text-2xl font-bold">
                A
              </div>
              <Button variant="outline" size="sm">Change Photo</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                name="name"
                value={profileData.name}
                onChange={handleProfileChange}
              />
              <Input
                label="Email"
                type="email"
                name="email"
                value={profileData.email}
                onChange={handleProfileChange}
              />
              <Input
                label="Phone"
                name="phone"
                value={profileData.phone}
                onChange={handleProfileChange}
              />
              <Select
                label="Timezone"
                name="timezone"
                value={profileData.timezone}
                onChange={handleProfileChange}
                options={timezoneOptions}
              />
            </div>
            <div className="flex justify-end">
              <Button onClick={() => handleSave('profile')} loading={loading} icon={<Save className="h-4 w-4" />}>
                Save Changes
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Notifications */}
      {activeTab === 'notifications' && (
        <div className="space-y-6">
          <Card title="Notification Channels">
            <div className="space-y-4">
              <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-gray-600" />
                  <div>
                    <p className="font-medium text-gray-900">Email Notifications</p>
                    <p className="text-sm text-gray-600">Receive updates via email</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  name="emailNotifications"
                  checked={notificationData.emailNotifications}
                  onChange={handleNotificationChange}
                  className="w-5 h-5 text-primary-600 rounded"
                />
              </label>
              <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center gap-3">
                  <Smartphone className="h-5 w-5 text-gray-600" />
                  <div>
                    <p className="font-medium text-gray-900">SMS Notifications</p>
                    <p className="text-sm text-gray-600">Receive updates via SMS</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  name="smsNotifications"
                  checked={notificationData.smsNotifications}
                  onChange={handleNotificationChange}
                  className="w-5 h-5 text-primary-600 rounded"
                />
              </label>
              <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-gray-600" />
                  <div>
                    <p className="font-medium text-gray-900">WhatsApp Notifications</p>
                    <p className="text-sm text-gray-600">Receive updates via WhatsApp</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  name="whatsappNotifications"
                  checked={notificationData.whatsappNotifications}
                  onChange={handleNotificationChange}
                  className="w-5 h-5 text-primary-600 rounded"
                />
              </label>
            </div>
          </Card>

          <Card title="Alert Preferences">
            <div className="space-y-4">
              {[
                { key: 'newLeadAlert', label: 'New Lead Alert', desc: 'Get notified when new leads arrive' },
                { key: 'taskReminder', label: 'Task Reminders', desc: 'Reminders for pending tasks' },
                { key: 'paymentReminder', label: 'Payment Reminders', desc: 'Alerts for upcoming payments' },
              ].map((item) => (
                <label key={item.key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div>
                    <p className="font-medium text-gray-900">{item.label}</p>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                  <input
                    type="checkbox"
                    name={item.key}
                    checked={notificationData[item.key]}
                    onChange={handleNotificationChange}
                    className="w-5 h-5 text-primary-600 rounded"
                  />
                </label>
              ))}
            </div>
          </Card>

          <div className="flex justify-end">
            <Button onClick={() => handleSave('notifications')} loading={loading} icon={<Save className="h-4 w-4" />}>
              Save Preferences
            </Button>
          </div>
        </div>
      )}

      {/* API Integration */}
      {activeTab === 'api' && (
        <Card title="API Keys & Integration">
          <div className="space-y-6">
            <div className="space-y-4">
              <Input
                label="WhatsApp Business API Key"
                name="whatsappApiKey"
                type="password"
                value={apiData.whatsappApiKey}
                onChange={handleApiChange}
              />
              <Input
                label="Google Maps API Key"
                name="googleMapsApiKey"
                type="password"
                value={apiData.googleMapsApiKey}
                onChange={handleApiChange}
              />
              <Input
                label="Payment Gateway API Key"
                name="paymentGatewayKey"
                type="password"
                value={apiData.paymentGatewayKey}
                onChange={handleApiChange}
              />
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <p className="text-sm text-yellow-800">
                <strong>⚠️ Warning:</strong> Keep your API keys secure. Never share them publicly.
              </p>
            </div>
            <div className="flex justify-end">
              <Button onClick={() => handleSave('api')} loading={loading} icon={<Save className="h-4 w-4" />}>
                Save API Keys
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Security */}
      {activeTab === 'security' && (
        <div className="space-y-6">
          <Card title="Change Password">
            <div className="space-y-4">
              <Input label="Current Password" type="password" />
              <Input label="New Password" type="password" />
              <Input label="Confirm New Password" type="password" />
            </div>
            <div className="flex justify-end mt-6">
              <Button>Update Password</Button>
            </div>
          </Card>

          <Card title="Two-Factor Authentication">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-semibold text-gray-900">Enable 2FA</h4>
                <p className="text-sm text-gray-600 mt-1">Add an extra layer of security to your account</p>
              </div>
              <Button variant="outline">Configure</Button>
            </div>
          </Card>

          <Card title="Active Sessions">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Windows - Chrome</p>
                  <p className="text-sm text-gray-600">Current session • Faridabad, India</p>
                </div>
                <span className="text-sm text-green-600 font-medium">Active</span>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Settings;