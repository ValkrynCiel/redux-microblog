import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import uuid from 'uuid/v4';
import { connect } from 'react-redux';
import { addPost, editPost } from './actions';
// import './BlogPostForm.css';

class BlogPostForm extends Component {
  static defaultProps={
    title: '',
    description: '',
    body: '',
  }

  constructor(props){
    super(props);
    this.state = {
      title: this.props.title,
      description: this.props.description,
      body: this.props.body,
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
    evt.preventDefault();
    if(this.props.triggerAdd){
      // this.props.triggerAdd(this.state);
      const post = {...this.state, comments:[]};
      const id = uuid();
      this.props.addPost(id, post);
      this.props.history.push('/');
    } else {
      // this.props.triggerEdit(this.props.id, this.state);
      const post = this.state;
      const id = this.props.id;
      this.props.editPost(id, post);
      this.props.handleResetView();
    }
  }

  showCancelEdit() {
    return <button className="m-1 btn btn-secondary" onClick={this.props.handleResetView}>Cancel</button>
  }

  showCancelAdd() {
    return <Link className="m-1 btn btn-secondary"to='/'>Cancel</Link>
  }

  render() {
    return (
      <div className="d-flex align-items-center flex-column col-10">
        <div className="col-4">
          {this.props.triggerAdd ? <h1>Add New Post</h1> : <h1>Edit Post</h1>}
        </div>
        <form className="BlogForm col-4" onSubmit={ this.handleSubmit }>

          <div className="form-group">
            <label htmlFor='title'>Title:</label><br/>
            <input className="col-12" id='title' name='title' value={ this.state.title } onChange={ this.handleChange } />
          </div>

          <div className="form-group">
            <label htmlFor='description'>Description:</label><br/>
            <input className="col-12" id='description' name='description' value={ this.state.description } onChange={ this.handleChange } />
          </div>

          <div className="form-group">
            <label htmlFor='body'>Body:</label><br/>
            <textarea className="col-12" id='body' name='body' value={ this.state.body } onChange={ this.handleChange } />
          </div>

          <button className="m-1 btn btn-primary">Submit</button>
        </form>
          { this.props.triggerAdd ? this.showCancelAdd() : this.showCancelEdit() }
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  return { posts: reduxState.posts };
}

const mapDispatchToProps = {
  addPost,
  editPost
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogPostForm);