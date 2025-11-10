import { useState } from 'react';
import { Plus, Search, Filter, MapPin, Home, DollarSign } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Badge from '../../components/ui/Badge';

const AllProperties = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const properties = [
    {
      id: 1,
      title: 'Luxury 3BHK Apartment',
      location: 'Dwarka, Delhi',
      type: 'Residential',
      price: '75L',
      size: '1500 sq.ft',
      status: 'Available',
      bedrooms: 3,
      bathrooms: 2,
    },
    {
      id: 2,
      title: 'Commercial Office Space',
      location: 'Cyber City, Gurgaon',
      type: 'Commercial',
      price: '1.2Cr',
      size: '2000 sq.ft',
      status: 'Available',
      bedrooms: null,
      bathrooms: null,
    },
    {
      id: 3,
      title: '4BHK Villa',
      location: 'Sector 54, Gurgaon',
      type: 'Residential',
      price: '2.5Cr',
      size: '3000 sq.ft',
      status: 'Sold',
      bedrooms: 4,
      bathrooms: 3,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">All Properties</h1>
          <p className="text-gray-600 mt-1">Browse available properties</p>
        </div>
        <Button icon={<Plus className="h-4 w-4" />}>Add Property</Button>
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
        {properties.map((property) => (
          <Card key={property.id} className="hover:shadow-lg transition-shadow">
            <div className="space-y-3">
              <div className="h-48 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg flex items-center justify-center">
                <Home className="h-16 w-16 text-primary-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{property.title}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                  <MapPin className="h-4 w-4" />
                  {property.location}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Badge variant={property.status === 'Available' ? 'success' : 'default'}>
                  {property.status}
                </Badge>
                <Badge variant="info">{property.type}</Badge>
              </div>
              <div className="pt-3 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-primary-600">₹{property.price}</p>
                    <p className="text-sm text-gray-600">{property.size}</p>
                  </div>
                  {property.bedrooms && (
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{property.bedrooms} BHK</p>
                      <p className="text-xs text-gray-600">{property.bathrooms} Baths</p>
                    </div>
                  )}
                </div>
              </div>
              <Button variant="outline" className="w-full">View Details</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AllProperties;