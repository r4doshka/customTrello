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
     //console.log(comments.length)
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
            <p className="description">{description}</p>
          </div>
          <div className="card__group">
            <div className="card__count">
              <Glyphicon glyph="comment" /> &nbsp;
              <span>{comments.length}</span>
            </div>
            <div className="card__name">
              <div className="author">Author : {this.props.user ? this.props.user.name : ' '}</div>
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
          onAddComment={this.props.onAddComment}
          onRemoveComment={this.props.onRemoveComment}
          onEditComment={this.props.onEditComment}
          show={this.state.modal}
          onHide={this.modalHideHandle}
          description={description}
          title={name}
          colname={this.props.colname}
          card={id}
          commentids={comments}
          comments={this.props.comments}
        />
      </div>
    );
  }
}

export default CardListItem;
