import React, { Component } from 'react';
import BlogCard from './BlogCard';
// import './HomePage.css';

class HomePage extends Component {

  renderPosts() {
    const postArr = [];
    for(let id in this.props.posts){
      postArr.push(
        <BlogCard key={id} id={id} post={this.props.posts[id]}/>
      )
    }
    return postArr;
  }

  render() {
    const posts = this.renderPosts();
    return (
      <div className="HomePage col-8">
          {posts}
      </div>
    );
  }
}

export default HomePage;