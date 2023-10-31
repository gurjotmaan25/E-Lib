import React from 'react'
import '../index.css'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <div className='header'> 
    <Link to='/' className='head'>E-Lib</Link>    
    <Link to='/add' className='add'>Add a Book</Link>
    </div>
  )
}

export default Header