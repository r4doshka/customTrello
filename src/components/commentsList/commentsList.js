import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import CommentsListItem from '../commentsListItem/commentsListItem';
import QueueAnim from 'rc-queue-anim';

class CommentsList extends Component {
  state = {
    text: '',
  };

  handleComment = e => {
    this.setState({
      text: e.target.value,
    });
  };

  handleAddComment = (cardId, userId ) => {
    if(this.state.text){
      this.props.onAddComment(this.state.text, cardId, userId);
      this.setState({
        text: '',
      });
    } else {
      return false;
    }
  };

  handleKeyPress = (e) => {
    if(e.key === 'Enter'){
      e.preventDefault();
      this.handleAddComment(this.props.cardId, this.props.currentUser.id);
    }
  };

  render() {
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
            onKeyPress={this.handleKeyPress}
            placeholder='Enter comment'
          />
          <Button
            bsStyle="success"
            onClick={() => this.handleAddComment(this.props.cardId, this.props.currentUser.id)}
          >
            Add Comment
          </Button>
        </div>
        <ul className="comments">
          {commentsIds.map((comment) => {
            return (
              <QueueAnim  key = {comment} type='top' interval={300} delay={100} duration={100}>
                <CommentsListItem
                  commentId={comment}
                  comments={this.props.comments}
                  users={this.props.users}
                  onRemoveComment={this.props.onRemoveComment}
                  onEditComment={this.props.onEditComment}
                  cardId={this.props.cardId}
                  currentUser={this.props.currentUser}
                />
              </QueueAnim>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default CommentsList;
