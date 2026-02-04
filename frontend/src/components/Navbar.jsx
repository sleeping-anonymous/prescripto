import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets_frontend/assets'

const Navbar = () => {
  return (
    <div>
        
        <img src={assets.logo} alt="" />
        <ul>
            <NavLink >
                <li>HOME</li>
            </NavLink>

            <NavLink >
                <li>ALL DOCTORS</li>
            </NavLink>
            <NavLink >
                <li>ABOUT</li>
            </NavLink>
            <NavLink >
                <li>CONTACT</li>
            </NavLink>
        </ul>
        <div>
            <button>Create Account</button>
        </div>
    </div>
  )
}

export default Navbar