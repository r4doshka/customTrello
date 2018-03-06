import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import CommentsListItem from './commentsListItem';

class CommentsList extends Component {
  state = {
    text: '',
  };

  handleComment = e => {
    this.setState({
      text: e.target.value,
    });
  };

  handleAddComment = id => {
    //console.log('1');
    this.props.onAddComment(this.state.text, id);
    this.setState({
      text: '',
    });
  };

  render() {
    //   console.log(this.props)
    const commentsIds = this.props.commentids;
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
            onClick={() => this.handleAddComment(this.props.cardId)}
          >
            Add Comment
          </Button>
        </div>
        <ul className="comments">
          {commentsIds.map(comment => {
            return (
              <CommentsListItem
                commentId={comment}
                key={comment}
                comments={this.props.comments}
                onRemoveComment={this.props.onRemoveComment}
                onEditComment={this.props.onEditComment}
                cardId={this.props.cardId}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}

export default CommentsList;
