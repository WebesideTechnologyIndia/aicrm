import { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter,
  Calendar,
  Clock,
  User,
  CheckCircle,
  AlertCircle,
  XCircle
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import Textarea from '../../components/ui/Textarea';
import { formatDate, formatRelativeTime } from '../../utils/format';
import toast from 'react-hot-toast';

const TasksPage = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: '',
    assignedTo: '',
    relatedTo: '',
    relatedId: '',
  });

  // Mock data
  const tasks = [
    {
      id: 1,
      title: 'Follow up with Rajesh Kumar',
      description: 'Discuss property requirements and schedule site visit',
      priority: 'high',
      status: 'pending',
      dueDate: '2025-11-09',
      assignedTo: 'Sales Team A',
      relatedTo: 'Lead',
      relatedName: 'Rajesh Kumar',
      createdAt: '2025-11-08T10:00:00',
    },
    {
      id: 2,
      title: 'Send property brochure to Priya',
      description: 'Email luxury villa brochures and pricing',
      priority: 'medium',
      status: 'in-progress',
      dueDate: '2025-11-08',
      assignedTo: 'Sales Team B',
      relatedTo: 'Lead',
      relatedName: 'Priya Sharma',
      createdAt: '2025-11-07T14:30:00',
    },
    {
      id: 3,
      title: 'Prepare documentation for booking',
      description: 'Complete all paperwork for Unit #A-101',
      priority: 'high',
      status: 'pending',
      dueDate: '2025-11-10',
      assignedTo: 'Manager',
      relatedTo: 'Booking',
      relatedName: 'Booking #1234',
      createdAt: '2025-11-08T09:00:00',
    },
    {
      id: 4,
      title: 'Site visit scheduled',
      description: 'Show Dwarka property to client',
      priority: 'medium',
      status: 'completed',
      dueDate: '2025-11-07',
      assignedTo: 'Sales Team A',
      relatedTo: 'Lead',
      relatedName: 'Amit Patel',
      createdAt: '2025-11-06T11:00:00',
    },
    {
      id: 5,
      title: 'Payment follow-up',
      description: 'Remind client about pending installment',
      priority: 'high',
      status: 'pending',
      dueDate: '2025-11-09',
      assignedTo: 'Manager',
      relatedTo: 'Booking',
      relatedName: 'Booking #5678',
      createdAt: '2025-11-08T15:00:00',
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Task created successfully!');
    setShowAddModal(false);
    setFormData({
      title: '',
      description: '',
      priority: 'medium',
      dueDate: '',
      assignedTo: '',
      relatedTo: '',
      relatedId: '',
    });
  };

  const getPriorityColor = (priority) => {
    const colors = {
      low: 'default',
      medium: 'warning',
      high: 'danger',
    };
    return colors[priority] || 'default';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'in-progress':
        return <Clock className="h-5 w-5 text-blue-600" />;
      case 'pending':
        return <AlertCircle className="h-5 w-5 text-orange-600" />;
      default:
        return <XCircle className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'warning',
      'in-progress': 'info',
      completed: 'success',
    };
    return colors[status] || 'default';
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = selectedPriority === 'all' || task.priority === selectedPriority;
    const matchesStatus = selectedStatus === 'all' || task.status === selectedStatus;
    return matchesSearch && matchesPriority && matchesStatus;
  });

  const priorityOptions = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
  ];

  const assignOptions = [
    { value: 'sales-a', label: 'Sales Team A' },
    { value: 'sales-b', label: 'Sales Team B' },
    { value: 'manager', label: 'Manager' },
  ];

  const relatedToOptions = [
    { value: 'Lead', label: 'Lead' },
    { value: 'Client', label: 'Client' },
    { value: 'Booking', label: 'Booking' },
    { value: 'Partner', label: 'Channel Partner' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tasks & Reminders</h1>
          <p className="text-gray-600 mt-1">Manage all your tasks and follow-ups</p>
        </div>
        <Button onClick={() => setShowAddModal(true)} icon={<Plus className="h-4 w-4" />}>
          Add Task
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Input
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<Search className="h-5 w-5" />}
          />
          <div className="flex gap-2">
            <button
              onClick={() => selectedPriority === 'all' ? null : setSelectedPriority('all')}
              className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium ${
                selectedPriority === 'all' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setSelectedPriority('high')}
              className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium ${
                selectedPriority === 'high' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              High
            </button>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedStatus('pending')}
              className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium ${
                selectedStatus === 'pending' ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setSelectedStatus('completed')}
              className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium ${
                selectedStatus === 'completed' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              Done
            </button>
          </div>
          <Button variant="outline" icon={<Filter className="h-4 w-4" />}>
            More Filters
          </Button>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Total Tasks</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{tasks.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Pending</p>
          <p className="text-2xl font-bold text-orange-600 mt-1">
            {tasks.filter(t => t.status === 'pending').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">In Progress</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">
            {tasks.filter(t => t.status === 'in-progress').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Completed</p>
          <p className="text-2xl font-bold text-green-600 mt-1">
            {tasks.filter(t => t.status === 'completed').length}
          </p>
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        {filteredTasks.map((task) => (
          <Card key={task.id} className="hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <div className="mt-1">{getStatusIcon(task.status)}</div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={getPriorityColor(task.priority)}>
                      {task.priority}
                    </Badge>
                    <Badge variant={getStatusColor(task.status)}>
                      {task.status}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span>Due: {formatDate(task.dueDate)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <User className="h-4 w-4 text-gray-400" />
                    <span>{task.assignedTo}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="text-gray-400">🔗</span>
                    <span>{task.relatedTo}: {task.relatedName}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="h-4 w-4" />
                    <span>{formatRelativeTime(task.createdAt)}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Add Task Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Task"
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Task Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <Textarea
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              options={priorityOptions}
            />
            <Input
              label="Due Date"
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              required
            />
            <Select
              label="Assign To"
              name="assignedTo"
              value={formData.assignedTo}
              onChange={handleChange}
              options={assignOptions}
            />
            <Select
              label="Related To"
              name="relatedTo"
              value={formData.relatedTo}
              onChange={handleChange}
              options={relatedToOptions}
            />
          </div>

          <div className="flex items-center gap-3 justify-end pt-4">
            <Button type="button" variant="outline" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Task</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default TasksPage;