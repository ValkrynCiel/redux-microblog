import React, { Component } from 'react';
import CommentForm from './CommentForm';
import { connect } from 'react-redux';
import { deleteCommentFromApi, addCommentToApi } from './actions'
// import './CommentArea.css';

class CommentArea extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
    this.deleteComment = this.deleteComment.bind(this);
  }

  async deleteComment(postId, commentId) {
    await this.props.deleteCommentFromApi(postId, commentId);
  }


  /**
   * create comments with buttons that will delete them from the API
   */

  renderComments() {
    return this.props.post.comments.map(comment =>
    <div key={comment.id}>
        <p>{comment.text}
        <span className="text-danger m-1"
              onClick={ this.deleteComment }>
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
        <CommentForm postId={ this.props.post.id }
                     triggerAddComment={this.props.addCommentToApi}/>
      </div>
    );
  }
}


function mapStateToProps(reduxState) {
  return { post: reduxState.post };
}

const mapDispatchToProps = {
  deleteCommentFromApi,
  addCommentToApi,
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentArea);
