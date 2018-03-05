import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Comments from './comments';

class ModalCard extends Component {
  render() {
  //  console.log(this.props.comments[this.props.commentIds], )
    return (
      <Modal
        {...this.props}
        bsSize="large"
        aria-labelledby="contained-modal-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">
            {this.props.colname}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="header">
            <h4>{this.props.title}</h4>
          </div>
          <div className="description">
            <p>{this.props.description}</p>
          </div>
          <Comments addCommentHandle={this.props.addCommentHandle} commentids={this.props.commentids} comments={this.props.comments} cardId={this.props.card}/>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ModalCard;
