import React, { Component } from 'react';
import EditField from '../editField/editField';

class CommentsListItem extends Component {
  state = {
    text: '',
    editField: false,
  };

  showEdit = () => {
    this.setState({
      editField: true,
    });
  };

  handleRemoveComment = id => {
    this.props.onRemoveComment(id, this.props.cardId);
  };

  handleEditCommentApply = text => {
    this.props.onEditComment(text, this.props.commentId);
    this.setState({
      editField: false,
    });
  };

  render() {
    const comment = this.props;
    const { commentId, comments } = comment;
    const authorId = comments[commentId].user;
    const author = this.props.users[authorId].fullName;
    return (
      <li className="comments__item">
        {!this.state.editField ? (
          <div className="comments__item-inner">
            <p className="comments__item-description">
              {comments[commentId].text}
            </p>
            <div className="comments__item-controls">
              <button className="btn-link" onClick={this.showEdit}>
                Edit
              </button>
              <button
                className="btn-link"
                onClick={() => this.handleRemoveComment(commentId)}
              >
                Delete
              </button>
            </div>
            <div className="comments__item-author">
              Author: { author }
            </div>
          </div>
        ) : (
          <EditField
            currentText={comments[commentId].text}
            cardId={this.props.cardId}
            onEditText={this.handleEditCommentApply}
          />
        )}
      </li>
    );
  }
}

export default CommentsListItem;
