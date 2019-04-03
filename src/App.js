import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import uuid from 'uuid/v4';
import NavBar from './NavBar';
import BlogForm from './BlogForm';
import HomePage from './HomePage';
import BlogPost from './BlogPost';
// import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      posts:{},
    }
    this.addPost = this.addPost.bind(this);
    this.editPost= this.editPost.bind(this);
    this.deletePost= this.deletePost.bind(this);
  }

  addPost(postObj) {
    const id = uuid();
    this.setState({
      posts: {...this.state.posts, [id]: postObj},
    });
  }

  editPost(id, postObj) {
    this.setState({
      posts: {...this.state.posts, [id]: postObj},
    });
  }

  deletePost(id) {
    const newPostState = { ...this.state.posts }
    delete newPostState[id];

    this.setState({
      posts: newPostState
    })
  }

  render() {
    return (
      <div className="App">
        <NavBar />
        <Switch>
          <Route exact path='/new' render={(rtp) => <BlogForm triggerAdd={ this.addPost } history={ rtp.history }/>} />
          <Route exact path='/' render={() => <HomePage posts={ this.state.posts } />} />
          <Route exact path='/posts/:id' render={(rtp) => <BlogPost 
                                         post={this.state.posts[rtp.match.params.id]}
                                         id={rtp.match.params.id}
                                         triggerEdit={this.editPost}
                                         triggerDelete={this.deletePost}/> }
                                         />
          <Redirect to='/' />
        </Switch>
      </div>
    );
  }
}

export default App;
