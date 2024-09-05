// // components/UpcomingSessions.js
// import { useState, useEffect } from 'react';
// import axios from 'axios';

// function UpcomingSessions({ user }) {
//   const [sessions, setSessions] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchUpcomingSessions = async () => {
//       setLoading(true);
//       setError('');
//       try {
//         const response = await axios.get(`http://localhost:5000/api/users/${user._id}/sessions`);
//         setSessions(response.data);
//       } catch (error) {
//         setError('Failed to load upcoming sessions. Please try again.');
//         console.error('Error fetching sessions:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUpcomingSessions();
//   }, [user._id]);

//   return (
//     <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
//       <h2 className="text-2xl font-bold mb-4">Your Upcoming Sessions</h2>
//       {loading ? (
//         <p>Loading...</p>
//       ) : error ? (
//         <p className="text-red-500">{error}</p>
//       ) : sessions.length > 0 ? (
//         <ul>
//           {sessions.map((session) => (
//             <li key={session._id} className="border-b border-gray-300 py-2">
//               <p><strong>Start:</strong> {new Date(session.start).toLocaleString()}</p>
//               <p><strong>End:</strong> {new Date(session.end).toLocaleString()}</p>
//               <p><strong>Type:</strong> {session.type}</p>
//               <p><strong>Attendees:</strong></p>
//               <ul>
//                 {session.attendees.map((attendee, index) => (
//                   <li key={index}>{attendee.name} ({attendee.email})</li>
//                 ))}
//               </ul>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>You have no upcoming sessions.</p>
//       )}
//     </div>
//   );
// }

// export default UpcomingSessions;
