import React, { useEffect } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import LoginRegister from './components/LoginRegister';
import TaskPage from './components/TaskPage';
import { Provider } from 'react-redux';
import store from './store';
import { setAuthToken } from './api/axios';

function AppRoutes() {
  // set token on app load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setAuthToken(token);
  }, []);

  return (
    <Routes>
      <Route path="/" element={<LoginRegister />} />
      <Route path="/tasks" element={<TaskPage />} />
    </Routes>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Provider>
  );
}
