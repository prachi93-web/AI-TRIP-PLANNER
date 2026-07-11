import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import MyTrips from './pages/MyTrips'
import TripDetails from './pages/TripDetails'
import Dashboard from './pages/Dashboard'
import CreateTrip from './pages/CreateTrip'
import Profile from './pages/Profile'
import ProtectedRoute from './components/ProtectedRoute'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VerifyOtp from './pages/VerifyOtp'

const App = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  return (
    <>
     <ToastContainer />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />
      <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path='/create-trip' element={<ProtectedRoute><CreateTrip /></ProtectedRoute>} />
      <Route path='/my-trips' element={<ProtectedRoute><MyTrips /></ProtectedRoute>} />
      <Route path='/trip/:id' element={<ProtectedRoute><TripDetails /></ProtectedRoute>} />
      <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
    </Routes>
  </>
  )
}

export default App