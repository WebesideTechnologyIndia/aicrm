import { create } from 'zustand';
import toast from 'react-hot-toast';

const MOCK_USERS = [
  {
    id: '1',
    email: 'admin@aicrm.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin',
    permissions: ['all']
  },
  {
    id: '2',
    email: 'sales@aicrm.com',
    password: 'sales123',
    name: 'Sales User',
    role: 'sales',
    permissions: ['leads.view', 'leads.create', 'leads.edit', 'contacts.view']
  },
  {
    id: '3',
    email: 'manager@aicrm.com',
    password: 'manager123',
    name: 'Manager User',
    role: 'manager',
    permissions: ['leads.view', 'leads.edit', 'contacts.view', 'contacts.edit', 'reports.view']
  }
];

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  isLoading: false,

  login: async (credentials) => {
    set({ isLoading: true });
    
    try {
      await new Promise(resolve => setTimeout(resolve, 800));

      const user = MOCK_USERS.find(
        u => u.email === credentials.email && u.password === credentials.password
      );

      if (!user) {
        set({ isLoading: false });
        return { 
          success: false, 
          error: 'Invalid email or password' 
        };
      }

      const token = `mock-token-${user.id}-${Date.now()}`;

      const { password, ...userWithoutPassword } = user;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      
      set({
        user: userWithoutPassword,
        token: token,
        isAuthenticated: true,
        isLoading: false,
      });
      
      toast.success(`Welcome back, ${userWithoutPassword.name}!`);
      return { success: true };
      
    } catch (error) {
      set({ isLoading: false });
      return { 
        success: false, 
        error: error.message || 'Login failed' 
      };
    }
  },

  logout: async () => {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      set({
        user: null,
        token: null,
        isAuthenticated: false,
      });
      
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
    }
  },

  updateUser: (userData) => {
    const currentState = useAuthStore.getState();
    const updatedUser = { ...currentState.user, ...userData };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    set({ user: updatedUser });
  },

  hasRole: (role) => {
    const { user } = useAuthStore.getState();
    return user?.role === role;
  },

  hasPermission: (permission) => {
    const { user } = useAuthStore.getState();
    if (!user) return false;
    if (user.permissions?.includes('all')) return true;
    return user.permissions?.includes(permission) || false;
  },
}));

export default useAuthStore;