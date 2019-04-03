import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import './BlogCard.css';

class BlogCard extends Component {

  render() {
    return (
      <div className="BlogCard">
        <Link to={`/posts/${this.props.id}`}>
          <h3>{this.props.post.title}</h3>
          <p>{this.props.post.description}</p>
        </Link>
      </div>
    );
  }
}

export default BlogCard;