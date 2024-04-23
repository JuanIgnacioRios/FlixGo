import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import UserLists from './components/UserLists/UserLists'
import Home from './components/Home/Home'
import Search from './components/Search/Search';
import MoviePage from './components/MoviePage/MoviePage';
import UserPanel from './components/UserPanel/UserPanel';

function App() {

  return (
    <Router>
      <Routes>
      <Route path='/home' element={ <Home /> } />
      <Route path='/search' element={<Search />} />
      <Route path='/search/genres/:genre' element={<Search />} />
      <Route path='/movie/:movieid' element={<MoviePage />} />
      <Route path='/lists' element={ <UserLists /> } />
      <Route path='/login' element={ <Login /> } />
      <Route path='/register' element={ <Register /> } />
      <Route path='/userpanel' element={ <UserPanel /> } />
      </Routes>
    </Router>
  )
}

export default App
