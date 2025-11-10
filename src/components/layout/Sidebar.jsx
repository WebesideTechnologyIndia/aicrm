import { NavLink } from 'react-router-dom';
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
  Building2
} from 'lucide-react';
import { cn } from '../../utils/cn';
import useAuthStore from '../../store/authStore';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { user } = useAuthStore();

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
      roles: ['admin', 'manager', 'director'],
    },
    {
      title: 'Settings',
      path: '/settings',
      icon: Settings,
    },
  ];

  // Filter menu items based on user role
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
            {filteredMenuItems.map((item) => (
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