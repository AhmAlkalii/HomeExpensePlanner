import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom'; 
import { toast } from "react-toastify";
import { TrashIcon, ArrowRightEndOnRectangleIcon } from '@heroicons/react/24/solid';
import logomark from '../assets/logomark.svg';

const Nav = () => {
  const navigate = useNavigate(); 

  const handleLogout = (event) => {
    event.preventDefault();
    toast("You've Logged Out Of Your Account Successfully");
    navigate("/");
  };

  return (
    <nav>
      <NavLink to='/dashboard' aria-label='Go to home'>
        <img src={logomark} alt="HomeBudget" height={30} />
        <span>HomeBudget</span>
      </NavLink>
      <form onSubmit={handleLogout}>
        <button type='submit' className='btn btn--warning'>
          <span>Log Out</span>
          <ArrowRightEndOnRectangleIcon width={30} />
        </button>
      </form>
    </nav>
  );
};

export default Nav;
