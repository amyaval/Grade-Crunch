import './App.css';

//importing components here:
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import GradeTable from './components/GradeTable';
import CreateAccount from './components/CreateAccount';
import About from './components/About';
import Contact from './components/Contact';
import ForgotPassword from './components/ForgotPassword';
import Terms from './components/Terms';
import Privacy from './components/Privacy';
import Dashboard from './components/Dashboard';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from 'react';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('authToken');
  return token ? children : <Navigate to="/signup" replace />
};

function App() {

  return (
    <>
      <NavBar />
      <div className="container">
        <Routes>
          <Route path="/" element={<GradeTable/>} />
          <Route path="/signup" element={<CreateAccount />} />
          <Route path="signin" element={<CreateAccount />} />
          <Route path="/about" element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />

          {/*protected routes */}
          <Route 
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/*catch-all route */}
          <Route path="*" element={<Navigate to ="/" replace />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
