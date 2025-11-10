import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Upload, X, FileText, Image as ImageIcon } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Textarea from '../../components/ui/Textarea';
import toast from 'react-hot-toast';

const AddEditProject = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    developer: '',
    location: '',
    city: '',
    state: '',
    propertyType: '',
    totalUnits: '',
    availableUnits: '',
    minPrice: '',
    maxPrice: '',
    possession: '',
    description: '',
    amenities: '',
    highlights: '',
    specifications: '',
  });

  const [uploadedImages, setUploadedImages] = useState([]);
  const [uploadedPDFs, setUploadedPDFs] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
      preview: URL.createObjectURL(file),
    }));
    setUploadedImages(prev => [...prev, ...newImages]);
    toast.success(`${files.length} image(s) uploaded`);
  };

  const handlePDFUpload = (e) => {
    const files = Array.from(e.target.files);
    const newPDFs = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
    }));
    setUploadedPDFs(prev => [...prev, ...newPDFs]);
    toast.success(`${files.length} PDF(s) uploaded`);
  };

  const removeImage = (id) => {
    setUploadedImages(prev => prev.filter(img => img.id !== id));
  };

  const removePDF = (id) => {
    setUploadedPDFs(prev => prev.filter(pdf => pdf.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success(isEdit ? 'Project updated!' : 'Project created!');
      navigate('/projects');
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const propertyTypeOptions = [
    { value: 'Residential', label: 'Residential' },
    { value: 'Commercial', label: 'Commercial' },
    { value: 'Plot', label: 'Plot' },
    { value: 'Farmland', label: 'Farmland' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/projects')} className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {isEdit ? 'Edit Project' : 'Add New Project'}
            </h1>
            <p className="text-gray-600 mt-1">Fill in all project details</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* Basic Information */}
          <Card title="Basic Information">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Project Name" name="name" value={formData.name} onChange={handleChange} required />
              <Input label="Developer" name="developer" value={formData.developer} onChange={handleChange} required />
              <Input label="Location" name="location" value={formData.location} onChange={handleChange} required />
              <Input label="City" name="city" value={formData.city} onChange={handleChange} required />
              <Input label="State" name="state" value={formData.state} onChange={handleChange} required />
              <Select label="Property Type" name="propertyType" value={formData.propertyType} onChange={handleChange} options={propertyTypeOptions} required />
            </div>
          </Card>

          {/* Units & Pricing */}
          <Card title="Units & Pricing">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Total Units" type="number" name="totalUnits" value={formData.totalUnits} onChange={handleChange} required />
              <Input label="Available Units" type="number" name="availableUnits" value={formData.availableUnits} onChange={handleChange} required />
              <Input label="Min Price (₹)" type="number" name="minPrice" value={formData.minPrice} onChange={handleChange} placeholder="e.g., 2500000" required />
              <Input label="Max Price (₹)" type="number" name="maxPrice" value={formData.maxPrice} onChange={handleChange} placeholder="e.g., 5000000" required />
              <Input label="Possession Date" type="date" name="possession" value={formData.possession} onChange={handleChange} required />
            </div>
          </Card>

          {/* Content Details */}
          <Card title="Project Content">
            <div className="space-y-4">
              <Textarea label="Description" name="description" value={formData.description} onChange={handleChange} rows={4} placeholder="Detailed project description..." />
              <Textarea label="Amenities" name="amenities" value={formData.amenities} onChange={handleChange} rows={3} placeholder="Swimming Pool, Gym, Club House (comma separated)" />
              <Textarea label="Key Highlights" name="highlights" value={formData.highlights} onChange={handleChange} rows={3} placeholder="Prime location, Modern architecture..." />
              <Textarea label="Specifications" name="specifications" value={formData.specifications} onChange={handleChange} rows={3} placeholder="Floor area, configuration details..." />
            </div>
          </Card>

          {/* Image Upload */}
          <Card title="Project Images">
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary-500 transition-colors">
                <label className="cursor-pointer">
                  <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-700 font-medium">Upload Project Images</p>
                  <p className="text-sm text-gray-500 mt-1">JPG, PNG (Max 5MB each)</p>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {uploadedImages.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {uploadedImages.map((image) => (
                    <div key={image.id} className="relative group">
                      <img
                        src={image.preview}
                        alt={image.name}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(image.id)}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-4 w-4" />
                      </button>
                      <p className="text-xs text-gray-600 mt-1 truncate">{image.name}</p>
                      <p className="text-xs text-gray-500">{image.size}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card>

          {/* PDF Upload */}
          <Card title="Brochures & Documents">
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary-500 transition-colors">
                <label className="cursor-pointer">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-700 font-medium">Upload PDFs</p>
                  <p className="text-sm text-gray-500 mt-1">PDF files (Max 10MB each)</p>
                  <input
                    type="file"
                    multiple
                    accept=".pdf"
                    onChange={handlePDFUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {uploadedPDFs.length > 0 && (
                <div className="space-y-2">
                  {uploadedPDFs.map((pdf) => (
                    <div key={pdf.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-red-500" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{pdf.name}</p>
                          <p className="text-xs text-gray-500">{pdf.size}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removePDF(pdf.id)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card>

          {/* Actions */}
          <div className="flex items-center gap-3 justify-end">
            <Button type="button" variant="outline" onClick={() => navigate('/projects')}>
              Cancel
            </Button>
            <Button type="submit" loading={loading} icon={<Save className="h-4 w-4" />}>
              {isEdit ? 'Update Project' : 'Create Project'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddEditProject;