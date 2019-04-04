import React, { Component } from 'react';
import CommentForm from './CommentForm';
// import './CommentArea.css';

class CommentArea extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     text:'',
  //   }
  //   this.handleChange = this.handleChange.bind(this);
  //   this.handleSubmit = this.handleSubmit.bind(this);
  // }

  // handleChange(evt) {
  //   this.setState({
  //     [evt.target.name]: evt.target.value,
  //   });
  // }

  // handleSubmit(evt) {
  //   evt.preventDefault();
  //   const id = uuid();
  //   const comment = {id, text: this.state.text};
  //   this.props.triggerAddComment(this.props.postId, comment);

  //   this.setState({text:''});
  // }


  renderComments() {
    return this.props.comments.map(comment =>
    <div key={comment.id}>
        <p>{comment.text}
        <span className="text-danger m-1"
              onClick={ () => this.props.triggerDeleteComment(this.props.postId, comment.id) }>
        <i className="far fa-times-circle"></i></span>
        </p>
      </div>
    );
  }

  render() {
    const comments = this.renderComments();
    return (
      <div className='CommentArea'>
        {comments}
        <CommentForm postId={this.props.postId}
                     triggerAddComment={this.props.triggerAddComment}/>
      </div>
    );
  }
}

export default CommentArea;