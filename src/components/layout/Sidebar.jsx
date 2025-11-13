import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  UserCircle, 
  Home, 
  Receipt, 
  CheckSquare, 
  Settings,
  Phone,
  FileText,
  Handshake,
  MessageSquare,
  Building2,
  ChevronDown,
  ChevronRight,
  Sparkles,
  Mic,
  MessageCircle,
  Volume2
} from 'lucide-react';
import { cn } from '../../utils/cn';
import useAuthStore from '../../store/authStore';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { user } = useAuthStore();
  const [isAIOpen, setIsAIOpen] = useState(false);

  const aiFeatures = [
    {
      category: 'Text To Speech',
      path: '/ai/text-to-speech',
      icon: Volume2
    },
    {
      category: 'Speech To Text',
      path: '/ai/speech-to-text',
      icon: Mic
    },
    {
      category: 'Text To Dialogue',
      path: '/ai/text-to-dialogue',
      icon: MessageCircle
    },
    {
      category: 'Sound Effect',
      path: '/ai/sound-effect',
      icon: Sparkles
    },
    {
      category: 'Voices',
      path: '/ai/voices',
      icon: Volume2
    }
  ];

  const menuItems = [
    {
      title: 'Dashboard',
      path: '/dashboard',
      icon: LayoutDashboard,
    },
    {
      title: 'Leads',
      path: '/leads',
      icon: Phone,
    },
    {
      title: 'Clients',
      path: '/clients',
      icon: UserCircle,
    },
    {
      title: 'Channel Partners',
      path: '/partners',
      icon: Handshake,
    },
    {
      title: 'Properties',
      path: '/properties',
      icon: Home,
    },
    {
      title: 'Projects',
      path: '/projects',
      icon: Building2,
    },
    {
      title: 'Bookings',
      path: '/bookings',
      icon: Receipt,
    },
    {
      title: 'MOM',
      path: '/mom',
      icon: FileText,
    },
    {
      title: 'Tasks',
      path: '/tasks',
      icon: CheckSquare,
    },
    {
      title: 'WhatsApp',
      path: '/whatsapp',
      icon: MessageSquare,
    },
    {
      title: 'Users',
      path: '/users',
      icon: Users,
      roles: ['admin', 'manager', 'director', 'user'],
    },
    {
      title: 'Settings',
      path: '/settings',
      icon: Settings,
    },
  ];

  const filteredMenuItems = menuItems.filter(item => {
    if (!item.roles) return true;
    return item.roles.includes(user?.role);
  });

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-200">
            <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center">
              <span className="text-lg font-bold text-white">AI</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">AI CRM</h1>
              <p className="text-xs text-gray-500">Real Estate</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {/* Dashboard */}
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-gray-700 hover:bg-gray-100'
                )
              }
            >
              <LayoutDashboard className="h-5 w-5" />
              <span>Dashboard</span>
            </NavLink>

            {/* AI Features Dropdown */}
            <div>
              <button
                onClick={() => setIsAIOpen(!isAIOpen)}
                className="flex items-center justify-between w-full px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Sparkles className="h-5 w-5" />
                  <span>AI Features</span>
                </div>
                {isAIOpen ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>

              {/* AI Submenu */}
              {isAIOpen && (
                <div className="ml-4 mt-1 space-y-1 border-l-2 border-gray-200 pl-4">
                  {aiFeatures.map((feature, idx) => {
                    const FeatureIcon = feature.icon;
                    return (
                      <NavLink
                        key={idx}
                        to={feature.path}
                        className={({ isActive }) =>
                          cn(
                            'flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors',
                            isActive
                              ? 'bg-primary-100 text-primary-700 font-medium'
                              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                          )
                        }
                      >
                        <FeatureIcon className="h-4 w-4" />
                        {feature.category}
                      </NavLink>
                    );
                  })}
                </div>
              )}
            </div>

            {/* All Other Menu Items (except Dashboard which is already shown) */}
            {filteredMenuItems.slice(1).map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-gray-700 hover:bg-gray-100'
                  )
                }
              >
                <item.icon className="h-5 w-5" />
                <span>{item.title}</span>
              </NavLink>
            ))}
          </nav>

          {/* User Info */}
          <div className="px-4 py-4 border-t border-gray-200">
            <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-50">
              <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center text-white font-semibold">
                {user?.name?.charAt(0) || 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.name || 'User'}
                </p>
                <p className="text-xs text-gray-500 capitalize">
                  {user?.role || 'Role'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;