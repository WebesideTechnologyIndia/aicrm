import { createBrowserRouter, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

// Layouts
import MainLayout from '../components/layout/MainLayout';
import AuthLayout from '../components/layout/AuthLayout';

// Auth
import LoginPage from '../features/auth/LoginPage';

// Dashboard
import Dashboard from '../features/dashboard/Dashboard';

// Users
import AllUsers from '../features/users/AllUsers';
import AddEditUser from '../features/users/AddEditUser';

// Leads
import AllLeads from '../features/leads/AllLeads';
import AddEditLead from '../features/leads/AddEditLead';
import LeadDetails from '../features/leads/LeadDetails';

// Clients
import AllClients from '../features/clients/AllClients';
import AddEditClient from '../features/clients/AddEditClient';

// Channel Partners
import AllPartners from '../features/partners/AllPartners';
import AddEditPartner from '../features/partners/AddEditPartner';

// Properties
import AllProperties from '../features/properties/AllProperties';

// Projects
import AllProjects from '../features/projects/AllProjects';
import AddEditProject from '../features/projects/AddEditProject';

// Bookings
import AllBookings from '../features/bookings/AllBookings';
import AddEditBooking from '../features/bookings/AddEditBooking';

// MOM
import MOMPage from '../features/mom/MOMPage';

// Tasks
import TasksPage from '../features/tasks/TasksPage';

// WhatsApp
import WhatsAppIntegration from '../features/whatsapp/WhatsAppIntegration';

// Settings
import Settings from '../features/settings/Settings';

// Error Pages
import NotFound from '../components/common/NotFound';
import Unauthorized from '../components/common/Unauthorized';

const router = createBrowserRouter([
  // Root redirect
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },

  // Public Routes
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
    ],
  },

  // Protected Routes
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          // Dashboard
          {
            path: 'dashboard',
            element: <Dashboard />,
          },
          
          // Users Management
          {
            path: 'users',
            element: <AllUsers />,
          },
          {
            path: 'users/add',
            element: <AddEditUser />,
          },
          {
            path: 'users/edit/:id',
            element: <AddEditUser />,
          },

          // Leads Management
          {
            path: 'leads',
            element: <AllLeads />,
          },
          {
            path: 'leads/add',
            element: <AddEditLead />,
          },
          {
            path: 'leads/edit/:id',
            element: <AddEditLead />,
          },
          {
            path: 'leads/:id',
            element: <LeadDetails />,
          },

          // Clients Management
          {
            path: 'clients',
            element: <AllClients />,
          },
          {
            path: 'clients/add',
            element: <AddEditClient />,
          },
          {
            path: 'clients/edit/:id',
            element: <AddEditClient />,
          },

          // Channel Partners
          {
            path: 'partners',
            element: <AllPartners />,
          },
          {
            path: 'partners/add',
            element: <AddEditPartner />,
          },
          {
            path: 'partners/edit/:id',
            element: <AddEditPartner />,
          },

          // Properties
          {
            path: 'properties',
            element: <AllProperties />,
          },

          // Projects
          {
            path: 'projects',
            element: <AllProjects />,
          },
          {
            path: 'projects/add',
            element: <AddEditProject />,
          },
          {
            path: 'projects/edit/:id',
            element: <AddEditProject />,
          },

          // Bookings
          {
            path: 'bookings',
            element: <AllBookings />,
          },
          {
            path: 'bookings/add',
            element: <AddEditBooking />,
          },
          {
            path: 'bookings/edit/:id',
            element: <AddEditBooking />,
          },

          // MOM (Minutes of Meeting)
          {
            path: 'mom',
            element: <MOMPage />,
          },

          // Tasks & Reminders
          {
            path: 'tasks',
            element: <TasksPage />,
          },

          // WhatsApp Integration
          {
            path: 'whatsapp',
            element: <WhatsAppIntegration />,
          },

          // Settings
          {
            path: 'settings',
            element: <Settings />,
          },
        ],
      },
    ],
  },

  // Error Pages
  {
    path: '/unauthorized',
    element: <Unauthorized />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;