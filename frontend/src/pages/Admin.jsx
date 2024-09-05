import { useState, useEffect } from 'react';
import axios from 'axios';
import ScheduleSessionForm from '../components/SessionForm';

function Admin() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [availability, setAvailability] = useState([]);
  const [error, setError] = useState('');
  const [showUserForm, setShowUserForm] = useState(true);

  // Fetch users when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users');
        setUsers(response.data);
      } catch (error) {
        setError('Failed to fetch users.');
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  // Fetch availability for the selected user
  const fetchAvailability = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/availability/${userId}`);
      setAvailability(response.data);
      setShowUserForm(false);
    } catch (error) {
      setError('Failed to fetch availability.');
      console.error('Error fetching availability:', error);
    }
  };

  const handleUserChange = (event) => {
    const selectedIndex = event.target.value;
    setSelectedUser(selectedIndex >= 0 ? users[selectedIndex] : null);
  };

  const handleViewAvailability = () => {
    if (selectedUser) {
      fetchAvailability(selectedUser._id);
    }
  };

  const handleScheduleSession = () => {
    setAvailability([]);
    setSelectedUser(null);
    setShowUserForm(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 sm:p-12">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

      <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg mx-auto">
        {showUserForm && (
          <>
            <label htmlFor="userSelect" className="block text-lg font-medium text-gray-700 mb-2">
              Select User
            </label>
            <select
              id="userSelect"
              className="block w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleUserChange}
              value={users.indexOf(selectedUser)}
            >
              <option value="">Select User</option>
              {users.length > 0 ? (
                users.map((user, index) => (
                  <option key={user._id} value={index}>
                    {user.email}
                  </option>
                ))
              ) : (
                <option value="">No users available</option>
              )}
            </select>
          </>
        )}

        {showUserForm && (
          <button
            className={`w-full p-3 text-white font-semibold rounded-md ${!selectedUser ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'} transition`}
            onClick={handleViewAvailability}
            disabled={!selectedUser}
          >
            View Availability
          </button>
        )}

        {error && <p className="mt-4 text-red-500">{error}</p>}
      </div>

      {availability.length > 0 && !showUserForm && (
        <div className="mt-6 bg-white shadow-lg rounded-lg p-6 max-w-lg mx-auto">
          <ScheduleSessionForm
            availability={availability}
            onScheduleSuccess={handleScheduleSession}
          />
        </div>
      )}
    </div>
  );
}

export default Admin;
