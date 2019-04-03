import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import BlogPostForm from './BlogPostForm';
import CommentArea from './CommentArea';
// import './BlogCard.css';

class BlogPost extends Component {

  constructor(props){
    super(props);
    this.state = {
      showEditForm: false
    }
    this.toggleEditView = this.toggleEditView.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  toggleEditView() {
    this.setState( st => ({ showEditForm: !st.showEditForm }))
  }

  handleDelete() {
    this.props.triggerDelete(this.props.id);
  }

  render() {
    if (!this.props.post) return <Redirect to='/' />
    return (
      <div className="BlogPost col-8">
          <h1>{ this.props.post.title }</h1>
          <p><i>{ this.props.post.description }</i></p>
          <p>{ this.props.post.body }</p>
          <button className="btn btn-primary m-1" onClick={ this.toggleEditView }> <i className="fas fa-edit"></i> </button>
          <button className="btn btn-danger m-1" onClick={ this.handleDelete }> <i className="fas fa-trash-alt"></i> </button>
          <CommentArea postId ={this.props.id}
                       comments={this.props.post.comments}
                       triggerAddComment={this.props.triggerAddComment}
                       triggerDeleteComment={
                         this.props.triggerDeleteComment}/>
          <div className='d-flex flex-column align-items-center'>
            {this.state.showEditForm && <BlogPostForm title={ this.props.post.title }
                                              description={ this.props.post.description }
                                              body={this.props.post.body}
                                              triggerEdit={this.props.triggerEdit}
                                              id={this.props.id}
                                              handleResetView={this.toggleEditView}/>}
          </div>
      </div>
    );
  }
}

export default BlogPost;