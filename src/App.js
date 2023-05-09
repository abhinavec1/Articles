import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import RegisterPage from './pages/register';
import CustomRoutes from './Routes';

function App() {
  return (
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path="*" element={<CustomRoutes />} />
      </Routes>
  );
}

export default App;