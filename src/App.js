import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import NavBar from './NavBar';
import BlogForm from './BlogForm';
import HomePage from './HomePage';
// import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {

    }
    this.addPost = this.addPost.bind(this);
  }

  addPost() {

  }

  render() {
    return (
      <div className="App">
        <NavBar />
        <Switch>
          <Route exact path='/new' render={() => <BlogForm triggerAdd={ this.addPost }/>} />
          <Route exact path='/' render={() => <HomePage />} />
          <Redirect to='/' />
        </Switch>
      </div>
    );
  }
}

export default App;
