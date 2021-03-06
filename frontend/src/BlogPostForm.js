import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addPostToApi, editPostInApi } from './actions';

/** component that serves the purpose of adding and/or editing a blog post */
class BlogPostForm extends Component {
  // default props provided as values for an add form 
  static defaultProps={
    post:{
      title: '',
      description: '',
      body: '',
    },
  }

  constructor(props){
    super(props);
    this.state = {
      title: this.props.post.title,
      description: this.props.post.description,
      body: this.props.post.body,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  handleSubmit(evt) {
    //if there a post is added, add post to backend and redux state, redirect to homepage
    evt.preventDefault();
    if(this.props.triggerAdd){
      const post = { ...this.state };
      this.props.addPostToApi(post);
      this.props.history.push('/');
    } else {
    // if post is edited, update post in backend and redux state
      const post = this.state;
      const id = this.props.post.id;
      this.props.editPostInApi(id, post);
      this.props.handleResetView();
    }
  }

  // canceling an edit hides the edit form 
  showCancelEdit() {
    return <button className="m-1 btn btn-secondary"
                   onClick={this.props.handleResetView}>Cancel</button>
  }
  // canceling an add redirects to home page 
  showCancelAdd() {
    return <Link className="m-1 btn btn-secondary"to='/'>Cancel</Link>
  }

  render() {
    const unfinished = this.state.title.length === 0;
    return (
      <div className="d-flex align-items-center flex-column col-12 card">
        <>
          {this.props.triggerAdd ? <h1>Add New Post</h1> : <h1>Edit Post</h1>}
        </>
        <form className="BlogForm col-12">

          <div className="form-group">
            <label htmlFor='title'>Title:</label><br/>
            <input className="col-12"
                   id='title'
                   name='title'
                   value={ this.state.title }
                   onChange={ this.handleChange }
                   placeholder="Required"/>
          </div>

          <div className="form-group">
            <label htmlFor='description'>Description:</label><br/>
            <input className="col-12"
                   id='description'
                   name='description'
                   value={ this.state.description }
                   onChange={ this.handleChange } />
          </div>

          <div className="form-group">
            <label htmlFor='body'>Body:</label><br/>
            <textarea className="col-12"
                      id='body'
                      name='body'
                      value={ this.state.body }
                      onChange={ this.handleChange } />
          </div>

          <button disabled={ unfinished }
                  onClick={ this.handleSubmit }
                  className="m-1 btn btn-primary">Submit</button>
          { this.props.triggerAdd ? this.showCancelAdd() : this.showCancelEdit() }
        </form>

      </div>
    );
  }
}

function mapStateToProps(reduxState, ownProps) {
  return { post: reduxState.seen[ownProps.id] };
}

const mapDispatchToProps = {
  addPostToApi,
  editPostInApi
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogPostForm);