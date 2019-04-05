import React, { Component } from 'react';

class Comment extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showDeleteButton: false
    }
    this.showDelete = this.showDelete.bind(this);
    this.hideDelete = this.hideDelete.bind(this);
  }

  showDelete() {
    this.setState({
      showDeleteButton: true
    })
  }

  hideDelete() {
    this.setState({
      showDeleteButton: false
    })
  }

  render() {
    const { id, postId, text, triggerDeleteComment } = this.props;
    return (
      <div onMouseEnter={this.showDelete} onMouseLeave={this.hideDelete}>
        <p>{text}
          {this.state.showDeleteButton &&
            <span className="text-danger m-1"
              onClick={async () => await triggerDeleteComment(postId, id)}>
              <i className="far fa-times-circle"></i></span>}
        </p>
      </div>
    )
  }
}

export default Comment;