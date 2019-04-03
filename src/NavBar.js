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
        <h1>Microblog</h1>
        <p>Get in the Rithm of blogging!</p>
        <NavLink exact to='/' activeStyle={activeStyle}>Blog</NavLink>
        <NavLink exact to='/new' activeStyle={activeStyle}>Add a new post</NavLink> 
      </nav>
    );
  }
}

export default NavBar;