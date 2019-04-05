import React, { Component } from 'react';
// import './VoteCounter.css';

class VoteCounter extends Component {
  constructor(props) {
    super(props);
    this._handleVote = this._handleVote.bind(this);
    this.voteUp = this.voteUp.bind(this);
    this.voteDown = this.voteDown.bind(this);
  }


  voteUp() {
    this._handleVote('up');
  }

  voteDown() {
    this._handleVote('down');
  }

  _handleVote(delta) {
    const { postId } = this.props;
    this.props.updateVote(postId, delta);
  }


  render() {
    const { votes } = this.props;
    return (
    <div>
        <span className="text-success m-1" onClick={ this.voteUp } ><i className="far fa-thumbs-up"></i></span>
        <span className="text-danger m-1" onClick={ this.voteDown } ><i className="far fa-thumbs-down"></i></span>
        <div>votes: {votes}</div>
    </div>
    );
  }
}

export default VoteCounter;