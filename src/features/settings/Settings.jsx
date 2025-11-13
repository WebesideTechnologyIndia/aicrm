// src/features/settings/Settings.jsx

import { useState, useEffect } from 'react';
import { 
  Building2, 
  User, 
  Bell, 
  Shield, 
  Mail, 
  Smartphone,
  Globe,
  Key,
  Save,
  Camera,
  Lock,
  CheckCircle
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Textarea from '../../components/ui/Textarea';
import toast from 'react-hot-toast';
import { authAPI, settingsAPI, companyAPI } from '../../services/api';
import useAuthStore from '../../store/authStore';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const { user, updateUser } = useAuthStore();

  const [companyData, setCompanyData] = useState({
    _id: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    website: '',
    gstNumber: '',
  });

  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    timezone: 'Asia/Kolkata',
    profileImage: '',
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
    whatsappApiKey: '',
    googleMapsApiKey: '',
    paymentGatewayKey: '',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [passwordStrength, setPasswordStrength] = useState(0);

  // Load settings on component mount
  useEffect(() => {
    fetchSettings();
  }, []);

  // Calculate password strength
  useEffect(() => {
    if (passwordData.newPassword) {
      let strength = 0;
      if (passwordData.newPassword.length >= 6) strength++;
      if (passwordData.newPassword.length >= 8) strength++;
      if (/[A-Z]/.test(passwordData.newPassword)) strength++;
      if (/[0-9]/.test(passwordData.newPassword)) strength++;
      if (/[^A-Za-z0-9]/.test(passwordData.newPassword)) strength++;
      setPasswordStrength(strength);
    } else {
      setPasswordStrength(0);
    }
  }, [passwordData.newPassword]);

  const fetchSettings = async () => {
    try {
      setInitialLoading(true);
      
      // Fetch user profile first
      try {
        const { data: profileResponse } = await authAPI.getProfile();
        if (profileResponse.success && profileResponse.user) {
          const userData = profileResponse.user;
          setProfileData({
            name: userData.name || '',
            email: userData.email || '',
            phone: userData.phone || '',
            role: userData.role || '',
            timezone: userData.timezone || 'Asia/Kolkata',
            profileImage: userData.profileImage || '',
          });
        }
      } catch (profileError) {
        console.error('Error fetching profile:', profileError);
        // Fallback to user from store
        if (user) {
          setProfileData({
            name: user.name || '',
            email: user.email || '',
            phone: user.phone || '',
            role: user.role || '',
            timezone: user.timezone || 'Asia/Kolkata',
            profileImage: user.profileImage || '',
          });
        }
      }

      // Fetch company profile using Company API
      try {
        const { data: companyResponse } = await companyAPI.get();
        
        // Company API returns array, get first company
        if (companyResponse && companyResponse.length > 0) {
          const company = companyResponse[0];
          setCompanyData({
            _id: company._id || '',
            name: company.name || '',
            email: company.email || '',
            phone: company.phone || '',
            address: company.address || '',
            website: company.website || '',
            gstNumber: company.gstNumber || '',
          });
        }
      } catch (companyError) {
        if (companyError.response?.status === 404) {
          console.log('No company profile found - create one in settings');
        } else {
          console.error('Error fetching company:', companyError);
        }
      }

      // Try to fetch settings (optional - backend may not have this endpoint yet)
      // This is for notifications and API keys preferences
      // Uncomment when backend settings endpoints are ready
      /*
      try {
        const { data } = await settingsAPI.get();
        
        if (data.notifications) {
          setNotificationData(data.notifications);
        }
        
        if (data.apiKeys) {
          setApiData({
            whatsappApiKey: data.apiKeys.whatsapp || '',
            googleMapsApiKey: data.apiKeys.googleMaps || '',
            paymentGatewayKey: data.apiKeys.paymentGateway || '',
          });
        }
      } catch (apiError) {
        if (apiError.response?.status === 404) {
          console.log('Settings endpoint not implemented yet - using defaults');
        } else {
          console.error('Error fetching settings:', apiError);
        }
      }
      */

      // Load from localStorage as fallback
      const savedNotifications = localStorage.getItem('notificationPreferences');
      if (savedNotifications) {
        setNotificationData(JSON.parse(savedNotifications));
      }

      const savedApiKeys = localStorage.getItem('apiKeys');
      if (savedApiKeys) {
        const keys = JSON.parse(savedApiKeys);
        setApiData({
          whatsappApiKey: keys.whatsappApiKey || '',
          googleMapsApiKey: keys.googleMapsApiKey || '',
          paymentGatewayKey: keys.paymentGatewayKey || '',
        });
      }
    } catch (error) {
      console.error('Error initializing settings:', error);
    } finally {
      setInitialLoading(false);
    }
  };

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

  const handlePasswordFieldChange = (e) => {
    setPasswordData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async (type) => {
    setLoading(true);
    try {
      let response;
      
      switch (type) {
        case 'company':
          // Use Company API - Check if company exists
          if (companyData._id) {
            // Update existing company
            response = await companyAPI.update(companyData._id, {
              name: companyData.name,
              email: companyData.email,
              phone: companyData.phone,
              website: companyData.website,
              gstNumber: companyData.gstNumber,
              address: companyData.address,
            });
            toast.success('Company profile updated successfully!');
          } else {
            // Create new company
            response = await companyAPI.create({
              name: companyData.name,
              email: companyData.email,
              phone: companyData.phone,
              website: companyData.website,
              gstNumber: companyData.gstNumber,
              address: companyData.address,
            });
            toast.success('Company profile created successfully!');
            // Refresh to get the company ID
            fetchSettings();
          }
          break;
          
        case 'profile':
          response = await authAPI.updateProfile(profileData);
          if (response.data.success) {
            // Update user in auth store
            updateUser(response.data.user);
            toast.success('Profile updated successfully!');
          }
          break;
          
        case 'notifications':
          // Backend endpoint not ready yet - save locally for now
          localStorage.setItem('notificationPreferences', JSON.stringify(notificationData));
          toast.success('Notification preferences saved locally!');
          console.log('Notification data to save:', notificationData);
          break;
          
        case 'api':
          // Backend endpoint not ready yet - save locally for now
          localStorage.setItem('apiKeys', JSON.stringify(apiData));
          toast.success('API keys saved locally!');
          console.log('API keys to save:', apiData);
          break;
          
        default:
          toast.error('Invalid settings type');
      }
    } catch (error) {
      console.error(`Error saving ${type} settings:`, error);
      toast.error(error.response?.data?.message || `Failed to save ${type} settings`);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    // Validation
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      toast.error('Please fill in all password fields');
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    try {
      // Backend endpoint not ready yet - comment out for now
      // await settingsAPI.updatePassword({
      //   currentPassword: passwordData.currentPassword,
      //   newPassword: passwordData.newPassword,
      // });
      
      toast.info('Password change endpoint not ready yet. Contact administrator.');
      console.log('Password change requested for user:', profileData.email);
      
      // Still clear the form
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error) {
      console.error('Error changing password:', error);
      toast.error(error.response?.data?.message || 'Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 1) return 'bg-red-500';
    if (passwordStrength <= 2) return 'bg-orange-500';
    if (passwordStrength <= 3) return 'bg-yellow-500';
    if (passwordStrength <= 4) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength === 0) return '';
    if (passwordStrength <= 1) return 'Weak';
    if (passwordStrength <= 2) return 'Fair';
    if (passwordStrength <= 3) return 'Good';
    if (passwordStrength <= 4) return 'Strong';
    return 'Very Strong';
  };

  const tabs = [
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'company', label: 'Company Profile', icon: Building2 },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'api', label: 'API Integration', icon: Key },
    { id: 'security', label: 'Security', icon: Shield },
  ];

  const timezoneOptions = [
    { value: 'Asia/Kolkata', label: 'India (IST)' },
    { value: 'America/New_York', label: 'New York (EST)' },
    { value: 'Europe/London', label: 'London (GMT)' },
    { value: 'Asia/Dubai', label: 'Dubai (GST)' },
    { value: 'Asia/Singapore', label: 'Singapore (SGT)' },
    { value: 'Australia/Sydney', label: 'Sydney (AEDT)' },
    { value: 'America/Los_Angeles', label: 'Los Angeles (PST)' },
  ];

  if (initialLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your CRM configuration</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
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

      {/* My Profile */}
      {activeTab === 'profile' && (
        <Card title="Profile Information">
          <div className="space-y-6">
            {/* Profile Picture */}
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-primary-600 flex items-center justify-center text-white text-3xl font-bold">
                  {profileData.profileImage ? (
                    <img 
                      src={profileData.profileImage} 
                      alt={profileData.name}
                      className="w-24 h-24 rounded-full object-cover"
                    />
                  ) : (
                    profileData.name ? profileData.name.charAt(0).toUpperCase() : 'U'
                  )}
                </div>
                <button className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg border border-gray-200 hover:bg-gray-50">
                  <Camera className="h-4 w-4 text-gray-600" />
                </button>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{profileData.name || 'User'}</h3>
                <p className="text-sm text-gray-600">{profileData.role || 'Role not set'}</p>
                <Button variant="outline" size="sm" className="mt-2">
                  Change Photo
                </Button>
              </div>
            </div>

            {/* Profile Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                name="name"
                value={profileData.name}
                onChange={handleProfileChange}
                icon={<User className="h-5 w-5" />}
                required
              />
              <Input
                label="Email"
                type="email"
                name="email"
                value={profileData.email}
                onChange={handleProfileChange}
                icon={<Mail className="h-5 w-5" />}
                required
              />
              <Input
                label="Phone"
                name="phone"
                value={profileData.phone}
                onChange={handleProfileChange}
                icon={<Smartphone className="h-5 w-5" />}
              />
              <Select
                label="Timezone"
                name="timezone"
                value={profileData.timezone}
                onChange={handleProfileChange}
                options={timezoneOptions}
              />
            </div>

            {/* Role Badge */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Your Role</p>
              <p className="text-lg font-semibold text-gray-900 mt-1">{profileData.role}</p>
            </div>

            <div className="flex justify-end">
              <Button 
                onClick={() => handleSave('profile')} 
                loading={loading} 
                icon={<Save className="h-4 w-4" />}
              >
                Save Changes
              </Button>
            </div>
          </div>
        </Card>
      )}

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
                required
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
                placeholder="https://example.com"
              />
              <Input
                label="GST Number"
                name="gstNumber"
                value={companyData.gstNumber}
                onChange={handleCompanyChange}
                placeholder="22AAAAA0000A1Z5"
              />
            </div>
            <Textarea
              label="Address"
              name="address"
              value={companyData.address}
              onChange={handleCompanyChange}
              rows={3}
              placeholder="Enter complete address"
            />
            <div className="flex justify-end">
              <Button 
                onClick={() => handleSave('company')} 
                loading={loading} 
                icon={<Save className="h-4 w-4" />}
              >
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
              <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Mail className="h-5 w-5 text-blue-600" />
                  </div>
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
                  className="w-5 h-5 text-primary-600 rounded focus:ring-2 focus:ring-primary-500"
                />
              </label>

              <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <Smartphone className="h-5 w-5 text-green-600" />
                  </div>
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
                  className="w-5 h-5 text-primary-600 rounded focus:ring-2 focus:ring-primary-500"
                />
              </label>

              <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <Globe className="h-5 w-5 text-purple-600" />
                  </div>
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
                  className="w-5 h-5 text-primary-600 rounded focus:ring-2 focus:ring-primary-500"
                />
              </label>
            </div>
          </Card>

          <Card title="Alert Preferences">
            <div className="space-y-4">
              {[
                { 
                  key: 'newLeadAlert', 
                  label: 'New Lead Alert', 
                  desc: 'Get notified when new leads arrive',
                  icon: Bell,
                  color: 'blue'
                },
                { 
                  key: 'taskReminder', 
                  label: 'Task Reminders', 
                  desc: 'Reminders for pending tasks',
                  icon: CheckCircle,
                  color: 'green'
                },
                { 
                  key: 'paymentReminder', 
                  label: 'Payment Reminders', 
                  desc: 'Alerts for upcoming payments',
                  icon: Mail,
                  color: 'orange'
                },
              ].map((item) => (
                <label 
                  key={item.key} 
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full bg-${item.color}-100 flex items-center justify-center`}>
                      <item.icon className={`h-5 w-5 text-${item.color}-600`} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{item.label}</p>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    name={item.key}
                    checked={notificationData[item.key]}
                    onChange={handleNotificationChange}
                    className="w-5 h-5 text-primary-600 rounded focus:ring-2 focus:ring-primary-500"
                  />
                </label>
              ))}
            </div>
          </Card>

          <div className="flex justify-end">
            <Button 
              onClick={() => handleSave('notifications')} 
              loading={loading} 
              icon={<Save className="h-4 w-4" />}
            >
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
              <div>
                <Input
                  label="WhatsApp Business API Key"
                  name="whatsappApiKey"
                  type="password"
                  value={apiData.whatsappApiKey}
                  onChange={handleApiChange}
                  placeholder="Enter WhatsApp API key"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Get your API key from WhatsApp Business Platform
                </p>
              </div>

              <div>
                <Input
                  label="Google Maps API Key"
                  name="googleMapsApiKey"
                  type="password"
                  value={apiData.googleMapsApiKey}
                  onChange={handleApiChange}
                  placeholder="Enter Google Maps API key"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Required for location-based features
                </p>
              </div>

              <div>
                <Input
                  label="Payment Gateway API Key"
                  name="paymentGatewayKey"
                  type="password"
                  value={apiData.paymentGatewayKey}
                  onChange={handleApiChange}
                  placeholder="Enter Payment Gateway API key"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Configure your payment processing gateway
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <div className="flex gap-3">
                <Shield className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-yellow-900">Security Warning</p>
                  <p className="text-sm text-yellow-800 mt-1">
                    Keep your API keys secure. Never share them publicly or commit them to version control.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button 
                onClick={() => handleSave('api')} 
                loading={loading} 
                icon={<Save className="h-4 w-4" />}
              >
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
              <Input 
                label="Current Password" 
                type="password"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordFieldChange}
                icon={<Lock className="h-5 w-5" />}
                required
              />
              
              <div>
                <Input 
                  label="New Password" 
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordFieldChange}
                  icon={<Lock className="h-5 w-5" />}
                  required
                />
                {passwordData.newPassword && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-gray-600">Password Strength:</span>
                      <span className={`font-medium ${
                        passwordStrength <= 1 ? 'text-red-600' :
                        passwordStrength <= 2 ? 'text-orange-600' :
                        passwordStrength <= 3 ? 'text-yellow-600' :
                        passwordStrength <= 4 ? 'text-blue-600' :
                        'text-green-600'
                      }`}>
                        {getPasswordStrengthText()}
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                        style={{ width: `${(passwordStrength / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <Input 
                label="Confirm New Password" 
                type="password"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordFieldChange}
                icon={<Lock className="h-5 w-5" />}
                required
              />

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-900 font-medium mb-2">Password Requirements:</p>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li className="flex items-center gap-2">
                    <CheckCircle className={`h-4 w-4 ${passwordData.newPassword.length >= 6 ? 'text-green-600' : 'text-gray-400'}`} />
                    At least 6 characters
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className={`h-4 w-4 ${/[A-Z]/.test(passwordData.newPassword) ? 'text-green-600' : 'text-gray-400'}`} />
                    One uppercase letter (recommended)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className={`h-4 w-4 ${/[0-9]/.test(passwordData.newPassword) ? 'text-green-600' : 'text-gray-400'}`} />
                    One number (recommended)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className={`h-4 w-4 ${/[^A-Za-z0-9]/.test(passwordData.newPassword) ? 'text-green-600' : 'text-gray-400'}`} />
                    One special character (recommended)
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <Button 
                onClick={handlePasswordChange} 
                loading={loading}
                disabled={!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword}
                icon={<Lock className="h-4 w-4" />}
              >
                Update Password
              </Button>
            </div>
          </Card>

          <Card title="Two-Factor Authentication">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-semibold text-gray-900">Enable 2FA</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Add an extra layer of security to your account with two-factor authentication
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Status: <span className="text-red-600 font-medium">Not Configured</span>
                </p>
              </div>
              <Button variant="outline">
                <Shield className="h-4 w-4 mr-2" />
                Configure
              </Button>
            </div>
          </Card>

          <Card title="Active Sessions">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <Smartphone className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Current Device</p>
                    <p className="text-sm text-gray-600">
                      Current session • {new Date().toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
                <span className="flex items-center gap-2 text-sm text-green-600 font-medium">
                  <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
                  Active
                </span>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Settings;