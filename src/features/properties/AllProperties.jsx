import { useState } from 'react';
import { Plus, Search, Filter, MapPin, Home, Eye, Edit, Trash2, X, Upload, FileText, Image as ImageIcon, Bed, Bath, Car, Calendar, User, Phone, Mail, IndianRupee } from 'lucide-react';

// Card Component
const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
    {children}
  </div>
);

// Button Component
const Button = ({ children, variant = 'primary', icon, onClick, type = 'button', className = '' }) => {
  const baseClasses = 'px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2';
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50',
  };
  
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${className}`}
    >
      {icon}
      {children}
    </button>
  );
};

// Input Component
const Input = ({ label, icon, className = '', ...props }) => (
  <div className={className}>
    {label && <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>}
    <div className="relative">
      {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{icon}</div>}
      <input
        className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${icon ? 'pl-10' : ''}`}
        {...props}
      />
    </div>
  </div>
);

// Badge Component
const Badge = ({ children, variant = 'default' }) => {
  const variants = {
    success: 'bg-green-100 text-green-800',
    default: 'bg-gray-100 text-gray-800',
    info: 'bg-blue-100 text-blue-800',
    warning: 'bg-yellow-100 text-yellow-800',
  };
  
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${variants[variant]}`}>
      {children}
    </span>
  );
};

const AllProperties = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [properties, setProperties] = useState([
    {
      id: 1,
      title: 'Luxury 3BHK Apartment',
      description: 'Spacious luxury apartment with modern amenities',
      location: 'Dwarka, Delhi',
      address: 'Sector 12, Dwarka, New Delhi - 110075',
      type: 'Residential',
      listingType: 'Sale',
      price: '7500000',
      size: '1500',
      status: 'Available',
      bedrooms: 3,
      bathrooms: 2,
      balconies: 2,
      parking: 1,
      furnishing: 'Semi-Furnished',
      facing: 'East',
      floor: '5',
      totalFloors: '15',
      ageOfProperty: '2',
      amenities: ['Gym', 'Swimming Pool', 'Park', 'Security'],
      ownerName: 'Raj Kumar',
      ownerPhone: '9876543210',
      ownerEmail: 'raj@example.com',
      images: [],
      brochure: null,
      availableFrom: '2024-12-01',
    },
  ]);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    address: '',
    type: 'Residential',
    listingType: 'Sale',
    price: '',
    size: '',
    status: 'Available',
    bedrooms: '',
    bathrooms: '',
    balconies: '',
    parking: '',
    furnishing: 'Unfurnished',
    facing: 'North',
    floor: '',
    totalFloors: '',
    ageOfProperty: '',
    amenities: [],
    ownerName: '',
    ownerPhone: '',
    ownerEmail: '',
    images: [],
    brochure: null,
    availableFrom: '',
  });

  const amenitiesList = ['Gym', 'Swimming Pool', 'Park', 'Security', 'Lift', 'Power Backup', 'Club House', 'Garden', 'Play Area', 'CCTV', 'Maintenance Staff', 'Water Supply', 'Visitor Parking'];

  const handleAddProperty = () => {
    setFormData({
      title: '',
      description: '',
      location: '',
      address: '',
      type: 'Residential',
      listingType: 'Sale',
      price: '',
      size: '',
      status: 'Available',
      bedrooms: '',
      bathrooms: '',
      balconies: '',
      parking: '',
      furnishing: 'Unfurnished',
      facing: 'North',
      floor: '',
      totalFloors: '',
      ageOfProperty: '',
      amenities: [],
      ownerName: '',
      ownerPhone: '',
      ownerEmail: '',
      images: [],
      brochure: null,
      availableFrom: '',
    });
    setShowAddModal(true);
  };

  const handleEditProperty = (property) => {
    setSelectedProperty(property);
    setFormData(property);
    setShowEditModal(true);
  };

  const handleViewProperty = (property) => {
    setSelectedProperty(property);
    setShowViewModal(true);
  };

  const handleDeleteProperty = (property) => {
    if (window.confirm(`Are you sure you want to delete "${property.title}"?`)) {
      setProperties(properties.filter(p => p.id !== property.id));
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imagePromises = files.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(imagePromises).then(images => {
      setFormData({...formData, images: [...formData.images, ...images]});
    });
  };

  const handleBrochureUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData({...formData, brochure: { name: file.name, data: e.target.result }});
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (index) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index)
    });
  };

  const toggleAmenity = (amenity) => {
    const amenities = formData.amenities.includes(amenity)
      ? formData.amenities.filter(a => a !== amenity)
      : [...formData.amenities, amenity];
    setFormData({...formData, amenities});
  };

  const handleSubmitAdd = (e) => {
    e.preventDefault();
    const newProperty = {
      ...formData,
      id: Math.max(...properties.map(p => p.id), 0) + 1,
    };
    setProperties([...properties, newProperty]);
    setShowAddModal(false);
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    setProperties(properties.map(p => 
      p.id === selectedProperty.id ? { ...formData, id: p.id } : p
    ));
    setShowEditModal(false);
  };

  const filteredProperties = properties.filter(property =>
    property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    property.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatPrice = (price) => {
    const num = parseInt(price);
    if (num >= 10000000) return `₹${(num / 10000000).toFixed(2)} Cr`;
    if (num >= 100000) return `₹${(num / 100000).toFixed(2)} L`;
    return `₹${num.toLocaleString()}`;
  };

  const PropertyForm = ({ onSubmit, onCancel, isEdit = false }) => (
    <div className="space-y-6">
      {/* Basic Details */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Basic Details</h3>
        <Input
          label="Property Title"
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          placeholder="e.g., Luxury 3BHK Apartment"
          required
        />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            placeholder="Detailed property description..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows="3"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option>Residential</option>
              <option>Commercial</option>
              <option>Industrial</option>
              <option>Agricultural</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Listing Type</label>
            <select
              value={formData.listingType}
              onChange={(e) => setFormData({...formData, listingType: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option>Sale</option>
              <option>Rent</option>
              <option>Lease</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({...formData, status: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option>Available</option>
            <option>Sold</option>
            <option>Rented</option>
            <option>Under Negotiation</option>
          </select>
        </div>
      </div>

      {/* Location Details */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Location Details</h3>
        <Input
          label="Location/Area"
          value={formData.location}
          onChange={(e) => setFormData({...formData, location: e.target.value})}
          placeholder="e.g., Dwarka, Delhi"
          required
        />
        <Input
          label="Complete Address"
          value={formData.address}
          onChange={(e) => setFormData({...formData, address: e.target.value})}
          placeholder="Complete address with pincode"
        />
      </div>

      {/* Property Details */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Property Details</h3>
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Price (₹)"
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({...formData, price: e.target.value})}
            placeholder="Enter price in rupees"
            required
          />
          <Input
            label="Size (sq.ft)"
            type="number"
            value={formData.size}
            onChange={(e) => setFormData({...formData, size: e.target.value})}
            placeholder="Total area"
            required
          />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Input
            label="Bedrooms"
            type="number"
            value={formData.bedrooms}
            onChange={(e) => setFormData({...formData, bedrooms: e.target.value})}
            placeholder="BHK"
          />
          <Input
            label="Bathrooms"
            type="number"
            value={formData.bathrooms}
            onChange={(e) => setFormData({...formData, bathrooms: e.target.value})}
            placeholder="Bathrooms"
          />
          <Input
            label="Balconies"
            type="number"
            value={formData.balconies}
            onChange={(e) => setFormData({...formData, balconies: e.target.value})}
            placeholder="Balconies"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Parking"
            type="number"
            value={formData.parking}
            onChange={(e) => setFormData({...formData, parking: e.target.value})}
            placeholder="No. of parking"
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Furnishing</label>
            <select
              value={formData.furnishing}
              onChange={(e) => setFormData({...formData, furnishing: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option>Unfurnished</option>
              <option>Semi-Furnished</option>
              <option>Fully-Furnished</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Facing</label>
            <select
              value={formData.facing}
              onChange={(e) => setFormData({...formData, facing: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option>North</option>
              <option>South</option>
              <option>East</option>
              <option>West</option>
              <option>North-East</option>
              <option>North-West</option>
              <option>South-East</option>
              <option>South-West</option>
            </select>
          </div>
          <Input
            label="Floor"
            type="number"
            value={formData.floor}
            onChange={(e) => setFormData({...formData, floor: e.target.value})}
            placeholder="Floor no."
          />
          <Input
            label="Total Floors"
            type="number"
            value={formData.totalFloors}
            onChange={(e) => setFormData({...formData, totalFloors: e.target.value})}
            placeholder="Total floors"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Age of Property (Years)"
            type="number"
            value={formData.ageOfProperty}
            onChange={(e) => setFormData({...formData, ageOfProperty: e.target.value})}
            placeholder="Property age"
          />
          <Input
            label="Available From"
            type="date"
            value={formData.availableFrom}
            onChange={(e) => setFormData({...formData, availableFrom: e.target.value})}
          />
        </div>
      </div>

      {/* Amenities */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Amenities</h3>
        <div className="grid grid-cols-3 gap-3">
          {amenitiesList.map(amenity => (
            <label key={amenity} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.amenities.includes(amenity)}
                onChange={() => toggleAmenity(amenity)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{amenity}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Owner Details */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Owner Details</h3>
        <Input
          label="Owner Name"
          value={formData.ownerName}
          onChange={(e) => setFormData({...formData, ownerName: e.target.value})}
          placeholder="Property owner name"
          required
        />
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Phone Number"
            type="tel"
            value={formData.ownerPhone}
            onChange={(e) => setFormData({...formData, ownerPhone: e.target.value})}
            placeholder="Contact number"
            required
          />
          <Input
            label="Email"
            type="email"
            value={formData.ownerEmail}
            onChange={(e) => setFormData({...formData, ownerEmail: e.target.value})}
            placeholder="Email address"
          />
        </div>
      </div>

      {/* Images Upload */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Property Images</h3>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="image-upload"
          />
          <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center">
            <ImageIcon className="h-12 w-12 text-gray-400 mb-2" />
            <span className="text-sm text-gray-600">Click to upload images</span>
            <span className="text-xs text-gray-500 mt-1">PNG, JPG up to 10MB</span>
          </label>
        </div>
        {formData.images.length > 0 && (
          <div className="grid grid-cols-4 gap-4">
            {formData.images.map((img, idx) => (
              <div key={idx} className="relative group">
                <img src={img} alt={`Property ${idx + 1}`} className="w-full h-24 object-cover rounded-lg" />
                <button
                  onClick={() => removeImage(idx)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Brochure Upload */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Property Brochure (PDF)</h3>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
          <input
            type="file"
            accept=".pdf"
            onChange={handleBrochureUpload}
            className="hidden"
            id="brochure-upload"
          />
          <label htmlFor="brochure-upload" className="cursor-pointer flex flex-col items-center">
            <FileText className="h-12 w-12 text-gray-400 mb-2" />
            <span className="text-sm text-gray-600">Click to upload PDF brochure</span>
            <span className="text-xs text-gray-500 mt-1">PDF up to 10MB</span>
          </label>
        </div>
        {formData.brochure && (
          <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-red-600" />
              <span className="text-sm text-gray-700">{formData.brochure.name}</span>
            </div>
            <button
              onClick={() => setFormData({...formData, brochure: null})}
              className="text-red-600 hover:text-red-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4 border-t">
        <Button onClick={onSubmit} className="flex-1">
          {isEdit ? 'Update Property' : 'Add Property'}
        </Button>
        <Button variant="outline" onClick={onCancel} className="flex-1">
          Cancel
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">All Properties</h1>
            <p className="text-gray-600 mt-1">Manage and browse all properties</p>
          </div>
          <Button icon={<Plus className="h-4 w-4" />} onClick={handleAddProperty}>
            Add Property
          </Button>
        </div>

        <Card>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              placeholder="Search properties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search className="h-5 w-5" />}
              className="md:col-span-2"
            />
            <Button variant="outline" icon={<Filter className="h-4 w-4" />}>
              Filters
            </Button>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <Card key={property.id} className="hover:shadow-lg transition-shadow">
              <div className="space-y-3">
                <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center overflow-hidden">
                  {property.images && property.images.length > 0 ? (
                    <img src={property.images[0]} alt={property.title} className="w-full h-full object-cover" />
                  ) : (
                    <Home className="h-16 w-16 text-blue-600" />
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{property.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                    <MapPin className="h-4 w-4" />
                    {property.location}
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant={property.status === 'Available' ? 'success' : 'default'}>
                    {property.status}
                  </Badge>
                  <Badge variant="info">{property.type}</Badge>
                  <Badge variant="warning">{property.listingType}</Badge>
                </div>
                <div className="pt-3 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-2xl font-bold text-blue-600">{formatPrice(property.price)}</p>
                      <p className="text-sm text-gray-600">{property.size} sq.ft</p>
                    </div>
                  </div>
                  {property.bedrooms && (
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Bed className="h-4 w-4" />
                        <span>{property.bedrooms} Beds</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Bath className="h-4 w-4" />
                        <span>{property.bathrooms} Baths</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Car className="h-4 w-4" />
                        <span>{property.parking} Parking</span>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    className="flex-1" 
                    icon={<Eye className="h-4 w-4" />} 
                    onClick={() => handleViewProperty(property)}
                  >
                    View
                  </Button>
                  <Button 
                    variant="outline" 
                    icon={<Edit className="h-4 w-4" />} 
                    onClick={() => handleEditProperty(property)}
                  />
                  <Button 
                    variant="outline" 
                    icon={<Trash2 className="h-4 w-4" />} 
                    onClick={() => handleDeleteProperty(property)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredProperties.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No properties found</p>
          </div>
        )}

        {/* Add Property Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full my-8">
              <div className="p-6 max-h-[85vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Add New Property</h2>
                  <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600">
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <PropertyForm onSubmit={handleSubmitAdd} onCancel={() => setShowAddModal(false)} />
              </div>
            </div>
          </div>
        )}

        {/* Edit Property Modal */}
        {showEditModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full my-8">
              <div className="p-6 max-h-[85vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Edit Property</h2>
                  <button onClick={() => setShowEditModal(false)} className="text-gray-400 hover:text-gray-600">
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <PropertyForm onSubmit={handleSubmitEdit} onCancel={() => setShowEditModal(false)} isEdit={true} />
              </div>
            </div>
          </div>
        )}

        {/* View Property Modal */}
        {showViewModal && selectedProperty && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full my-8">
              <div className="p-6 max-h-[85vh] overflow-y-auto">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900">{selectedProperty.title}</h2>
                    <button onClick={() => setShowViewModal(false)} className="text-gray-400 hover:text-gray-600">
                      <X className="h-6 w-6" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant={selectedProperty.status === 'Available' ? 'success' : 'default'}>
                      {selectedProperty.status}
                    </Badge>
                    <Badge variant="info">{selectedProperty.type}</Badge>
                    <Badge variant="warning">{selectedProperty.listingType}</Badge>
                  </div>

                  {/* Property Images */}
                  {selectedProperty.images && selectedProperty.images.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Property Images</h3>
                      <div className="grid grid-cols-3 gap-4">
                        {selectedProperty.images.map((img, idx) => (
                          <img key={idx} src={img} alt={`Property ${idx + 1}`} className="w-full h-32 object-cover rounded-lg" />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Description */}
                  {selectedProperty.description && (
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Description</h3>
                      <p className="text-gray-700">{selectedProperty.description}</p>
                    </div>
                  )}

                  {/* Property Details */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Property Details</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Price</p>
                        <p className="text-lg font-semibold text-blue-600 flex items-center gap-1">
                          <IndianRupee className="h-5 w-5" />
                          {formatPrice(selectedProperty.price)}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Size</p>
                        <p className="text-lg font-semibold text-gray-900">{selectedProperty.size} sq.ft</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Bedrooms</p>
                        <p className="text-lg font-semibold text-gray-900 flex items-center gap-1">
                          <Bed className="h-5 w-5" />
                          {selectedProperty.bedrooms} BHK
                        </p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Bathrooms</p>
                        <p className="text-lg font-semibold text-gray-900 flex items-center gap-1">
                          <Bath className="h-5 w-5" />
                          {selectedProperty.bathrooms}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Parking</p>
                        <p className="text-lg font-semibold text-gray-900 flex items-center gap-1">
                          <Car className="h-5 w-5" />
                          {selectedProperty.parking}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Balconies</p>
                        <p className="text-lg font-semibold text-gray-900">{selectedProperty.balconies}</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Furnishing</p>
                        <p className="text-lg font-semibold text-gray-900">{selectedProperty.furnishing}</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Facing</p>
                        <p className="text-lg font-semibold text-gray-900">{selectedProperty.facing}</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Floor</p>
                        <p className="text-lg font-semibold text-gray-900">{selectedProperty.floor} of {selectedProperty.totalFloors}</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Property Age</p>
                        <p className="text-lg font-semibold text-gray-900">{selectedProperty.ageOfProperty} Years</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Available From</p>
                        <p className="text-lg font-semibold text-gray-900 flex items-center gap-1">
                          <Calendar className="h-5 w-5" />
                          {selectedProperty.availableFrom}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Location */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Location</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-5 w-5 text-gray-400 mt-1" />
                        <div>
                          <p className="font-medium text-gray-900">{selectedProperty.location}</p>
                          <p className="text-sm text-gray-600 mt-1">{selectedProperty.address}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Amenities */}
                  {selectedProperty.amenities && selectedProperty.amenities.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Amenities</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProperty.amenities.map((amenity, idx) => (
                          <span key={idx} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Owner Details */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Owner Details</h3>
                    <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                      <div className="flex items-center gap-2">
                        <User className="h-5 w-5 text-gray-400" />
                        <span className="text-gray-900 font-medium">{selectedProperty.ownerName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-5 w-5 text-gray-400" />
                        <a href={`tel:${selectedProperty.ownerPhone}`} className="text-blue-600 hover:underline">
                          {selectedProperty.ownerPhone}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-5 w-5 text-gray-400" />
                        <a href={`mailto:${selectedProperty.ownerEmail}`} className="text-blue-600 hover:underline">
                          {selectedProperty.ownerEmail}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Brochure */}
                  {selectedProperty.brochure && (
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Property Brochure</h3>
                      <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="h-8 w-8 text-red-600" />
                          <div>
                            <p className="font-medium text-gray-900">{selectedProperty.brochure.name}</p>
                            <p className="text-sm text-gray-600">PDF Document</p>
                          </div>
                        </div>
                        <Button variant="outline" icon={<Upload className="h-4 w-4" />}>
                          Download
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4 border-t">
                    <Button variant="outline" onClick={() => setShowViewModal(false)} className="flex-1">
                      Close
                    </Button>
                    <Button onClick={() => {
                      setShowViewModal(false);
                      handleEditProperty(selectedProperty);
                    }} className="flex-1" icon={<Edit className="h-4 w-4" />}>
                      Edit Property
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProperties;