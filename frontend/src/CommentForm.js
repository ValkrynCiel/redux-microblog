import React, { Component } from 'react';
// import './CommentForm.css';

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text:'',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.triggerAddComment(this.props.postId, this.state.text);

    this.setState({text:''});
  }

  render() {
    const unfinished = this.state.text.length === 0;
    return (
      <form className="CommentForm d-flex align-items-center flex-column col-10" onSubmit={this.handleSubmit} >

        <div className="form-group">
          <label htmlFor='text'>Comment:</label><br />
          <input className="col-12"
            id='text'
            name='text'
            value={this.state.text}
            onChange={this.handleChange} />
        </div>

        <button disabled={unfinished} className='btn btn-primary'>Add Comment</button>
      </form>
    );
  }
}

export default CommentForm;