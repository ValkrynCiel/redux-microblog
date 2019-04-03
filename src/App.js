import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import uuid from 'uuid/v4';
import NavBar from './NavBar';
import BlogForm from './BlogForm';
import HomePage from './HomePage';
import BlogPost from './BlogPost';
// import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: {},
    }
    this.addPost = this.addPost.bind(this);
    this.editPost = this.editPost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.addComment = this.addComment.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
  }

  addPost(postObj) {
    const id = uuid();
    const newPost = { ...postObj, comments: [] };
    this.setState({
      posts: { ...this.state.posts, [id]: newPost }
    });
  }

  editPost(id, postObj) {
    const comments = this.state.posts[id].comments;
    const newPost = { ...postObj, comments };
    this.setState({
      posts: { ...this.state.posts, [id]: newPost },
    });
  }

  deletePost(id) {
    const newPostState = { ...this.state.posts }
    delete newPostState[id];

    this.setState({
      posts: newPostState
    })
  }

  addComment(id, comment) {
    const post = this.state.posts[id];
    const newComments = [...post.comments,
    { text: comment, id: uuid() }];
    const newPost = { ...post, comments: newComments };
    // post.comments.push({text: comment, id: uuid()});
    // const newPostState = { ...this.state.posts, [id]: post };
    this.setState({ posts: { ...this.state.posts, [id]: newPost } });
  }

  deleteComment(id, commentId) {
    const post = this.state.posts[id];
    const newComments = post.comments.filter(c => c.id !== commentId);
    const newPost = { ...post, comments: newComments };
    // post.comments = newCommentArray;
    // const newPostState = { ...this.state.posts, [id]: post };
    this.setState({ posts: { ...this.state.posts, [id]: newPost } });
  }

  render() {
    return (
      <div className="App d-flex flex-column align-items-center">
        <NavBar />
        <Switch>
          <Route exact path='/new' render={(rtp) => <BlogForm triggerAdd={this.addPost} history={rtp.history} />} />
          <Route exact path='/' render={() => <HomePage posts={this.state.posts} />} />
          <Route exact path='/posts/:id' render={(rtp) => <BlogPost
            post={this.state.posts[rtp.match.params.id]}
            id={rtp.match.params.id}
            triggerEdit={this.editPost}
            triggerDelete={this.deletePost}
            triggerAddComment={
              this.addComment}
            triggerDeleteComment={
              this.deleteComment}
          />}
          />
          <Redirect to='/' />
        </Switch>
      </div>
    );
  }
}

export default App;
