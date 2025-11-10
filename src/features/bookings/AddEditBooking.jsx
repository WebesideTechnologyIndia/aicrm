import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Upload } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Textarea from '../../components/ui/Textarea';
import toast from 'react-hot-toast';

const AddEditBooking = () => {
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
    
    // Professional / Financial
    occupation: '',
    companyName: '',
    companyAddress: '',
    
    // Property Details
    purpose: '',
    propertyType: '',
    price: '',
    location: '',
    developer: '',
    project: '',
    unitSize: '',
    unitNumber: '',
    paymentPlan: '',
    area: '',
    paymentMode: '',
    
    // Booking Details
    bookingDate: '',
    bookingAmount: '',
    registrationDate: '',
    possessionDate: '',
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
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.source) newErrors.source = 'Source is required';
    if (!formData.price) newErrors.price = 'Price is required';
    if (!formData.unitNumber) newErrors.unitNumber = 'Unit number is required';
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
      toast.success(isEdit ? 'Booking updated!' : 'Booking created!');
      navigate('/bookings');
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

  const paymentModeOptions = [
    { value: 'Loan', label: 'Loan' },
    { value: 'Self-Funding', label: 'Self-Funding' },
    { value: 'Mix', label: 'Mix' },
  ];

  const paymentPlanOptions = [
    { value: 'Construction Linked', label: 'Construction Linked' },
    { value: 'Possession Linked', label: 'Possession Linked' },
    { value: 'Down Payment', label: 'Down Payment' },
    { value: 'Flexi', label: 'Flexi' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/bookings')} className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {isEdit ? 'Edit Booked Client' : 'Add Booked Client'}
            </h1>
            <p className="text-gray-600 mt-1">Complete booking information</p>
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
              <Input label="Price" type="number" name="price" value={formData.price} onChange={handleChange} error={errors.price} placeholder="₹" required />
              <Input label="Location" name="location" value={formData.location} onChange={handleChange} />
              <Input label="Developer" name="developer" value={formData.developer} onChange={handleChange} />
              <Input label="Project" name="project" value={formData.project} onChange={handleChange} />
              <Input label="Unit Size / Configuration" name="unitSize" value={formData.unitSize} onChange={handleChange} placeholder="e.g., 2 BHK, 200 sq. yd" />
              <Input label="Unit Number" name="unitNumber" value={formData.unitNumber} onChange={handleChange} error={errors.unitNumber} required />
              <Select label="Payment Plan" name="paymentPlan" value={formData.paymentPlan} onChange={handleChange} options={paymentPlanOptions} />
              <Input label="Area (sq. ft / sq. yd)" name="area" value={formData.area} onChange={handleChange} />
              <Select label="Mode of Payment" name="paymentMode" value={formData.paymentMode} onChange={handleChange} options={paymentModeOptions} />
            </div>
          </Card>

          {/* Booking Details */}
          <Card title="Booking Details">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Booking Date" type="date" name="bookingDate" value={formData.bookingDate} onChange={handleChange} />
              <Input label="Booking Amount" type="number" name="bookingAmount" value={formData.bookingAmount} onChange={handleChange} placeholder="₹" />
              <Input label="Registration Date" type="date" name="registrationDate" value={formData.registrationDate} onChange={handleChange} />
              <Input label="Possession Date" type="date" name="possessionDate" value={formData.possessionDate} onChange={handleChange} />
            </div>
          </Card>

          {/* Document Upload */}
          <Card title="Documents">
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary-500 transition-colors cursor-pointer">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-700 font-medium">Upload booking documents</p>
                <p className="text-sm text-gray-500 mt-1">PDF, Images (Max 10MB each)</p>
                <input type="file" multiple className="hidden" accept=".pdf,.jpg,.jpeg,.png" />
              </div>
            </div>
          </Card>

          {/* Actions */}
          <div className="flex items-center gap-3 justify-end">
            <Button type="button" variant="outline" onClick={() => navigate('/bookings')}>Cancel</Button>
            <Button type="submit" loading={loading} icon={<Save className="h-4 w-4" />}>
              {isEdit ? 'Update Booking' : 'Create Booking'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddEditBooking;