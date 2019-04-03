import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import BlogForm from './BlogForm'
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
      <div className="BlogPost">
          <h1>{ this.props.post.title }</h1>
          <p><i>{ this.props.post.description }</i></p>
          <p>{ this.props.post.body }</p>
          <button onClick={ this.toggleEditView }> <i className="fas fa-edit"></i> </button>
          <button onClick={ this.handleDelete }> <i className="fas fa-trash-alt"></i> </button>
          <>
            {this.state.showEditForm && <BlogForm title={ this.props.post.title }
                                              description={ this.props.post.description }
                                              body={this.props.post.body}
                                              triggerEdit={this.props.triggerEdit}
                                              id={this.props.id}
                                              handleResetView={this.toggleEditView}/>}
          </>
      </div>
    );
  }
}

export default BlogPost;