import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Textarea from '../../components/ui/Textarea';
import toast from 'react-hot-toast';

const AddEditLead = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Personal Info
    name: '',
    email: '',
    phone: '',
    
    // Lead Details
    stage: 'New',
    status: 'Unanswered',
    source: '',
    score: 50,
    
    // Property Requirements
    propertyType: '',
    budget: '',
    location: '',
    bedrooms: '',
    
    // Assignment
    assignedTo: '',
    
    // Additional
    notes: '',
  });

  const [errors, setErrors] = useState({});

  // Load lead data if editing
  useEffect(() => {
    if (isEdit) {
      // Simulated API call - Replace with actual API
      const mockLeadData = {
        name: 'Rajesh Kumar',
        email: 'rajesh.kumar@email.com',
        phone: '9876543210',
        stage: 'Contacted',
        status: 'Follow up',
        source: 'Website',
        score: 85,
        propertyType: '3BHK',
        budget: '50-75L',
        location: 'Dwarka, Delhi',
        bedrooms: '3',
        assignedTo: 'sales-a',
        notes: 'Very interested in South Delhi properties',
      };
      setFormData(mockLeadData);
    }
  }, [isEdit, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Phone must be 10 digits';
    }

    if (!formData.source) {
      newErrors.source = 'Lead source is required';
    }

    if (!formData.propertyType) {
      newErrors.propertyType = 'Property type is required';
    }

    if (!formData.budget) {
      newErrors.budget = 'Budget is required';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error('Please fix all errors before submitting');
      return;
    }

    setLoading(true);

    try {
      // Simulated API call - Replace with actual API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (isEdit) {
        toast.success('Lead updated successfully!');
      } else {
        toast.success('Lead created successfully!');
      }
      
      navigate('/leads');
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Options
  const stageOptions = [
    { value: 'New', label: 'New' },
    { value: 'Contacted', label: 'Contacted' },
    { value: 'Site Visit', label: 'Site Visit' },
    { value: 'Negotiation', label: 'Negotiation' },
    { value: 'Closed', label: 'Closed' },
    { value: 'Lost', label: 'Lost' },
  ];

  const statusOptions = [
    { value: 'Unanswered', label: 'Unanswered' },
    { value: 'Follow up', label: 'Follow up' },
    { value: 'Scheduled', label: 'Scheduled' },
    { value: 'Hot Lead', label: 'Hot Lead' },
    { value: 'Won', label: 'Won' },
    { value: 'Lost', label: 'Lost' },
  ];

  const sourceOptions = [
    { value: 'Website', label: 'Website' },
    { value: 'Facebook Ads', label: 'Facebook Ads' },
    { value: 'Google Ads', label: 'Google Ads' },
    { value: 'Referral', label: 'Referral' },
    { value: 'Walk-in', label: 'Walk-in' },
    { value: 'Phone Call', label: 'Phone Call' },
    { value: 'WhatsApp', label: 'WhatsApp' },
    { value: 'Other', label: 'Other' },
  ];

  const propertyTypeOptions = [
    { value: '1BHK', label: '1BHK Apartment' },
    { value: '2BHK', label: '2BHK Apartment' },
    { value: '3BHK', label: '3BHK Apartment' },
    { value: '4BHK', label: '4BHK Apartment' },
    { value: 'Villa', label: 'Villa' },
    { value: 'Plot', label: 'Plot' },
    { value: 'Commercial', label: 'Commercial' },
  ];

  const budgetOptions = [
    { value: '20-40L', label: '₹20-40 Lakhs' },
    { value: '40-60L', label: '₹40-60 Lakhs' },
    { value: '60-80L', label: '₹60-80 Lakhs' },
    { value: '80L-1Cr', label: '₹80L-1 Crore' },
    { value: '1-1.5Cr', label: '₹1-1.5 Crore' },
    { value: '1.5-2Cr', label: '₹1.5-2 Crore' },
    { value: '2Cr+', label: '₹2 Crore+' },
  ];

  const assignOptions = [
    { value: 'sales-a', label: 'Sales Team A' },
    { value: 'sales-b', label: 'Sales Team B' },
    { value: 'manager', label: 'Manager' },
    { value: 'director', label: 'Director' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/leads')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {isEdit ? 'Edit Lead' : 'Add New Lead'}
            </h1>
            <p className="text-gray-600 mt-1">
              {isEdit ? 'Update lead information' : 'Fill in the details to create a new lead'}
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card title="Personal Information">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={errors.name}
                  placeholder="Enter full name"
                  required
                />
                <Input
                  label="Email Address"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  placeholder="email@example.com"
                  required
                />
                <Input
                  label="Phone Number"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  error={errors.phone}
                  placeholder="9876543210"
                  required
                />
                <Select
                  label="Lead Source"
                  name="source"
                  value={formData.source}
                  onChange={handleChange}
                  error={errors.source}
                  options={sourceOptions}
                  required
                />
              </div>
            </Card>

            {/* Property Requirements */}
            <Card title="Property Requirements">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  label="Property Type"
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  error={errors.propertyType}
                  options={propertyTypeOptions}
                  required
                />
                <Select
                  label="Budget Range"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  error={errors.budget}
                  options={budgetOptions}
                  required
                />
                <Input
                  label="Preferred Location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g., Dwarka, Delhi"
                />
                <Input
                  label="Number of Bedrooms"
                  type="number"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleChange}
                  placeholder="e.g., 3"
                  min="1"
                  max="10"
                />
              </div>
            </Card>

            {/* Additional Notes */}
            <Card title="Additional Information">
              <Textarea
                label="Notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Add any additional notes about the lead..."
                rows={4}
              />
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Lead Status */}
            <Card title="Lead Status">
              <div className="space-y-4">
                <Select
                  label="Stage"
                  name="stage"
                  value={formData.stage}
                  onChange={handleChange}
                  options={stageOptions}
                />
                <Select
                  label="Status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  options={statusOptions}
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Lead Score
                  </label>
                  <input
                    type="range"
                    name="score"
                    value={formData.score}
                    onChange={handleChange}
                    min="0"
                    max="100"
                    className="w-full"
                  />
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm text-gray-600">Cold</span>
                    <span className="text-lg font-semibold text-primary-600">
                      {formData.score}
                    </span>
                    <span className="text-sm text-gray-600">Hot</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Assignment */}
            <Card title="Assignment">
              <Select
                label="Assign To"
                name="assignedTo"
                value={formData.assignedTo}
                onChange={handleChange}
                options={assignOptions}
              />
            </Card>

            {/* Actions */}
            <Card>
              <div className="space-y-3">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  loading={loading}
                  icon={<Save className="h-4 w-4" />}
                >
                  {isEdit ? 'Update Lead' : 'Create Lead'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="w-full"
                  onClick={() => navigate('/leads')}
                  disabled={loading}
                >
                  Cancel
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddEditLead;