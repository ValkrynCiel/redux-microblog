import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import uuid from 'uuid/v4';
import NavBar from './NavBar';
import BlogForm from './BlogForm';
import HomePage from './HomePage';
// import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      posts:{},
    }
    this.addPost = this.addPost.bind(this);
  }

  addPost(postObj) {
    const id = uuid();
    this.setState({
      posts: {...this.state.posts, [id]: postObj},
    });
  }

  render() {
    return (
      <div className="App">
        <NavBar />
        <Switch>
          <Route exact path='/new' render={(rt) => <BlogForm triggerAdd={ this.addPost } history={ rt.history }/>} />
          <Route exact path='/' render={() => <HomePage posts={ this.state.posts } />} />
          <Redirect to='/' />
        </Switch>
      </div>
    );
  }
}

export default App;
