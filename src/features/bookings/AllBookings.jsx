import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Filter, Receipt } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Badge from '../../components/ui/Badge';
import { formatDate, formatCurrency } from '../../utils/format';

const AllBookings = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const bookings = [
    {
      id: 1,
      bookingId: 'BK-2025-001',
      clientName: 'Rajesh Kumar',
      property: 'Luxury Villa - Gurgaon',
      unitNumber: 'A-101',
      price: 5000000,
      bookingAmount: 500000,
      status: 'Confirmed',
      bookingDate: '2025-11-08',
      possession: '2026-12-31',
    },
    {
      id: 2,
      bookingId: 'BK-2025-002',
      clientName: 'Priya Sharma',
      property: 'Commercial Hub - Noida',
      unitNumber: 'B-204',
      price: 8000000,
      bookingAmount: 800000,
      status: 'Pending',
      bookingDate: '2025-11-07',
      possession: '2025-06-30',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">All Bookings</h1>
          <p className="text-gray-600 mt-1">Manage property bookings and payments</p>
        </div>
        <Button onClick={() => navigate('/bookings/add')} icon={<Plus className="h-4 w-4" />}>
          Add Booking
        </Button>
      </div>

      <Card>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            placeholder="Search bookings..."
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

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border">
          <p className="text-sm text-gray-600">Total Bookings</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{bookings.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <p className="text-sm text-gray-600">Confirmed</p>
          <p className="text-2xl font-bold text-green-600 mt-1">
            {bookings.filter(b => b.status === 'Confirmed').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <p className="text-sm text-gray-600">Pending</p>
          <p className="text-2xl font-bold text-orange-600 mt-1">
            {bookings.filter(b => b.status === 'Pending').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <p className="text-sm text-gray-600">This Month</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">8</p>
        </div>
      </div>

      <div className="space-y-4">
        {bookings.map((booking) => (
          <Card key={booking.id} className="hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center">
                  <Receipt className="h-6 w-6 text-primary-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{booking.bookingId}</h3>
                    <Badge variant={booking.status === 'Confirmed' ? 'success' : 'warning'}>
                      {booking.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-xs text-gray-600">Client</p>
                      <p className="text-sm font-medium text-gray-900">{booking.clientName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Property</p>
                      <p className="text-sm font-medium text-gray-900">{booking.property}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Unit</p>
                      <p className="text-sm font-medium text-gray-900">{booking.unitNumber}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Total Price</p>
                      <p className="text-sm font-medium text-primary-600">{formatCurrency(booking.price)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 mt-3 text-xs text-gray-600">
                    <span>Booking: {formatDate(booking.bookingDate)}</span>
                    <span>Possession: {formatDate(booking.possession)}</span>
                    <span>Paid: {formatCurrency(booking.bookingAmount)}</span>
                  </div>
                </div>
              </div>
              <Button size="sm" variant="outline">View Details</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AllBookings;