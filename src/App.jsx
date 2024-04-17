import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './components/Login/Login'
import Register from './components/Register/Register'

function App() {

  return (
    <Router>
      <Routes>
      <Route path='/login' element={ <Login /> } />
      <Route path='/register' element={ <Register /> } />
      </Routes>
    </Router>
  )
}

export default App
