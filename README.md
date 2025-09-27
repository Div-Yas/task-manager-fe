# Task Manager Frontend

This is the frontend for the Task Manager application, built with React and Material UI.

## Features

- User registration and login
- JWT-based authentication
- Create, view, update, and delete tasks
- Responsive UI with Material UI components
- State management with Redux

## Getting Started

### Prerequisites

- Node.js (v16 or higher recommended)
- The backend API running (see `/backend` folder)

### Installation

1. **Navigate to the frontend folder:**
   ```sh
   cd frontend
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Start the development server:**
   ```sh
   npm start
   ```

4. **App will run at:**  
   `http://localhost:3000`

## Project Structure

```
frontend/
├── src/
│   ├── api/           # Axios instance and API helpers
│   ├── components/    # React components (Login, Register, TaskPage, etc.)
│   ├── store/         # Redux store and slices
│   ├── App.js         # Main app component
│   └── index.js       # Entry point
├── public/
├── package.json
└── ...
```

## Configuration

- The frontend expects the backend API to be running at `http://localhost:5000`.
- You can change the API base URL in `src/api/axios.js` if needed.

## License

MIT