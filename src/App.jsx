import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import UserLists from './components/UserLists/UserLists'
import Home from './components/Home/Home'

function App() {

  return (
    <Router>
      <Routes>
      <Route path='/home' element={ <Home /> } />
      <Route path='/lists' element={ <UserLists /> } />
        <Route path='/login' element={ <Login /> } />
        <Route path='/register' element={ <Register /> } />
      </Routes>
    </Router>
  )
}

export default App
