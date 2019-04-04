import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
// import './NavBar.css';

class NavBar extends Component {
  render() {
    const activeStyle = {
      fontWeight: 'bold',
      color: 'darkturquoise',
    }

    return (
      <nav className="NavBar jumbotron col-8">
        <h1 className="display-3">Microblog</h1>
        <p>Get in the Rithm of blogging!</p>
        <div className="col-3 d-flex justify-content-between p-0">
          <NavLink exact to='/' activeStyle={activeStyle}>Blog</NavLink>
          <NavLink exact to='/new' activeStyle={activeStyle}>Add a new post</NavLink>
        </div>
      </nav>
    );
  }
}

export default NavBar;