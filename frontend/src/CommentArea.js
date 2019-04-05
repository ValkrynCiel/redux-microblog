import React, { Component } from 'react';
import CommentForm from './CommentForm';
import { connect } from 'react-redux';
import { deleteCommentFromApi, addCommentToApi } from './actions';
import Comment from './Comment';
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
    return this.props.post.comments.map(({ id, text }) =>
      <Comment key={id}
               id={id}
               text={text}
               triggerDeleteComment={this.deleteComment}
               postId={this.props.post.id}/>
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
