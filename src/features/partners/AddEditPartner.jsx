import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Textarea from '../../components/ui/Textarea';
import toast from 'react-hot-toast';

const AddEditPartner = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    // Basic Information
    name: '',
    email: '',
    phone: '',
    alternateNumber: '',
    dob: '',
    maritalStatus: '',
    anniversaryDate: '',
    
    // Source
    source: '',
    referredBy: '',
    campaignName: '',
    
    // Address
    city: '',
    state: '',
    
    // Professional
    occupation: '',
    companyName: '',
    companyAddress: '',
    
    // Properties Dealing In
    propertyTypes: [],
    budgetRange: '',
    preferredLocation: '',
    developer: '',
    project: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked, options } = e.target;
    
    if (type === 'select-multiple') {
      const selectedValues = Array.from(options)
        .filter(option => option.selected)
        .map(option => option.value);
      setFormData(prev => ({ ...prev, [name]: selectedValues }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.source) newErrors.source = 'Source is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error('Please fix all errors');
      return;
    }

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success(isEdit ? 'Partner updated!' : 'Partner created!');
      navigate('/partners');
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const sourceOptions = [
    { value: 'Walk-in', label: 'Walk-in' },
    { value: 'Referral', label: 'Referral' },
    { value: 'Digital', label: 'Digital' },
    { value: 'Channel Partner', label: 'Channel Partner' },
    { value: 'Event', label: 'Event' },
    { value: 'Social Media', label: 'Social Media' },
  ];

  const maritalStatusOptions = [
    { value: 'Single', label: 'Single' },
    { value: 'Married', label: 'Married' },
  ];

  const occupationOptions = [
    { value: 'Freelancer', label: 'Freelancer' },
    { value: 'Business Owner', label: 'Business Owner' },
  ];

  const budgetOptions = [
    { value: '20-50L', label: '₹20-50 Lakhs' },
    { value: '50L-1Cr', label: '₹50L-1 Crore' },
    { value: '1-2Cr', label: '₹1-2 Crore' },
    { value: '2Cr+', label: '₹2 Crore+' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/partners')} className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {isEdit ? 'Edit Channel Partner' : 'Add New Channel Partner'}
            </h1>
            <p className="text-gray-600 mt-1">Fill in all the details</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* Basic Information */}
          <Card title="Basic Information">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input label="Name" name="name" value={formData.name} onChange={handleChange} error={errors.name} required />
              <Input label="Email" type="email" name="email" value={formData.email} onChange={handleChange} error={errors.email} required />
              <Input label="Phone" name="phone" value={formData.phone} onChange={handleChange} error={errors.phone} required />
              <Input label="Alternate Number" name="alternateNumber" value={formData.alternateNumber} onChange={handleChange} />
              <Input label="Date of Birth" type="date" name="dob" value={formData.dob} onChange={handleChange} />
              <Select label="Marital Status" name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} options={maritalStatusOptions} />
              <Input label="Anniversary Date" type="date" name="anniversaryDate" value={formData.anniversaryDate} onChange={handleChange} />
            </div>
          </Card>

          {/* Source Information */}
          <Card title="Source Information">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select label="Source" name="source" value={formData.source} onChange={handleChange} error={errors.source} options={sourceOptions} required />
              <Input label="Referred By" name="referredBy" value={formData.referredBy} onChange={handleChange} />
              <Input label="Campaign Name" name="campaignName" value={formData.campaignName} onChange={handleChange} />
            </div>
          </Card>

          {/* Address */}
          <Card title="Address">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="City" name="city" value={formData.city} onChange={handleChange} />
              <Input label="State" name="state" value={formData.state} onChange={handleChange} />
            </div>
          </Card>

          {/* Professional Details */}
          <Card title="Professional Details">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select label="Occupation" name="occupation" value={formData.occupation} onChange={handleChange} options={occupationOptions} />
              <Input label="Company Name" name="companyName" value={formData.companyName} onChange={handleChange} />
              <Textarea label="Company Address" name="companyAddress" value={formData.companyAddress} onChange={handleChange} rows={2} containerClassName="md:col-span-2" />
            </div>
          </Card>

          {/* Properties Dealing In */}
          <Card title="Properties Dealing In Details">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Property Type (Multiple Select)
                </label>
                <select
                  name="propertyTypes"
                  multiple
                  value={formData.propertyTypes}
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900"
                  size="4"
                >
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Plot">Plot</option>
                  <option value="Farmland">Farmland</option>
                </select>
                <p className="mt-1 text-xs text-gray-500">Hold Ctrl/Cmd to select multiple</p>
              </div>
              <Select label="Budget Range" name="budgetRange" value={formData.budgetRange} onChange={handleChange} options={budgetOptions} />
              <Input label="Preferred Location Dealing In" name="preferredLocation" value={formData.preferredLocation} onChange={handleChange} />
              <Input label="Developer" name="developer" value={formData.developer} onChange={handleChange} />
              <Input label="Project" name="project" value={formData.project} onChange={handleChange} containerClassName="md:col-span-2" />
            </div>
          </Card>

          {/* Actions */}
          <div className="flex items-center gap-3 justify-end">
            <Button type="button" variant="outline" onClick={() => navigate('/partners')}>Cancel</Button>
            <Button type="submit" loading={loading} icon={<Save className="h-4 w-4" />}>
              {isEdit ? 'Update Partner' : 'Create Partner'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddEditPartner;