import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr]  gap-14 my-10 mt-40 text-sm'>

            {/*----- Left ------ */}
            <div>
                <img src={assets.logo} alt="" />
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dignissimos repellendus voluptates distinctio excepturi voluptas vitae vero nemo non voluptate expedita quia ducimus perspiciatis perferendis, alias soluta molestiae dolores consequatur animi! </p>
            </div>

            {/*----- Center Section ------ */}
            <div>
                <p>COMPANY</p>
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Contact us</li>
                    <li>Privacy policy</li>
                </ul>
            </div>

            {/*----- Right Section ------ */}
            <div>
                <p>Get in Touch</p>
                <ul>
                    <li>+1-212-456-7890</li>
                    <li>prescripto@gmail.com</li>
                </ul>
            </div>
        </div>

        {/*   ----- Copyright Text------  */}
        <div>
            <hr />
            <p>Copyright 2026@ Prescripto - All Right Reserved.</p>
        </div>
    </div>
  )
}

export default Footer