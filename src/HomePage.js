import React, { Component } from 'react';
import BlogCard from './BlogCard';
// import './HomePage.css';

class HomePage extends Component {
//   constructor(props){
//     super(props);
//     this.state = {
//       posts:{},
//     }
//     this.addPost = this.addPost.bind(this);
//   }

  renderPost() {
    const postArr = [];
    for(let id in this.props.posts){
      postArr.push(
        <BlogCard key={id} id={id} post={this.props.posts[id]}/>
      )
    }
    return postArr;
  }

  render() {
    const posts = this.renderPost();
    return (
      <div className="HomePage">
        {posts}
      </div>
    );
  }
}

export default HomePage;