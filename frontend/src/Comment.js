import React, { Component } from 'react';

class Comment extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showDeleteButton: false
    }
    this.showDelete = this.showDelete.bind(this);
    this.hideDelete = this.hideDelete.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
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

  async handleDelete() {
    const { id, postId } = this.props;
    await this.props.triggerDeleteComment(postId, id);
  }

  render() {
    const { text } = this.props;
    return (
      <div onMouseEnter={this.showDelete} onMouseLeave={this.hideDelete}>
        <p>{text}
          {this.state.showDeleteButton &&
            <span className="text-danger m-1"
              onClick={ this.handleDelete }>
              <i className="far fa-times-circle"></i></span>}
        </p>
      </div>
    )
  }
}

export default Comment;