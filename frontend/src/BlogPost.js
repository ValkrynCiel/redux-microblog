import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import BlogPostForm from './BlogPostForm';
import CommentArea from './CommentArea';
import VoteCounter from './VoteCounter';
import { connect } from 'react-redux';
import { deletePostFromApi,
         getPostDetailFromApi,
         updateVoteToApi,
         addPostToSeen,
         deletePostFromSeen } from './actions';
// import './BlogCard.css';

class BlogPost extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showEditForm: false,
      isLoading: true,
      wrongPage: false,
    }
    this.toggleEditView = this.toggleEditView.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  /**
   * populate post in redux state with object received from api
   */

  async componentDidMount() {
    try {
      const { post, id } = this.props;
      if(!post){
        await this.props.getPostDetailFromApi(id);
      }

      // if post id doesnt exist => wrongPage = true
      if (this.props.post === '') {
        this.setState({ isLoading: false, wrongPage: true });
      } else {
        this.setState({ isLoading: false });
      }
    } catch (err) {
      // if post id is not int => wrongPage = true
      this.setState({ isLoading: false, wrongPage: true });
    }
  }

  toggleEditView() {
    this.setState(st => ({ showEditForm: !st.showEditForm }))
  }

  /**
   * delete post from backend and redux state
   * redirect to homepage
   */

  async handleDelete() {
    await this.props.deletePostFromApi(this.props.post.id);
    this.props.history.push('/');
    this.props.deletePostFromSeen(this.props.post.id);
  }

  render() {
    const { title, description, body, id, votes } = this.props.post? this.props.post : {};
    if (this.state.wrongPage) return <Redirect to='/' />
    return (
      <div className="BlogPost col-8">
        {this.state.isLoading
          ?
          "Loading..."
          :
          this.state.showEditForm?
            <BlogPostForm
            id={id}
            handleResetView={this.toggleEditView} />
            :
            <div className="card p-2">
              <div className="container-fluid card-doby">
                <div className="row">
                  <div className="col-11 p-0">
                    <button className="btn btn-primary m-1"
                      onClick={this.toggleEditView}>
                      <i className="fas fa-edit"></i>
                    </button>
                    <button className="btn btn-danger m-1"
                      onClick={this.handleDelete}>
                      <i className="fas fa-trash-alt"></i>
                    </button>
                    <h1>{title}</h1>
                    <p><i>{description}</i></p>
                    <p>{body}</p>
                  </div>

                  <div className="col-1 mt-5">
                    <VoteCounter postId={id}
                      votes={votes}
                      updateVote={this.props.updateVoteToApi}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4 card-footer">
                <CommentArea postId={this.props.id}/>
              </div>
            </div>
        }
      </div>
    );
  }
}

function mapStateToProps(reduxState, ownProps) {
  return { post: reduxState.seen[ownProps.id] };
}

const mapDispatchToProps = {
  deletePostFromApi,
  getPostDetailFromApi,
  updateVoteToApi,
  addPostToSeen,
  deletePostFromSeen,
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogPost);