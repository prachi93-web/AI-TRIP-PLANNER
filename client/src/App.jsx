import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import MyTrips from './pages/MyTrips'
import TripDetails from './pages/TripDetails'
import Dashboard from './pages/Dashboard'
import CreateTrip from './pages/CreateTrip'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/create-trip' element={<CreateTrip />} />
      <Route path='/my-trips' element={<MyTrips />} />
      <Route path='/trip/:id' element={<TripDetails />} />
    </Routes>
  )
}

export default App