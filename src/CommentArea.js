import React, { Component } from 'react';
import uuid from 'uuid/v4';
// import './CommentArea.css';

class CommentArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text:'',
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
    const id = uuid();
    const comment = {id, text: this.state.text};
    this.props.triggerAddComment(this.props.postId, comment);

    this.setState({text:''});
  }


  renderComments() {
    return this.props.comments.map(comment =>
    <div key={comment.id}>
        <p>{comment.text}
        <span className="text-danger m-1" onClick={ () => this.props.triggerDeleteComment(this.props.postId, comment.id) }>
        <i className="far fa-times-circle"></i></span>
        </p>
      </div>
    );
  }


  render() {
    const comments = this.renderComments();
    const unfinished = this.state.text.length === 0;
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
            <button disabled={ unfinished } className='btn btn-primary'>Add Comment</button>
        </form>
      </div>
    );
  }
}

export default CommentArea;