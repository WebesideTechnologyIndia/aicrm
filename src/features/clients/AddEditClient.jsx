import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Textarea from '../../components/ui/Textarea';
import toast from 'react-hot-toast';

const AddEditClient = () => {
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
    
    // Communication
    preferredMode: 'Call',
    
    // Professional / Financial
    occupation: '',
    companyName: '',
    companyAddress: '',
    
    // Property Details
    purpose: '',
    propertyType: '',
    budgetRange: '',
    preferredLocation: '',
    developer: '',
    project: '',
    unitSize: '',
    timeline: '',
    paymentMode: '',
    
    // Lead Status
    leadStatus: 'Warm',
    decisionInfluencer: '',
    decisionCriteria: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
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
      toast.success(isEdit ? 'Client updated!' : 'Client created!');
      navigate('/clients');
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
    { value: 'Divorced', label: 'Divorced' },
    { value: 'Widowed', label: 'Widowed' },
  ];

  const communicationModeOptions = [
    { value: 'Call', label: 'Call' },
    { value: 'WhatsApp', label: 'WhatsApp' },
    { value: 'Email', label: 'Email' },
    { value: 'SMS', label: 'SMS' },
  ];

  const occupationOptions = [
    { value: 'Job', label: 'Job' },
    { value: 'Business', label: 'Business' },
    { value: 'Investor', label: 'Investor' },
    { value: 'NRI', label: 'NRI' },
  ];

  const purposeOptions = [
    { value: 'Investment', label: 'Investment' },
    { value: 'End Use', label: 'End Use' },
    { value: 'Commercial', label: 'Commercial' },
  ];

  const propertyTypeOptions = [
    { value: 'Residential', label: 'Residential' },
    { value: 'Commercial', label: 'Commercial' },
    { value: 'Plot', label: 'Plot' },
    { value: 'Farmland', label: 'Farmland' },
  ];

  const budgetOptions = [
    { value: '20-40L', label: '₹20-40 Lakhs' },
    { value: '40-60L', label: '₹40-60 Lakhs' },
    { value: '60L-1Cr', label: '₹60L-1 Crore' },
    { value: '1-2Cr', label: '₹1-2 Crore' },
    { value: '2Cr+', label: '₹2 Crore+' },
  ];

  const timelineOptions = [
    { value: 'Urgent', label: 'Urgent' },
    { value: '1-3 Months', label: '1-3 Months' },
    { value: '6+ Months', label: '6+ Months' },
  ];

  const paymentModeOptions = [
    { value: 'Loan', label: 'Loan' },
    { value: 'Self-Funding', label: 'Self-Funding' },
    { value: 'Mix', label: 'Mix' },
  ];

  const leadStatusOptions = [
    { value: 'Hot', label: 'Hot' },
    { value: 'Warm', label: 'Warm' },
    { value: 'Cold', label: 'Cold' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/clients')} className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{isEdit ? 'Edit Client' : 'Add New Client'}</h1>
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

          {/* Source */}
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
              <Select label="Preferred Communication" name="preferredMode" value={formData.preferredMode} onChange={handleChange} options={communicationModeOptions} />
            </div>
          </Card>

          {/* Professional Details */}
          <Card title="Professional / Financial Details">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select label="Occupation" name="occupation" value={formData.occupation} onChange={handleChange} options={occupationOptions} />
              <Input label="Company Name" name="companyName" value={formData.companyName} onChange={handleChange} />
              <Textarea label="Company Address" name="companyAddress" value={formData.companyAddress} onChange={handleChange} rows={2} containerClassName="md:col-span-2" />
            </div>
          </Card>

          {/* Property Details */}
          <Card title="Property Details">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select label="Purpose" name="purpose" value={formData.purpose} onChange={handleChange} options={purposeOptions} />
              <Select label="Property Type" name="propertyType" value={formData.propertyType} onChange={handleChange} options={propertyTypeOptions} />
              <Select label="Budget Range" name="budgetRange" value={formData.budgetRange} onChange={handleChange} options={budgetOptions} />
              <Input label="Preferred Location" name="preferredLocation" value={formData.preferredLocation} onChange={handleChange} />
              <Input label="Developer" name="developer" value={formData.developer} onChange={handleChange} />
              <Input label="Project" name="project" value={formData.project} onChange={handleChange} />
              <Input label="Unit Size / Configuration" name="unitSize" value={formData.unitSize} onChange={handleChange} placeholder="e.g., 2 BHK" />
              <Select label="Timeline to Purchase" name="timeline" value={formData.timeline} onChange={handleChange} options={timelineOptions} />
              <Select label="Payment Mode" name="paymentMode" value={formData.paymentMode} onChange={handleChange} options={paymentModeOptions} />
            </div>
          </Card>

          {/* Lead Status */}
          <Card title="Lead Status & Decision Criteria">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select label="Current Lead Status" name="leadStatus" value={formData.leadStatus} onChange={handleChange} options={leadStatusOptions} />
              <Input label="Decision Influencer" name="decisionInfluencer" value={formData.decisionInfluencer} onChange={handleChange} placeholder="Self / Family / Friends" />
              <Textarea label="Key Decision Criteria" name="decisionCriteria" value={formData.decisionCriteria} onChange={handleChange} placeholder="ROI, Location, Amenities..." rows={2} containerClassName="md:col-span-2" />
            </div>
          </Card>

          {/* Actions */}
          <div className="flex items-center gap-3 justify-end">
            <Button type="button" variant="outline" onClick={() => navigate('/clients')}>Cancel</Button>
            <Button type="submit" loading={loading} icon={<Save className="h-4 w-4" />}>
              {isEdit ? 'Update Client' : 'Create Client'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddEditClient;