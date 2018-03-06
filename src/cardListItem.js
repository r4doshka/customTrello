import React, { Component } from 'react';
import { Glyphicon } from 'react-bootstrap';
import ModalCard from './modalCard';
import EditBox from './editBox';

class CardListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      showInput: false
    };
  }

  handleRemove = () => {
    //console.log(this.props.column)
    this.props.onRemoveCard(this.props.card.id, this.props.column);
  };

  modalShowHandle = (e) => {
    e.nativeEvent.stopImmediatePropagation();
    this.setState({ modal: true });
  };

  modalHideHandle = () => {
    this.setState({ modal: false });
  };

  render() {
    const remark = 'vvedite nazvanie karto4ki';
    const card = this.props.card;
    const { id, name, description, comments } = card;
     //console.log(this.props.user)
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
          <div className="card__description">
            {description}
          </div>
          <div className="card__group">
            <div className="card__count">
              <Glyphicon glyph="comment" /> &nbsp;
              <span>{comments.length}</span>
            </div>
            <div className="card__name">
              <div className="author">Author : {this.props.user ? this.props.user : ' '}</div>
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
          onColHeaderChange={this.props.onColHeaderChange}
          onCardHeaderChange={this.props.onCardHeaderChange}
          onAddComment={this.props.onAddComment}
          onRemoveComment={this.props.onRemoveComment}
          onEditComment={this.props.onEditComment}
          onEditDescription={this.props.onEditDescription}
          show={this.state.modal}
          onHide={this.modalHideHandle}
          description={description}
          title={name}
          colname={this.props.colname}
          card={id}
          user={this.props.user}
          commentids={comments}
          comments={this.props.comments}
        />
      </div>
    );
  }
}

export default CardListItem;
