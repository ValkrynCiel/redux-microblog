import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import NavBar from './NavBar';
import BlogPostForm from './BlogPostForm';
import HomePage from './HomePage';
import BlogPost from './BlogPost';
// import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App d-flex flex-column align-items-center">
        <NavBar />
        <Switch>
          <Route exact path='/new' render={(rtp) => <BlogPostForm triggerAdd={true} history={rtp.history} />} />
          <Route exact path='/' render={() => <HomePage />} />
          <Route exact path='/posts/:id' 
                 render={(rtp) => <BlogPost
                 id={rtp.match.params.id}
          />}
          />
          <Redirect to='/' />
        </Switch>
      </div>
    );
  }
}

export default App;
