import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft, 
  Save, 
  UserPlus, 
  Users, 
  X,
  Search,
  Check
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Badge from '../../components/ui/Badge';
import toast from 'react-hot-toast';
import { teamsAPI, usersAPI } from '../../services/api';

const AddTeamMembers = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [team, setTeam] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    if (id) {
      fetchTeamAndUsers();
    }
  }, [id]);

  const fetchTeamAndUsers = async () => {
    try {
      setFetchingData(true);
      
      // Fetch team details
      const teamResponse = await teamsAPI.getById(id);
      if (teamResponse.data.success) {
        const teamData = teamResponse.data.team;
        setTeam(teamData);
        setTeamMembers(teamData.members || []);
      }

      // Fetch all users
      const usersResponse = await usersAPI.getAll();
      if (usersResponse.data.success) {
        setAllUsers(usersResponse.data.users || []);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load team data');
      navigate('/teams');
    } finally {
      setFetchingData(false);
    }
  };

  const handleUserToggle = (userId) => {
    setSelectedUsers(prev => {
      if (prev.includes(userId)) {
        return prev.filter(id => id !== userId);
      } else {
        return [...prev, userId];
      }
    });
  };

  const isUserInTeam = (userId) => {
    return teamMembers.some(member => member._id === userId || member === userId);
  };

  const handleAddMembers = async () => {
    if (selectedUsers.length === 0) {
      toast.error('Please select at least one user to add');
      return;
    }

    setLoading(true);
    try {
      // Add each selected user to the team
      const promises = selectedUsers.map(userId => 
        teamsAPI.addMember(id, userId)
      );
      
      await Promise.all(promises);
      
      toast.success(`${selectedUsers.length} member(s) added successfully!`);
      navigate('/teams');
    } catch (error) {
      console.error('Error adding members:', error);
      toast.error(error.response?.data?.message || 'Failed to add members');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveMember = async (userId) => {
    if (!window.confirm('Are you sure you want to remove this member from the team?')) {
      return;
    }

    try {
      await teamsAPI.removeMember(id, userId);
      toast.success('Member removed successfully!');
      fetchTeamAndUsers(); // Refresh data
    } catch (error) {
      console.error('Error removing member:', error);
      toast.error(error.response?.data?.message || 'Failed to remove member');
    }
  };

  const getRoleBadgeColor = (role) => {
    const colors = {
      'Admin': 'error',
      'Manager': 'warning',
      'Sales': 'success',
      'Support': 'info',
    };
    return colors[role] || 'default';
  };

  // Filter available users (not already in team)
  const availableUsers = allUsers.filter(user => {
    const notInTeam = !isUserInTeam(user._id);
    const matchesSearch = searchQuery === '' || 
      user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role?.toLowerCase().includes(searchQuery.toLowerCase());
    return notInTeam && matchesSearch;
  });

  // Get current team members with full details
  const currentMembers = allUsers.filter(user => isUserInTeam(user._id));

  if (fetchingData) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading team data...</p>
        </div>
      </div>
    );
  }

  if (!team) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Team not found</p>
        <Button onClick={() => navigate('/teams')} className="mt-4">
          Back to Teams
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate('/teams')} 
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">Manage Team Members</h1>
          <p className="text-gray-600 mt-1">{team.name}</p>
        </div>
      </div>

      {/* Team Info Card */}
      <Card>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{team.name}</h3>
            <p className="text-sm text-gray-600 mt-1">{team.description || 'No description'}</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Users className="h-5 w-5" />
            <span className="font-medium">{currentMembers.length} Members</span>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Members */}
        <Card title="Current Members">
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {currentMembers.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p>No members in this team yet</p>
              </div>
            ) : (
              currentMembers.map((member) => (
                <div 
                  key={member._id} 
                  className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                      <span className="text-sm font-semibold text-primary-600">
                        {member.name?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{member.name}</p>
                      <p className="text-sm text-gray-600">{member.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={getRoleBadgeColor(member.role)}>
                      {member.role}
                    </Badge>
                    <button
                      onClick={() => handleRemoveMember(member._id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Remove member"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>

        {/* Add New Members */}
        <Card title="Add New Members">
          <div className="space-y-4">
            {/* Search */}
            <Input
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search className="h-5 w-5" />}
            />

            {/* Selected Count */}
            {selectedUsers.length > 0 && (
              <div className="flex items-center justify-between p-3 bg-primary-50 rounded-lg">
                <span className="text-sm font-medium text-primary-900">
                  {selectedUsers.length} user(s) selected
                </span>
                <button
                  onClick={() => setSelectedUsers([])}
                  className="text-sm text-primary-600 hover:text-primary-700"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Available Users List */}
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {availableUsers.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <UserPlus className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p>
                    {searchQuery 
                      ? 'No users found matching your search' 
                      : 'All users are already in this team'
                    }
                  </p>
                </div>
              ) : (
                availableUsers.map((user) => (
                  <label
                    key={user._id}
                    className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors ${
                      selectedUsers.includes(user._id)
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user._id)}
                        onChange={() => handleUserToggle(user._id)}
                        className="w-4 h-4 text-primary-600 rounded focus:ring-2 focus:ring-primary-500"
                      />
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                        <span className="text-xs font-semibold text-gray-600">
                          {user.name?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{user.name}</p>
                        <p className="text-xs text-gray-600">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={getRoleBadgeColor(user.role)} className="text-xs">
                        {user.role}
                      </Badge>
                      {selectedUsers.includes(user._id) && (
                        <Check className="h-4 w-4 text-primary-600" />
                      )}
                    </div>
                  </label>
                ))
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => navigate('/teams')}
                className="flex-1"
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddMembers}
                className="flex-1"
                loading={loading}
                disabled={selectedUsers.length === 0}
                icon={<UserPlus className="h-4 w-4" />}
              >
                Add {selectedUsers.length > 0 ? `(${selectedUsers.length})` : 'Members'}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AddTeamMembers;