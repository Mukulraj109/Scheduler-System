import { useState, useEffect } from 'react';
import axios from 'axios';

function ScheduleSessionForm({ availability }) {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(true);
  const [sessionType, setSessionType] = useState('one-on-one');
  const [attendees, setAttendees] = useState([{ name: 'Admin', email: 'admin@example.com' }]);
  const [scheduledSessions, setScheduledSessions] = useState([]);

  // Fetch scheduled sessions
  useEffect(() => {
    const fetchScheduledSessions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/sessions');
        setScheduledSessions(response.data);
      } catch (error) {
        console.error('Error fetching scheduled sessions:', error);
      }
    };

    fetchScheduledSessions();
  }, []);

  // Adds a new attendee to the attendees list
  const handleAddAttendee = () => {
    setAttendees([...attendees, { name: '', email: '' }]);
  };

  // Handles changes to attendee details
  const handleAttendeeChange = (index, field, value) => {
    const newAttendees = [...attendees];
    newAttendees[index][field] = value;
    setAttendees(newAttendees);
  };

  // Handles scheduling of a session
  const handleSchedule = async () => {
    if (!selectedSlot) {
      alert('Please select a slot.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Create the request payload in the desired format
      const payload = {
        user: selectedSlot.user,  // user ID from selected slot
        start: `2024-09-05T${selectedSlot.start}:00Z`,  // Full ISO 8601 format
        end: `2024-09-05T${selectedSlot.end}:00Z`,    // Full ISO 8601 format
        attendees: attendees.map(attendee => ({
          name: attendee.name,
          email: attendee.email,
        })),
        type: sessionType,
      };

      console.log('Payload:', payload);

      await axios.post('http://localhost:5000/api/sessions', payload);
      setSuccess('Session scheduled successfully!');
      setSelectedSlot(null);  // Clear selection after successful scheduling
      setShowForm(false);     // Hide form after scheduling

      // Fetch the updated list of scheduled sessions
      const response = await axios.get('http://localhost:5000/api/sessions');
      setScheduledSessions(response.data);

    } catch (error) {
      setError('Failed to schedule session. Please try again.');
      console.error('Error scheduling session:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg mx-auto border border-gray-200">
      <h2 className="text-3xl font-bold mb-6 text-center">Schedule a Session</h2>

      {/* Display Scheduled Sessions */}
      <div className="mb-6">
        <h3 className="text-2xl font-semibold mb-4">
          Upcoming Scheduled Sessions ({scheduledSessions.length})
        </h3>
        {scheduledSessions.length > 0 ? (
          <ul className="space-y-4">
            {scheduledSessions.map((session) => (
              <li key={session._id} className="p-4 border rounded-lg shadow-sm">
                <p><strong>Start:</strong> {new Date(session.start).toLocaleString()}</p>
                <p><strong>End:</strong> {new Date(session.end).toLocaleString()}</p>
                <p><strong>Type:</strong> {session.type}</p>
                <p><strong>Attendees:</strong></p>
                <ul className="list-disc pl-5">
                  {session.attendees.map((attendee, index) => (
                    <li key={index}>{attendee.name} ({attendee.email})</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No scheduled sessions yet.</p>
        )}
      </div>

      {showForm && (
        <>
          {/* Slot selection dropdown */}
          <div className="mb-4">
            <label htmlFor="slot" className="block text-lg font-medium text-gray-700 mb-2">
              Select a Slot
            </label>
            <select
              id="slot"
              onChange={(e) => setSelectedSlot(JSON.parse(e.target.value))}
              className="block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a slot</option>
              {availability.map((slot) => (
                <option key={slot._id} value={JSON.stringify(slot)}>
                  {`${slot.day}, ${slot.start} - ${slot.end}`}
                </option>
              ))}
            </select>
          </div>

          {/* Session type selection */}
          <div className="mb-4">
            <label htmlFor="sessionType" className="block text-lg font-medium text-gray-700 mb-2">
              Session Type
            </label>
            <select
              id="sessionType"
              onChange={(e) => setSessionType(e.target.value)}
              value={sessionType}
              className="block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="one-on-one">One-on-One</option>
              <option value="group">Group</option>
            </select>
          </div>

          {/* Attendee input for group sessions */}
          {sessionType === 'group' && (
            <div className="mb-6">
              <h3 className="font-semibold text-lg mb-2">Attendees</h3>
              {attendees.map((attendee, index) => (
                <div key={index} className="flex mb-2 space-x-2">
                  <input
                    type="text"
                    placeholder="Name"
                    value={attendee.name}
                    onChange={(e) => handleAttendeeChange(index, 'name', e.target.value)}
                    className="block w-1/2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={attendee.email}
                    onChange={(e) => handleAttendeeChange(index, 'email', e.target.value)}
                    className="block w-1/2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}
              <button
                onClick={handleAddAttendee}
                className="text-blue-500 hover:underline"
              >
                + Add Attendee
              </button>
            </div>
          )}

          {/* Schedule session button */}
          <button
            onClick={handleSchedule}
            className={`w-full p-3 text-white font-semibold rounded-md ${!selectedSlot ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'} transition`}
            disabled={!selectedSlot || loading}
          >
            {loading ? 'Scheduling...' : 'Schedule Session'}
          </button>
        </>
      )}

      {/* Success and error messages */}
      {success && <p className="mt-4 text-green-500">{success}</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
}

export default ScheduleSessionForm;
