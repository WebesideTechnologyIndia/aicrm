import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import toast from 'react-hot-toast';
import { usersAPI } from '../../services/api';

const AddEditUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;
  const [loading, setLoading] = useState(false);
  const [fetchingUser, setFetchingUser] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Sales',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEdit) {
      fetchUserDetails();
    }
  }, [id]);

  const fetchUserDetails = async () => {
    try {
      setFetchingUser(true);
      const { data } = await usersAPI.getById(id);
      
      if (data.success && data.user) {
        setFormData({
          name: data.user.name || '',
          email: data.user.email || '',
          phone: data.user.phone || '',
          role: data.user.role || 'Sales',
          password: '',
          confirmPassword: '',
        });
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      toast.error('Failed to fetch user details');
      navigate('/users');
    } finally {
      setFetchingUser(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!isEdit) {
      // Password validation only for new users
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    } else {
      // For edit, only validate password if it's provided
      if (formData.password) {
        if (formData.password.length < 6) {
          newErrors.password = 'Password must be at least 6 characters';
        }
        if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = 'Passwords do not match';
        }
      }
    }

    if (!formData.role) {
      newErrors.role = 'Role is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fix all errors before submitting');
      return;
    }

    setLoading(true);
    try {
      const submitData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        role: formData.role,
      };

      // Only include password if it's provided
      if (formData.password && formData.password.trim() !== '') {
        submitData.password = formData.password;
      }

      let response;
      if (isEdit) {
        response = await usersAPI.update(id, submitData);
      } else {
        response = await usersAPI.create(submitData);
      }

      if (response.data.success) {
        toast.success(isEdit ? 'User updated successfully!' : 'User created successfully!');
        navigate('/users');
      }
    } catch (error) {
      console.error('Error saving user:', error);
      toast.error(error.response?.data?.message || `Failed to ${isEdit ? 'update' : 'create'} user`);
    } finally {
      setLoading(false);
    }
  };

  const roleOptions = [
    { value: 'Admin', label: 'Admin' },
    { value: 'Manager', label: 'Manager' },
    { value: 'Sales', label: 'Sales' },
    { value: 'Support', label: 'Support' },
  ];

  if (fetchingUser) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading user details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate('/users')} className="p-2 hover:bg-gray-100 rounded-lg">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{isEdit ? 'Edit User' : 'Add New User'}</h1>
          <p className="text-gray-600 mt-1">Fill in user details</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <Card title="Basic Information">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Input
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter full name"
                />
                {errors.name && (
                  <p className="text-sm text-red-600 mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <Input
                  label="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="user@example.com"
                />
                {errors.email && (
                  <p className="text-sm text-red-600 mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <Input
                  label="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="9876543210"
                />
              </div>

              <div>
                <Select
                  label="Role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  options={roleOptions}
                  required
                />
                {errors.role && (
                  <p className="text-sm text-red-600 mt-1">{errors.role}</p>
                )}
              </div>
            </div>
          </Card>

          <Card title={isEdit ? 'Change Password (Optional)' : 'Set Password'}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Input
                  label={isEdit ? 'New Password (Leave blank to keep current)' : 'Password'}
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required={!isEdit}
                  placeholder="Minimum 6 characters"
                />
                {errors.password && (
                  <p className="text-sm text-red-600 mt-1">{errors.password}</p>
                )}
              </div>

              <div>
                <Input
                  label="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required={!isEdit || formData.password !== ''}
                  placeholder="Re-enter password"
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-red-600 mt-1">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            {isEdit && (
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  💡 Leave password fields blank if you don't want to change the password
                </p>
              </div>
            )}
          </Card>

          <div className="flex items-center gap-3 justify-end">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate('/users')}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              loading={loading} 
              icon={<Save className="h-4 w-4" />}
            >
              {isEdit ? 'Update User' : 'Create User'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddEditUser;