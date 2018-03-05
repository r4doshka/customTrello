import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class Comments extends Component {
  state = {
    text: '',
  };

  renderComments() {
    const comments = this.props.commentids;
    //console.log(comments);
    return comments.map((id, i) => {
      return (
        <li key={i} className="comments__item">
          <p className="comments__item-description">
            {this.props.comments[id].text}
          </p>
          <div className="comments__item-controls">
            <button className='btn-link'>Edit</button>
            <button className='btn-link'>Delete</button>
          </div>
        </li>
      );
    });
  }

  handleComment = e => {
    this.setState({
      text: e.target.value,
    });
  };

  onAddComment = id => {
    console.log('1');
    this.props.addCommentHandle(this.state.text, id);
    this.setState({
      text: '',
    });
  };

  render() {
    // console.log(this.props.cardId)
    return (
      <div className="comments-box">
        <div className="header">
          <h4>Add comment</h4>
        </div>
        <div className="comments-box__group">
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            value={this.state.text}
            className="textfield"
            onChange={this.handleComment}
          />
          <Button
            bsStyle="success"
            onClick={() => this.onAddComment(this.props.cardId)}
          >
            Add Comment
          </Button>
        </div>
        <ul className="comments"> {this.renderComments()} </ul>
      </div>
    );
  }
}

export default Comments;
