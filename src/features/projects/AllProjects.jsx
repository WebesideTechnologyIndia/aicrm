import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Filter,
  Building2,
  MapPin,
  Home,
  FileText,
  Image as ImageIcon,
  Download,
  Eye,
  Edit,
  Trash2,
  MoreVertical
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Badge from '../../components/ui/Badge';
import { formatDate } from '../../utils/format';

const AllProjects = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showActionMenu, setShowActionMenu] = useState(null);

  // Mock data
  const projects = [
    {
      id: 1,
      name: 'Luxury Villas - Gurgaon',
      developer: 'DLF Limited',
      location: 'Sector 54, Gurgaon',
      propertyType: 'Residential',
      totalUnits: 120,
      availableUnits: 45,
      priceRange: '2.5Cr - 5Cr',
      possession: '2026-12-31',
      status: 'active',
      amenities: ['Swimming Pool', 'Gym', 'Club House', 'Garden'],
      images: 5,
      brochures: 3,
      createdAt: '2024-10-15',
    },
    {
      id: 2,
      name: 'Commercial Hub - Noida',
      developer: 'Godrej Properties',
      location: 'Sector 62, Noida',
      propertyType: 'Commercial',
      totalUnits: 80,
      availableUnits: 28,
      priceRange: '80L - 1.5Cr',
      possession: '2025-06-30',
      status: 'active',
      amenities: ['24/7 Security', 'Power Backup', 'Parking'],
      images: 8,
      brochures: 2,
      createdAt: '2024-09-20',
    },
    {
      id: 3,
      name: 'Green Valley Plots',
      developer: 'Unitech Group',
      location: 'South Delhi',
      propertyType: 'Plot',
      totalUnits: 50,
      availableUnits: 12,
      priceRange: '1Cr - 2Cr',
      possession: '2025-03-31',
      status: 'sold-out',
      amenities: ['Gated Community', 'Park', 'Water Supply'],
      images: 4,
      brochures: 1,
      createdAt: '2024-08-10',
    },
  ];

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.developer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
          <p className="text-gray-600 mt-1">Manage project details, brochures, and media</p>
        </div>
        <Button onClick={() => navigate('/projects/add')} icon={<Plus className="h-4 w-4" />}>
          Add Project
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<Search className="h-5 w-5" />}
            className="md:col-span-2"
          />
          <Button variant="outline" icon={<Filter className="h-4 w-4" />} className="w-full">
            More Filters
          </Button>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Total Projects</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{projects.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Active</p>
          <p className="text-2xl font-bold text-green-600 mt-1">
            {projects.filter(p => p.status === 'active').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Total Units</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">
            {projects.reduce((sum, p) => sum + p.totalUnits, 0)}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Available Units</p>
          <p className="text-2xl font-bold text-purple-600 mt-1">
            {projects.reduce((sum, p) => sum + p.availableUnits, 0)}
          </p>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="hover:shadow-lg transition-shadow">
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                    <p className="text-sm text-gray-600">{project.developer}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={project.status === 'active' ? 'success' : 'default'}>
                    {project.status === 'active' ? 'Active' : 'Sold Out'}
                  </Badge>
                  <div className="relative">
                    <button
                      onClick={() => setShowActionMenu(showActionMenu === project.id ? null : project.id)}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </button>
                    {showActionMenu === project.id && (
                      <>
                        <div className="fixed inset-0 z-10" onClick={() => setShowActionMenu(null)} />
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-2 z-20">
                          <button
                            onClick={() => navigate(`/projects/${project.id}`)}
                            className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50"
                          >
                            <Eye className="h-4 w-4" />
                            View Details
                          </button>
                          <button
                            onClick={() => navigate(`/projects/edit/${project.id}`)}
                            className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50"
                          >
                            <Edit className="h-4 w-4" />
                            Edit Project
                          </button>
                          <hr className="my-2" />
                          <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                            <Trash2 className="h-4 w-4" />
                            Delete
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  {project.location}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Home className="h-4 w-4 text-gray-400" />
                  {project.propertyType}
                </div>
              </div>

              {/* Price & Units */}
              <div className="grid grid-cols-3 gap-4 py-3 border-y border-gray-200">
                <div>
                  <p className="text-xs text-gray-600">Price Range</p>
                  <p className="text-sm font-semibold text-gray-900 mt-1">₹{project.priceRange}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Total Units</p>
                  <p className="text-sm font-semibold text-gray-900 mt-1">{project.totalUnits}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Available</p>
                  <p className="text-sm font-semibold text-green-600 mt-1">{project.availableUnits}</p>
                </div>
              </div>

              {/* Amenities */}
              <div>
                <p className="text-xs text-gray-600 mb-2">Amenities:</p>
                <div className="flex flex-wrap gap-2">
                  {project.amenities.slice(0, 3).map((amenity, idx) => (
                    <Badge key={idx} variant="info" size="sm">{amenity}</Badge>
                  ))}
                  {project.amenities.length > 3 && (
                    <Badge variant="default" size="sm">+{project.amenities.length - 3} more</Badge>
                  )}
                </div>
              </div>

              {/* Media & Actions */}
              <div className="flex items-center justify-between pt-3">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <ImageIcon className="h-4 w-4" />
                    <span>{project.images} Images</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FileText className="h-4 w-4" />
                    <span>{project.brochures} PDFs</span>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  icon={<Download className="h-3 w-3" />}
                >
                  Download
                </Button>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Possession: {formatDate(project.possession)}</span>
                <span>Added {formatDate(project.createdAt)}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AllProjects;