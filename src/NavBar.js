import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
// import './NavBar.css';

class NavBar extends Component {
  render() {
    const activeStyle={
      fontWeight: 'bold',
      color: 'gold',
    }

    return (
      <nav className="NavBar">
          <NavLink exact to='/new' activeStyle={activeStyle} />
          <NavLink exact to='/' activeStyle={activeStyle} />
      </nav>
    );
  }
}

export default NavBar;