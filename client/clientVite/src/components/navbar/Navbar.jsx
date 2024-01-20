import React from 'react'
import Button from '../button/button'
import style from './Navbar.module.css'

export default function Navbar() {
  return (
    <div className={style.container}>
      <nav className={style.nav_links}>
        <Button path='/home'
                text='Home'
        />

         <Button path='/form'
                text='Create Videogame'
                />

        <Button path='/' text='exit' />
      </nav>
    </div>
  )
}
