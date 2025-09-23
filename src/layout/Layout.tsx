import { BrowserRouter as BrowserRouter, Routes, Route } from 'react-router-dom'
import Signin from '../pages/Signin'
import Signup from '../pages/Signup'
import Dashboard from '../pages/Dashboard';
import Profile from '../components/Profile';
import Links from '../components/Links';
import ProtectedRoute from './ProtectedRoute';

export default function Layout() {
  return (
    <BrowserRouter >  
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/sign-up" element={<Signup />} />
     <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/links"
            element={
              <ProtectedRoute>
                <Links onClose={function (): void {
                  throw new Error('Function not implemented.');
                } } />
              </ProtectedRoute>
            }
          />
      </Routes>
  
      </BrowserRouter>
  );
}

;
