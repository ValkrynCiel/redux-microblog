import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import './BlogCard.css';

class BlogCard extends Component {

  render() {
    const {id, title, description} = this.props
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
      </div>
    );
  }
}

export default BlogCard;