import React from 'react';
import { NavLink } from 'react-router-dom';

const navigationItems=props=>{
  return (
    <ul>
      <li>
        <NavLink to="/course">Course</NavLink>
      </li>
    </ul>
  )
}

export default navigationItems;
