import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import VoteCounter from './VoteCounter';
// import './BlogCard.css';

class BlogCard extends Component {
  render() {
    const {id, title, description, votes, updateVote } = this.props;
    return (
      <div className="BlogCard card col-12 m-1">
        <Link to={`/posts/${id}`}>
          <div className="card-header">
            <h3>{title}</h3>
          </div>
          <div className="card-body">
            <p>{description}</p>
          </div>
        </Link>
        <div className="card-footer">
          <VoteCounter postId={id}
                       votes={votes}
                       updateVote={updateVote}/>
        </div>
      </div>
    );
  }
}

export default BlogCard;