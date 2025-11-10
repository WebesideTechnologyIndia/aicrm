import { useState } from 'react';
import { 
  Users, 
  Home, 
  Receipt, 
  TrendingUp,
  Phone,
  MessageSquare,
  Activity,
  Calendar,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const Dashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  // Stats Data
  const stats = [
    {
      title: 'Total Leads',
      value: '2,543',
      change: '+12.5%',
      isPositive: true,
      icon: Phone,
      color: 'bg-blue-500',
    },
    {
      title: 'Active Clients',
      value: '1,234',
      change: '+8.2%',
      isPositive: true,
      icon: Users,
      color: 'bg-green-500',
    },
    {
      title: 'Properties',
      value: '456',
      change: '+5.1%',
      isPositive: true,
      icon: Home,
      color: 'bg-purple-500',
    },
    {
      title: 'Revenue',
      value: '₹45.2L',
      change: '-2.4%',
      isPositive: false,
      icon: TrendingUp,
      color: 'bg-orange-500',
    },
  ];

  // Chart Data
  const leadsTrendData = [
    { name: 'Mon', leads: 45, converted: 12 },
    { name: 'Tue', leads: 52, converted: 15 },
    { name: 'Wed', leads: 48, converted: 18 },
    { name: 'Thu', leads: 61, converted: 20 },
    { name: 'Fri', leads: 55, converted: 16 },
    { name: 'Sat', leads: 42, converted: 10 },
    { name: 'Sun', leads: 38, converted: 8 },
  ];

  const revenueData = [
    { month: 'Jan', revenue: 35 },
    { month: 'Feb', revenue: 42 },
    { month: 'Mar', revenue: 38 },
    { month: 'Apr', revenue: 45 },
    { month: 'May', revenue: 52 },
    { month: 'Jun', revenue: 48 },
  ];

  // AI History
  const aiHistory = [
    {
      id: 1,
      type: 'call',
      contact: 'Rajesh Kumar',
      message: 'Interested in 3BHK property in Dwarka',
      time: '10 mins ago',
      status: 'success',
    },
    {
      id: 2,
      type: 'whatsapp',
      contact: 'Priya Sharma',
      message: 'Follow-up sent for site visit',
      time: '25 mins ago',
      status: 'delivered',
    },
    {
      id: 3,
      type: 'call',
      contact: 'Amit Patel',
      message: 'Call scheduled for tomorrow 3 PM',
      time: '1 hour ago',
      status: 'scheduled',
    },
    {
      id: 4,
      type: 'whatsapp',
      contact: 'Neha Gupta',
      message: 'Property brochure sent',
      time: '2 hours ago',
      status: 'delivered',
    },
  ];

  // Recent Activities
  const recentActivities = [
    {
      id: 1,
      user: 'Sales Team',
      action: 'Added new lead',
      target: 'Vikram Singh',
      time: '5 mins ago',
    },
    {
      id: 2,
      user: 'Manager',
      action: 'Approved booking',
      target: 'Property #1234',
      time: '15 mins ago',
    },
    {
      id: 3,
      user: 'Sales Rep',
      action: 'Scheduled site visit',
      target: 'Ravi Kumar',
      time: '30 mins ago',
    },
    {
      id: 4,
      user: 'Admin',
      action: 'Updated property',
      target: 'Luxury Villa - Gurgaon',
      time: '1 hour ago',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back, Admin! Here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            This Week
          </Button>
          <Button size="sm">
            Generate Report
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm text-gray-600 font-medium">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                <div className="flex items-center gap-1 mt-2">
                  {stat.isPositive ? (
                    <ArrowUp className="h-4 w-4 text-green-600" />
                  ) : (
                    <ArrowDown className="h-4 w-4 text-red-600" />
                  )}
                  <span className={`text-sm font-medium ${stat.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500">vs last week</span>
                </div>
              </div>
              <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Leads Trend */}
        <Card title="Leads Trend">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={leadsTrendData}>
              <defs>
                <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
              />
              <Area type="monotone" dataKey="leads" stroke="#3b82f6" fillOpacity={1} fill="url(#colorLeads)" strokeWidth={2} />
              <Area type="monotone" dataKey="converted" stroke="#10b981" fill="none" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Revenue Chart */}
        <Card title="Revenue Overview">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
              />
              <Bar dataKey="revenue" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* AI Widgets Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Calling Widget */}
        <Card 
          title="AI Calling" 
          actions={
            <Badge variant="success" size="sm">
              <Activity className="h-3 w-3 mr-1" />
              Active
            </Badge>
          }
        >
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Start AI Call</h4>
                  <p className="text-sm text-gray-600">Make automated calls to leads</p>
                </div>
              </div>
              <Button variant="primary" className="w-full">
                <Phone className="h-4 w-4 mr-2" />
                Start Calling Campaign
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-2xl font-bold text-gray-900">243</p>
                <p className="text-xs text-gray-600 mt-1">Calls Today</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-2xl font-bold text-green-600">82%</p>
                <p className="text-xs text-gray-600 mt-1">Success Rate</p>
              </div>
            </div>
          </div>
        </Card>

        {/* WhatsApp Automation */}
        <Card 
          title="WhatsApp Automation"
          actions={
            <Badge variant="success" size="sm">
              <Activity className="h-3 w-3 mr-1" />
              Active
            </Badge>
          }
        >
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Send Bulk Messages</h4>
                  <p className="text-sm text-gray-600">Automated follow-ups</p>
                </div>
              </div>
              <Button variant="success" className="w-full">
                <MessageSquare className="h-4 w-4 mr-2" />
                Start WhatsApp Campaign
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-2xl font-bold text-gray-900">1,456</p>
                <p className="text-xs text-gray-600 mt-1">Messages Sent</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-2xl font-bold text-green-600">94%</p>
                <p className="text-xs text-gray-600 mt-1">Delivered</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI History */}
        <Card title="AI History">
          <div className="space-y-3">
            {aiHistory.map((item) => (
              <div key={item.id} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  item.type === 'call' ? 'bg-blue-100' : 'bg-green-100'
                }`}>
                  {item.type === 'call' ? (
                    <Phone className="h-5 w-5 text-blue-600" />
                  ) : (
                    <MessageSquare className="h-5 w-5 text-green-600" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-medium text-gray-900">{item.contact}</p>
                    <Badge 
                      variant={item.status === 'success' ? 'success' : item.status === 'delivered' ? 'info' : 'warning'}
                      size="sm"
                    >
                      {item.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{item.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Activities */}
        <Card title="Recent Activities">
          <div className="space-y-3">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <Activity className="h-5 w-5 text-gray-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">
                    <span className="font-medium">{activity.user}</span>
                    {' '}{activity.action}{' '}
                    <span className="font-medium">{activity.target}</span>
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;