import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import './CommentArea.css';

class CommentArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text:'',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleDelete = this.handleDelete.bind(this);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.triggerAddComment(this.props.postId, this.state.text);
    // if(this.props.triggerAdd){
    //   this.props.triggerAdd(this.state);
    //   this.props.history.push('/');
    // } else {
    //   this.props.triggerEdit(this.props.id, this.state);
    //   this.props.handleResetView();
    // }
    this.setState({text:''});
  }

  // handleDelete() {
  //   this.props.triggerDelete();
  // }


  renderComments() {
    return this.props.comments.map(comment =>
      <div>
        {comment.text}
        <button className="btn btn-danger m-1" onClick={ () => this.props.triggerDeleteComment(this.props.postId, comment.id) }> <i className="fas fa-trash-alt"></i> </button>
      </div>
    );
  }


  render() {
    const comments = this.renderComments();
    return (
      <div>
        <div>
          {comments}
        </div>
        <form onSubmit={ this.handleSubmit }
              className="CommentArea card col-12 m-1">
            <div className="form-group">
              <label htmlFor='text'>Comment:</label><br/>
              <input className="col-12" id='text' name='text' value={ this.state.text } onChange={ this.handleChange } />
            </div>
            <button className='btn btn-primary'>Add Comment</button>
        </form>
      </div>
    );
  }
}

export default CommentArea;