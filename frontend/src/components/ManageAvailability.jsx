import { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function ManageAvailability({ user }) {
  const [availability, setAvailability] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [day, setDay] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [duration, setDuration] = useState(30);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date()); // State for calendar date

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/availability/${user._id}`);
        setAvailability(response.data);
      } catch (error) {
        console.error('Error fetching availability:', error);
        setError('Failed to fetch availability.');
      }
    };

    fetchAvailability();
  }, [user._id]);

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();

    const data = { user: user._id, day, start, end, duration };

    try {
      if (selectedSlot) {
        await axios.put(`http://localhost:5000/api/availability/${selectedSlot._id}`, data);
        setSuccess('Availability updated successfully!');
      } else {
        await axios.post('http://localhost:5000/api/availability', data);
        setSuccess('Availability added successfully!');
      }

      const response = await axios.get(`http://localhost:5000/api/availability/${user._id}`);
      setAvailability(response.data);
      setShowForm(false);
      setSelectedSlot(null);
      setDay('');
      setStart('');
      setEnd('');
      setDuration(30);
    } catch (error) {
      console.error('Error adding/updating availability:', error);
      setError('Failed to add/update availability.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/availability/${id}`);
      setAvailability(availability.filter(slot => slot._id !== id));
      setSuccess('Availability deleted successfully!');
    } catch (error) {
      console.error('Error deleting availability:', error);
      setError('Failed to delete availability.');
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' }); // Get day of the week
    setDay(dayOfWeek);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Manage Availability</h2>

      {/* Calendar View */}
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        tileClassName={({ date, view }) => {
          const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
          const isAvailable = availability.some(slot => slot.day === dayOfWeek);
          return isAvailable ? 'bg-blue-200' : null;
        }}
      />

      {showForm && (
        <form onSubmit={handleAddOrUpdate}>
          <div className="mb-3">
            <label>Start Time:</label>
            <input
              type="time"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label>End Time:</label>
            <input
              type="time"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label>Duration (minutes):</label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="form-control"
              min="1"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full p-3 text-white font-semibold rounded-md bg-blue-500 hover:bg-blue-600 transition"
          >
            {selectedSlot ? 'Update Slot' : 'Add Slot'}
          </button>
        </form>
      )}

      <button
        onClick={() => setShowForm(!showForm)}
        className="w-full p-3 text-white font-semibold rounded-md bg-gray-500 hover:bg-gray-600 transition mt-4"
      >
        {showForm ? 'Cancel' : 'Add Availability Slot'}
      </button>

      {availability.length > 0 && (
        <ul className="mt-4">
          {availability.map((slot) => (
            <li key={slot._id} className="mb-2 flex items-center justify-between">
              <div>{`${slot.day}, ${slot.start} - ${slot.end}`}</div>
              <div>
                <button
                  onClick={() => {
                    setSelectedSlot(slot);
                    setDay(slot.day);
                    setStart(slot.start);
                    setEnd(slot.end);
                    setDuration(slot.duration);
                    setShowForm(true);
                  }}
                  className="text-blue-500 hover:underline mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(slot._id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {success && <p className="mt-4 text-green-500">{success}</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
}

export default ManageAvailability;
