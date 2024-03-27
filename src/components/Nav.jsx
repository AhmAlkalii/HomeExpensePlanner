import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom'; 
import { toast } from "react-toastify";
import { ArrowRightEndOnRectangleIcon } from '@heroicons/react/24/solid';
import logomark from '../assets/logomark.svg';

const Nav = () => {
  const navigate = useNavigate(); 

  const handleLogout = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const responseData = await response.json();
        toast.success(responseData.message);
        navigate("/");
      } else {
        throw new Error('Failed to logout');
      }
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error("Failed to logout. Please try again later.");
    }
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
