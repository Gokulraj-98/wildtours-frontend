import { useState } from 'react'
// import './App.css'
import LoginPage from '../components/LoginPage'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import AdminDashboard from '../components/AdminDashboard'
import HomePage from '../components/HomePage'
import TourDetailsPage from '../components/TourDetailsPage'
import RegistrationPage from '../components/RegistrationPage'
import UserDashboard from '../components/UserDashboard';
import Cart from '../components/Cart'
import Bill from '../components/Bill'
import Item from '../components/Item'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tour" element={<TourDetailsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/user" element={<UserDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/bills" element={<Bill />} />
          <Route path="/item" element={<Item />} />

        </Routes>
      </BrowserRouter >
    </div >
  )
}

export default App
