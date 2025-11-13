import { useState, useEffect } from 'react';
import { ArrowLeft, Save } from 'lucide-react';

// Mock Card Component
const Card = ({ title, children, className = '' }) => (
  <div className={`bg-white rounded-lg border border-gray-200 ${className}`}>
    {title && (
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>
    )}
    <div className="p-6">{children}</div>
  </div>
);

// Mock Button Component
const Button = ({ children, variant = 'primary', size = 'md', icon, className = '', onClick, disabled, loading }) => {
  const baseStyles = 'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors';
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  };
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };
  
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className} ${disabled || loading ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {loading ? 'Loading...' : (
        <>
          {icon}
          {children}
        </>
      )}
    </button>
  );
};

// Mock Input Component
const Input = ({ label, error, required, ...props }) => (
  <div className="space-y-1">
    {label && (
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
    )}
    <input
      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
        error ? 'border-red-300' : 'border-gray-300'
      }`}
      {...props}
    />
    {error && <p className="text-sm text-red-600">{error}</p>}
  </div>
);

// Mock Textarea Component
const Textarea = ({ label, error, required, ...props }) => (
  <div className="space-y-1">
    {label && (
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
    )}
    <textarea
      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
        error ? 'border-red-300' : 'border-gray-300'
      }`}
      {...props}
    />
    {error && <p className="text-sm text-red-600">{error}</p>}
  </div>
);

// Mock Select Component
const Select = ({ label, options = [], error, required, ...props }) => (
  <div className="space-y-1">
    {label && (
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
    )}
    <select
      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
        error ? 'border-red-300' : 'border-gray-300'
      }`}
      {...props}
    >
      <option value="">Select...</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    {error && <p className="text-sm text-red-600">{error}</p>}
  </div>
);

const AddEditLead = () => {
  const [isEdit] = useState(false); // Set to true to test edit mode
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
    
    // API Integration Fields
    gclid: '',
    fbclid: '',
    campaignId: '',
    adGroupId: '',
    adSetId: '',
    adId: '',
    creativeId: '',
    utmSource: '',
    utmMedium: '',
    utmCampaign: '',
    utmTerm: '',
    utmContent: '',
  });

  const [errors, setErrors] = useState({});

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

  const handleSubmit = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      alert('Please fix all errors before submitting');
      return;
    }

    setLoading(true);

    try {
      // Simulated API call - Replace with actual API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (isEdit) {
        alert('Lead updated successfully!');
      } else {
        alert('Lead created successfully!');
      }
      
      // navigate('/leads'); - In real app, use router navigation
      console.log('Form submitted:', formData);
    } catch (error) {
      alert('Something went wrong. Please try again.');
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
    { value: 'Google Ads', label: 'Google Ads' },
    { value: 'Meta Ads', label: 'Meta Ads (Facebook/Instagram)' },
    { value: 'LinkedIn Leads', label: 'LinkedIn Leads' },
    { value: 'YouTube Ads', label: 'YouTube Ads' },
    { value: 'Referral', label: 'Referral' },
    { value: 'Walk-in', label: 'Walk-in' },
    { value: 'Phone Call', label: 'Phone Call' },
    { value: 'WhatsApp', label: 'WhatsApp' },
    { value: 'Manual Entry', label: 'Manual Entry' },
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

  // Check if source requires API fields
  const requiresGoogleFields = formData.source === 'Google Ads' || formData.source === 'YouTube Ads';
  const requiresMetaFields = formData.source === 'Meta Ads';
  const requiresLinkedInFields = formData.source === 'LinkedIn Leads';
  const showApiFields = requiresGoogleFields || requiresMetaFields || requiresLinkedInFields;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => console.log('Navigate back')}
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

            {/* API Integration Fields - Conditionally Rendered */}
            {showApiFields && (
              <Card title="API Integration Details">
                <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Note:</strong> Fill in these fields if the lead came from {formData.source}. 
                    These help track campaign performance.
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Google Ads & YouTube Ads Fields */}
                  {requiresGoogleFields && (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                          label="GCLID (Google Click ID)"
                          name="gclid"
                          value={formData.gclid}
                          onChange={handleChange}
                          placeholder="e.g., Cj0KCQiA..."
                        />
                        <Input
                          label="Campaign ID"
                          name="campaignId"
                          value={formData.campaignId}
                          onChange={handleChange}
                          placeholder="e.g., 12345678"
                        />
                        <Input
                          label="Ad Group ID"
                          name="adGroupId"
                          value={formData.adGroupId}
                          onChange={handleChange}
                          placeholder="e.g., 87654321"
                        />
                        <Input
                          label="Ad ID"
                          name="adId"
                          value={formData.adId}
                          onChange={handleChange}
                          placeholder="e.g., 11223344"
                        />
                      </div>
                    </>
                  )}

                  {/* Meta Ads Fields */}
                  {requiresMetaFields && (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                          label="FBCLID (Facebook Click ID)"
                          name="fbclid"
                          value={formData.fbclid}
                          onChange={handleChange}
                          placeholder="e.g., IwAR0..."
                        />
                        <Input
                          label="Campaign ID"
                          name="campaignId"
                          value={formData.campaignId}
                          onChange={handleChange}
                          placeholder="e.g., 23842372645180275"
                        />
                        <Input
                          label="Ad Set ID"
                          name="adSetId"
                          value={formData.adSetId}
                          onChange={handleChange}
                          placeholder="e.g., 23842372643180275"
                        />
                        <Input
                          label="Ad ID"
                          name="adId"
                          value={formData.adId}
                          onChange={handleChange}
                          placeholder="e.g., 23842372641180275"
                        />
                      </div>
                    </>
                  )}

                  {/* LinkedIn Leads Fields */}
                  {requiresLinkedInFields && (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                          label="Campaign ID"
                          name="campaignId"
                          value={formData.campaignId}
                          onChange={handleChange}
                          placeholder="e.g., 123456789"
                        />
                        <Input
                          label="Creative ID"
                          name="creativeId"
                          value={formData.creativeId}
                          onChange={handleChange}
                          placeholder="e.g., 987654321"
                        />
                      </div>
                    </>
                  )}

                  {/* UTM Parameters - Common for all */}
                  <div className="pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">UTM Parameters</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="UTM Source"
                        name="utmSource"
                        value={formData.utmSource}
                        onChange={handleChange}
                        placeholder="e.g., google, facebook"
                      />
                      <Input
                        label="UTM Medium"
                        name="utmMedium"
                        value={formData.utmMedium}
                        onChange={handleChange}
                        placeholder="e.g., cpc, social"
                      />
                      <Input
                        label="UTM Campaign"
                        name="utmCampaign"
                        value={formData.utmCampaign}
                        onChange={handleChange}
                        placeholder="e.g., summer_sale"
                      />
                      <Input
                        label="UTM Term"
                        name="utmTerm"
                        value={formData.utmTerm}
                        onChange={handleChange}
                        placeholder="e.g., luxury+apartments"
                      />
                      <div className="md:col-span-2">
                        <Input
                          label="UTM Content"
                          name="utmContent"
                          value={formData.utmContent}
                          onChange={handleChange}
                          placeholder="e.g., banner_ad"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            )}

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
                    <span className="text-lg font-semibold text-blue-600">
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
                  variant="primary"
                  size="lg"
                  className="w-full"
                  loading={loading}
                  icon={<Save className="h-4 w-4" />}
                  onClick={handleSubmit}
                >
                  {isEdit ? 'Update Lead' : 'Create Lead'}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full"
                  onClick={() => console.log('Cancel')}
                  disabled={loading}
                >
                  Cancel
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEditLead;