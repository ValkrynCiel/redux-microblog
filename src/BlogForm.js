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
      this.props.triggerEdit(this.props.id, this.state);
      this.props.handleResetView();
    }
  }

  render() {
    return (
      <div className="d-flex align-items-center flex-column">
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

          <button className="btn btn-primary">Submit</button>
          <Link className="btn btn-secondary"to='/'>Cancel</Link>
        </form>
      </div>
    );
  }
}

export default BlogForm;