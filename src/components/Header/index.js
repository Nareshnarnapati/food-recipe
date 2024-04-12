import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

function Navbar() {
  return (
    <div className="nav-con">
      <Link to="/home"><h1 className="food-head">FoodDB.</h1>
      </Link>
      <Link to="/">
        <button className="logout"> Log out</button>
      </Link>

      
    </div>
  );
}

export default Navbar;
