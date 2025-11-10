import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import toast from 'react-hot-toast';

const AddEditUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    team: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success(isEdit ? 'User updated!' : 'User created!');
      navigate('/users');
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const roleOptions = [
    { value: 'sales', label: 'Sales' },
    { value: 'tl', label: 'Team Leader' },
    { value: 'manager', label: 'Manager' },
    { value: 'director', label: 'Director' },
    { value: 'admin', label: 'Admin' },
    { value: 'partner', label: 'Channel Partner' },
  ];

  const teamOptions = [
    { value: 'team-a', label: 'Team A' },
    { value: 'team-b', label: 'Team B' },
    { value: 'team-c', label: 'Team C' },
  ];

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
              <Input
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <Input
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <Input
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              <Select
                label="Role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                options={roleOptions}
                required
              />
              <Select
                label="Team"
                name="team"
                value={formData.team}
                onChange={handleChange}
                options={teamOptions}
              />
              {!isEdit && (
                <Input
                  label="Password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              )}
            </div>
          </Card>

          <div className="flex items-center gap-3 justify-end">
            <Button type="button" variant="outline" onClick={() => navigate('/users')}>
              Cancel
            </Button>
            <Button type="submit" loading={loading} icon={<Save className="h-4 w-4" />}>
              {isEdit ? 'Update User' : 'Create User'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddEditUser;