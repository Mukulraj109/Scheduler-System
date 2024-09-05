
# Scheduler System

## Overview

This repository contains a scheduling system with features for managing and scheduling sessions. Users can log in, view their upcoming sessions, and schedule new sessions with multiple attendees. The backend is built with Node.js and Express, while the frontend is implemented with React.

## System Architecture

### Backend

- **Technology Stack:**
  - Node.js
  - Express.js
  - MongoDB (via Mongoose)
  - Axios (for HTTP requests)

- **Architecture:**

  **Route Architecture**

  **1. User Routes (/api/users)**
  - **POST /api/users/login**
    - **Description:** Log in or register a user. If the user does not exist, a new user is created with a default password.
    - **Request Body:** \`{ "email": "user@example.com" }\`
    - **Response:** User object including \`_id\`, \`email\`, and \`password\`.

  - **GET /api/users**
    - **Description:** Retrieve all users. This route is typically used by an admin to get a list of all registered users.
    - **Response:** Array of user objects.

  - **GET /api/users/:userId/sessions**
    - **Description:** Get all future sessions for a specific user, where the user is either the primary user or an attendee.
    - **Response:** Array of session objects.

  **2. Availability Routes (/api/availability)**
  - **POST /api/availability**
    - **Description:** Add a new availability slot for a user.
    - **Request Body:** \`{ "user": "userId", "day": "Monday", "start": "09:00", "end": "17:00", "duration": "60" }\`
    - **Response:** Created availability object.

  - **GET /api/availability/:userId**
    - **Description:** Get all availability slots for a specific user.
    - **Response:** Array of availability objects.

  - **PUT /api/availability/:id**
    - **Description:** Update an existing availability slot by its ID.
    - **Request Body:** \`{ "day": "Tuesday", "start": "10:00", "end": "16:00", "duration": "60" }\`
    - **Response:** Updated availability object.

  - **DELETE /api/availability/:id**
    - **Description:** Delete an availability slot by its ID.
    - **Response:** Status code 204 (No Content) if successful.

  **3. Session Routes (/api/sessions)**
  - **POST /api/sessions**
    - **Description:** Schedule a new session.
    - **Request Body:** \`{ "user": "userId", "start": "2024-09-05T10:00:00Z", "end": "2024-09-05T11:00:00Z", "attendees": [{ "name": "John Doe", "email": "john@example.com" }], "type": "one-on-one" }\`
    - **Response:** Created session object.

  - **GET /api/sessions**
    - **Description:** Get all sessions.
    - **Response:** Array of session objects.

  - **GET /api/sessions/user/:userId**
    - **Description:** Get all sessions where the user is either the primary user or an attendee.
    - **Response:** Array of session objects.

- **Models:**
  - **Session:** Represents a scheduled session, including user ID, start and end times, attendees, and session type.
  - **User:** Represents a user with an email and other relevant details.
  - **Availability:** Represents the availability of a user.

### Frontend

- **Technology Stack:**
  - React.js
  - Tailwind CSS
  - Axios (for HTTP requests)
  - Vite (for development server and build tool)

- **Components:**
  - **Home:** Allows user login and displays the \`ManageAvailability\` component upon successful login.
  - **ManageAvailability:** Manages user availability and displays scheduled sessions.

## Design Choices

- **Session Schema:**
  - The session schema includes \`user\`, \`start\`, \`end\`, \`attendees\`, and \`type\`.
  - Uses ISO 8601 format for date-time fields to ensure consistency and compatibility.

- **User Authentication:**
  - Users are identified by their email, and sessions can be filtered based on user email or user ID.

- **Frontend State Management:**
  - Uses React’s \`useState\` and \`useEffect\` for managing component state and side effects.
  - Axios is used for API requests to handle asynchronous data fetching and posting.

## Setup and Run Instructions

### Prerequisites

- Node.js (>=14.x)
- MongoDB (ensure MongoDB is running locally or provide connection string)

### Backend Setup

1. **Clone the Repository:**
   \`\`\`bash
   git clone https://github.com/Mukulraj109/Scheduler-System.git
   cd scheduler-system
   \`\`\`

2. **Install Dependencies:**
   \`\`\`bash
   cd backend
   npm install
   \`\`\`

3. **Environment Variables:**
   - Create a \`.env\` file in the \`backend\` directory with the following variables:
     \`\`\`bash
     MONGO_URI=mongodb+srv://mukulraj756:mukulraj123@cluster0.z6isg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
     PORT=5000
     \`\`\`

4. **Run the Backend Server:**
   \`\`\`bash
   npm start
   \`\`\`

### Frontend Setup

1. **Navigate to the Frontend Directory:**
   \`\`\`bash
   cd frontend
   \`\`\`

2. **Install Dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

3. **Run the Frontend Development Server:**
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Open Your Browser:**
   - Visit \`http://localhost:5137\` to view the application.

## Development Considerations

- **Error Handling:**
  - Implemented error handling in both backend routes and frontend components to ensure robustness and provide user feedback.

- **Security:**
  - Ensure sensitive data like database connection strings are kept secure and not hardcoded in the repository.

- **Scalability:**
  - Designed the system to handle multiple sessions and attendees efficiently with MongoDB.

## Future Improvements

- **Authentication:**
  - Add user authentication and authorization features to secure endpoints and user sessions.

- **Testing:**
  - Implement unit and integration tests for both frontend and backend to ensure functionality and reliability.

- **UI Enhancements:**
  - Improve the UI for better user experience and accessibility.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please submit a pull request with a detailed description of the changes or improvements.

## Contact

For any questions or feedback, please contact [your-email@example.com](mailto:mukulraj756@gmail.com).
EOF
