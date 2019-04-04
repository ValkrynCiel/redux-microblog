import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import BlogPostForm from './BlogPostForm';
import CommentArea from './CommentArea';
import { connect } from 'react-redux';
import { deletePost, getPostDetailFromApi } from './actions';
// import './BlogCard.css';

class BlogPost extends Component {

  constructor(props){
    super(props);
    this.state = {
      showEditForm: false,
      isLoading: true,
    }
    this.toggleEditView = this.toggleEditView.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  async componentDidMount () {
    await this.props.getPostDetailFromApi(this.props.id);
    this.setState({ isLoading: false });
  }

  toggleEditView() {
    this.setState( st => ({ showEditForm: !st.showEditForm }))
  }

  handleDelete() {
    this.props.deletePost(this.props.id);
  }

  render() {
    const post = this.props.post;
    if (!post) return <Redirect to='/' />
    return (
      <div className="BlogPost col-8">
        { this.state.isLoading
        ?
          "Loading..."
        :
          <>
          <h1>{ post.title }</h1>
          <p><i>{ post.description }</i></p>
          <p>{ post.body }</p>
          <button className="btn btn-primary m-1"
                  onClick={ this.toggleEditView }>
            <i className="fas fa-edit"></i>
          </button>
          <button className="btn btn-danger m-1"
                  onClick={ this.handleDelete }>
            <i className="fas fa-trash-alt"></i>
          </button>

          <CommentArea />

          <div className='d-flex flex-column align-items-center'>
            {this.state.showEditForm && <BlogPostForm title={ post.title }
                                              description={ post.description }
                                              body={post.body}
                                              id={this.props.id}
                                              handleResetView={this.toggleEditView}/>}
          </div>
          </>
        }
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  return { post: reduxState.post };
}

const mapDispatchToProps = {
  deletePost,
  getPostDetailFromApi,
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogPost);