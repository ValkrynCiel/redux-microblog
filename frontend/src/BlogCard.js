import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import VoteCounter from './VoteCounter';

/** component that displays basic information about a blog post on the homepage */
class BlogCard extends Component {

  shouldComponentUpdate(nextProps) {
    return nextProps.votes !== this.props.votes;
  }

  render() {
    const {id, title, description, votes, updateVote } = this.props;
    return (
      <div className="BlogCard card col-12 mb-3">
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