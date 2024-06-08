import React from 'react'
import MovieCarousel from '../MovieCarousel/MovieCarousel'
import './UserLists.css'
import BackButton from '../BackButton/BackButton'
import PrivateNavBar from '../PrivateNavBar/PrivateNavBar'
import { useState, useEffect } from 'react'

const UserLists = () => {
  return (
    <div className='user-lists'>
        <PrivateNavBar />
        <BackButton />
        <MovieCarousel key="peliculas-vistas" title="Vistas" code='watched' />
        <MovieCarousel key="peliculas-por-ver" title="Por Ver"  code='towatch'/>
        <MovieCarousel key="peliculas-preferidas" title="Preferidas" code='favourite' />
    </div>
  )
}

export default UserLists