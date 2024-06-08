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
import ForgetMyPassword from './components/ForgetMyPassword/ForgetMyPassword';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

function App() {

  const wrapPrivateRoute = (element) => {
    return (
      <PrivateRoute>
        {element}
      </PrivateRoute>
    );
  };

  return (
    <Router>
      <Routes>
        <Route path='/' element={ <Login /> } />
        <Route path='/home' element={wrapPrivateRoute(<Home />)} />
        <Route path='/search' element={wrapPrivateRoute(<Search />)} />
        <Route path='/search/genres/:genre' element={wrapPrivateRoute(<Search />)} />
        <Route path='/movie/:movieid' element={wrapPrivateRoute(<MoviePage />)} />
        <Route path='/lists' element={ wrapPrivateRoute(<UserLists /> )} />
        <Route path='/login' element={ <Login /> } />
        <Route path='/forgetpassword' element={ <ForgetMyPassword /> } />
        <Route path='/register' element={ <Register /> } />
        <Route path='/userpanel' element={ wrapPrivateRoute(<UserPanel />) } />
      </Routes>
    </Router>
  )
}

export default App
