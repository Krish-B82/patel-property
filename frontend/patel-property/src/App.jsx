import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import PropertyDetail from './pages/PropertyDetail';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AddProperty from './pages/admin/AddProperty';
import ViewProperty from './pages/admin/ViewProperty';
import ProtectedRoute from './utils/ProtectedRoute';

function App() {
  useEffect(() => {
    // Set default language to English
    if (!localStorage.getItem('selectedLanguage')) {
      localStorage.setItem('selectedLanguage', 'en');
    }
  }, []);

  // Get secret admin path from .env
  const ADMIN_SECRET = import.meta.env.VITE_ADMIN_SECRET_PATH || '/admin-login';

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/property/:id" element={<PropertyDetail />} />
        
        {/* Hidden Admin Login - Secret URL from .env */}
        <Route path={ADMIN_SECRET} element={<AdminLogin />} />
        
        {/* Protected Admin Routes */}
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/add-property" 
          element={
            <ProtectedRoute>
              <AddProperty />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/edit-property/:id" 
          element={
            <ProtectedRoute>
              <AddProperty />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/view-property/:id" 
          element={
            <ProtectedRoute>
              <ViewProperty />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;