import React from 'react';
import { NavLink } from 'react-router-dom';

// Assets
import logomark from '../assets/logomark.svg';

// Library imports
import { TrashIcon, ArrowRightEndOnRectangleIcon } from '@heroicons/react/24/solid';
const Nav = () => {
  const handleLogout = (event) => {
    console.log('You have been logged out')
  };

  return (
    <nav>
      <NavLink to='/' aria-label='Go to home'>
        <img src={logomark} alt="HomeBudget" height={30} />
        <span>HomeBudget</span>
      </NavLink>
      <form /*action='/logout'*/ onSubmit={handleLogout}>
        <button type='submit' className='btn btn--warning'>
          <span>Log Out</span>
          <ArrowRightEndOnRectangleIcon width={30} />
        </button>
      </form>
    </nav>
  );
};

export default Nav;
