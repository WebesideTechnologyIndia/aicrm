import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Users, 
  Eye,
  MoreVertical,
  UserPlus
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Modal from '../../components/ui/Modal';
import Textarea from '../../components/ui/Textarea';
import Badge from '../../components/ui/Badge';
import toast from 'react-hot-toast';
import { teamsAPI } from '../../services/api';
import useAuthStore from '../../store/authStore';

const Teams = () => {
  const navigate = useNavigate();
  const { user: currentUser } = useAuthStore();
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [showActionMenu, setShowActionMenu] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      setLoading(true);
      const { data } = await teamsAPI.getAll();
      
      if (data.success) {
        setTeams(data.teams || []);
      }
    } catch (error) {
      console.error('Error fetching teams:', error);
      toast.error('Failed to fetch teams');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleAddTeam = async () => {
    if (!formData.name.trim()) {
      toast.error('Team name is required');
      return;
    }

    setActionLoading(true);
    try {
      const { data } = await teamsAPI.create(formData);
      
      if (data.success) {
        toast.success('Team created successfully!');
        setIsAddModalOpen(false);
        setFormData({ name: '', description: '' });
        fetchTeams();
      }
    } catch (error) {
      console.error('Error creating team:', error);
      toast.error(error.response?.data?.message || 'Failed to create team');
    } finally {
      setActionLoading(false);
    }
  };

  const handleEditTeam = async () => {
    if (!selectedTeam) return;

    if (!formData.name.trim()) {
      toast.error('Team name is required');
      return;
    }

    setActionLoading(true);
    try {
      const { data } = await teamsAPI.update(selectedTeam._id, formData);
      
      if (data.success) {
        toast.success('Team updated successfully!');
        setIsEditModalOpen(false);
        setSelectedTeam(null);
        setFormData({ name: '', description: '' });
        fetchTeams();
      }
    } catch (error) {
      console.error('Error updating team:', error);
      toast.error(error.response?.data?.message || 'Failed to update team');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteTeam = async (teamId) => {
    if (!window.confirm('Are you sure you want to delete this team?')) {
      return;
    }

    try {
      const { data } = await teamsAPI.delete(teamId);
      
      if (data.success) {
        toast.success('Team deleted successfully!');
        fetchTeams();
        setShowActionMenu(null);
      }
    } catch (error) {
      console.error('Error deleting team:', error);
      toast.error(error.response?.data?.message || 'Failed to delete team');
    }
  };

  const openEditModal = (team) => {
    setSelectedTeam(team);
    setFormData({
      name: team.name || '',
      description: team.description || '',
    });
    setIsEditModalOpen(true);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const filteredTeams = teams.filter(team =>
    team.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    team.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading teams...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Teams</h1>
          <p className="text-gray-600 mt-1">Manage your teams and members</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)} icon={<Plus className="h-4 w-4" />}>
          Create Team
        </Button>
      </div>

      {/* Search */}
      <Card>
        <Input
          placeholder="Search teams..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          icon={<Search className="h-5 w-5" />}
        />
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Total Teams</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{teams.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Total Members</p>
          <p className="text-2xl font-bold text-primary-600 mt-1">
            {teams.reduce((acc, team) => acc + (team.members?.length || 0), 0)}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Active Teams</p>
          <p className="text-2xl font-bold text-green-600 mt-1">{teams.length}</p>
        </div>
      </div>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeams.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">
              {searchQuery ? 'No teams found matching your search' : 'No teams available'}
            </p>
          </div>
        ) : (
          filteredTeams.map((team) => (
            <Card key={team._id} className="hover:shadow-lg transition-shadow">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{team.name}</h3>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                      {team.description || 'No description'}
                    </p>
                  </div>
                  <div className="relative ml-2">
                    <button
                      onClick={() => setShowActionMenu(showActionMenu === team._id ? null : team._id)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <MoreVertical className="h-4 w-4 text-gray-600" />
                    </button>
                    {showActionMenu === team._id && (
                      <>
                        <div 
                          className="fixed inset-0 z-10" 
                          onClick={() => setShowActionMenu(null)}
                        />
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
                          <button 
                            onClick={() => {
                              openEditModal(team);
                              setShowActionMenu(null);
                            }}
                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          >
                            <Edit className="h-4 w-4" />
                            Edit Team
                          </button>
                          <button 
                            onClick={() => {
                              navigate(`/teams/${team._id}/members`);
                              setShowActionMenu(null);
                            }}
                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          >
                            <UserPlus className="h-4 w-4" />
                            Add Members
                          </button>
                          <hr className="my-2" />
                          {currentUser?.role === 'Admin' && (
                            <button 
                              onClick={() => {
                                handleDeleteTeam(team._id);
                              }}
                              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                              Delete Team
                            </button>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="h-4 w-4" />
                    <span>{team.members?.length || 0} Members</span>
                  </div>
                  <Badge variant="success">Active</Badge>
                </div>

                <div className="text-xs text-gray-500">
                  Created by: {team.createdBy?.name || 'Unknown'}
                </div>

                <div className="text-xs text-gray-500">
                  Created: {formatDate(team.createdAt)}
                </div>

                <div className="flex gap-2 pt-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => openEditModal(team)}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => navigate(`/teams/${team._id}/members`)}
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    Members
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Add Team Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Create New Team"
      >
        <div className="space-y-4">
          <Input
            label="Team Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            placeholder="Enter team name"
          />
          <Textarea
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
            placeholder="Brief description of the team"
          />
        </div>
        <div className="flex gap-3 mt-6">
          <Button
            variant="outline"
            onClick={() => setIsAddModalOpen(false)}
            className="flex-1"
            disabled={actionLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleAddTeam}
            className="flex-1"
            loading={actionLoading}
          >
            Create Team
          </Button>
        </div>
      </Modal>

      {/* Edit Team Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Team"
      >
        <div className="space-y-4">
          <Input
            label="Team Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            placeholder="Enter team name"
          />
          <Textarea
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
            placeholder="Brief description of the team"
          />
        </div>
        <div className="flex gap-3 mt-6">
          <Button
            variant="outline"
            onClick={() => setIsEditModalOpen(false)}
            className="flex-1"
            disabled={actionLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleEditTeam}
            className="flex-1"
            loading={actionLoading}
          >
            Update Team
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Teams;