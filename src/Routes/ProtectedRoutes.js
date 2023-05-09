import React from 'react'
import { Navigate, Outlet, Route, useNavigate } from 'react-router-dom';
import { IsUserAuthenticated } from '../utils/middlewares';

const ProtectedRoutes = () => {
  
    if (!IsUserAuthenticated()) {
      return <Navigate to="/login" />
    }
    
    return <Outlet />
}

export default ProtectedRoutes