import React, { Component } from 'react';
import { Glyphicon } from 'react-bootstrap';
import ModalCard from '../modalCard/modalCard';
import EditBox from '../editBox/editBox';

class CardListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      showInput: false,
    };
  }

  handleRemove = () => {
    this.props.onRemoveCard(this.props.card.id, this.props.column);
  };

  modalShowHandle = e => {
    this.setState({ modal: true });
  };

  modalHideHandle = () => {
    this.setState({ modal: false });
  };

  render() {
    const remark = 'vvedite nazvanie karto4ki';
    const card = this.props.card;
    const author = this.props.users[this.props.card.user];
    const { id, name, description, comments } = card;
    return (
      <div className="card">
        <div className="card-inner" onClick={this.modalShowHandle}>
          <div className="card__title">
            <EditBox
              heading={name}
              remark={remark}
              onHeaderChange={this.props.onCardHeaderChange}
              showInput={this.state.showInput}
              card={id}
            />
          </div>
          <div className="card__description">{description}</div>
          <div className="card__group">
            <div className="card__count">
              <Glyphicon glyph="comment" /> &nbsp;
              <span>{comments.length}</span>
            </div>
            <div className="card__name">
              <div className="author">Author: {author.fullName}</div>
            </div>
          </div>
        </div>
        <button
          className="btn-custom btn-custom_remove"
          onClick={this.handleRemove}
        >
          <Glyphicon glyph="remove" />
        </button>
        <ModalCard
          onColHeaderClick={this.props.onColHeaderClick}
          onCardHeaderChange={this.props.onCardHeaderChange}
          onAddComment={this.props.onAddComment}
          onRemoveComment={this.props.onRemoveComment}
          onEditComment={this.props.onEditComment}
          onEditDescription={this.props.onEditDescription}
          show={this.state.modal}
          onShow={this.modalShowHandle}
          onHide={this.modalHideHandle}
          description={description}
          title={name}
          colname={this.props.colname}
          card={id}
          author={author}
          users={this.props.users}
          currentUser={this.props.currentUser}
          commentids={comments}
          comments={this.props.comments}
        />
      </div>
    );
  }
}

export default CardListItem;
