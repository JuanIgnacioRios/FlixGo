import React from 'react'
import MovieCarousel from '../MovieCarousel/MovieCarousel'
import './UserLists.css'
import BackButton from '../BackButton/BackButton'
import PrivateNavBar from '../PrivateNavBar/PrivateNavBar'

const UserLists = () => {
  return (
    <div className='user-lists'>
        <PrivateNavBar />
        <BackButton />
        <MovieCarousel key="peliculas-vistas" title="Vistas" code='no code' />
        <MovieCarousel key="peliculas-por-ver" title="Por Ver"  code='no code'/>
        <MovieCarousel key="peliculas-preferidas" title="Preferidas" code='no code' />
    </div>
  )
}

export default UserLists