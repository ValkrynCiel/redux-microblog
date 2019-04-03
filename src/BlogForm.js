import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import './BlogForm.css';

class BlogForm extends Component {
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
      this.props.triggerAdd(this.state);
      this.props.history.push('/');
    } else {
      this.props.triggerEdit();
      this.props.history.push(`/${this.props.postId}`);
    }
  }

  render() {
    return (
      <form className="BlogForm" onSubmit={ this.handleSubmit }>
          <label htmlFor='title'>title</label>
          <input id='title' name='title' value={ this.state.title } onChange={ this.handleChange } />

          <label htmlFor='description'>description</label>
          <input id='description' name='description' value={ this.state.description } onChange={ this.handleChange } />

          <label htmlFor='body'>body</label>
          <input id='body' name='body' value={ this.state.body } onChange={ this.handleChange } />

          <button>Submit</button>
          <Link to='/'>Cancel</Link>
      </form>
    );
  }
}

export default BlogForm;