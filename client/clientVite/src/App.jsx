import { useState } from 'react'
import './App.css'
import { Routes, Route } from "react-router-dom"
import Detail from "./components/detail/Detail"
import LandingPage from "./components/landingPage/LandingPage"
import Home from './components/home/Home'
import Navbar from "./components/navbar/Navbar"
import Form from './components/form/Form'


//<Route path='/home' element= { <Videogames />} /> 

function App() {
   return (
      <div className='app'>
      <Routes>
      <Route path='/' element= { <LandingPage />} /> 
      <Route path='/home' element= { 
         <div>
            <Navbar />
            <Home />
         </div>
      } /> 
      <Route path='/detail/:id' element= { <Detail />} /> 
      <Route path='/form' element={<Form />} />
      </Routes>
      </div>

    
  )
}

export default App
