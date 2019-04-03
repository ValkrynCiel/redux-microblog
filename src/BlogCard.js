import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import './BlogCard.css';

class BlogCard extends Component {

  render() {
    return (
      <div className="BlogCard card col-12 m-1">
        <Link to={`/posts/${this.props.id}`}>
          <div className="card-header">
            <h3>{this.props.post.title}</h3>
          </div>
          <div className="card-body">
            <p>{this.props.post.description}</p>
          </div>
        </Link>
      </div>
    );
  }
}

export default BlogCard;