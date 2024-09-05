import { useState } from 'react';
import axios from 'axios';
import ManageAvailability from '../components/ManageAvailability';
// import UpcomingSessions from '../components/UpcomingSessions'; // Import the new component

function Home() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loginUser = async (email) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', { email });
      setUser(response.data);
      setEmail(''); // Clear the email input field after successful login
    } catch (error) {
      setError('Failed to login. Please try again.');
      console.error('Error logging in:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    if (email) {
      loginUser(email);
    } else {
      alert('Please enter an email address.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Availability Scheduler</h1>
      {!user ? (
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleLogin}
            className={`w-full p-3 text-white font-semibold rounded-md ${loading ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'} transition`}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
          {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
        </div>
      ) : (
        <>
          <ManageAvailability user={user} />
          {/* <UpcomingSessions user={user} /> */}
        </>
      )}
    </div>
  );
}

export default Home;
