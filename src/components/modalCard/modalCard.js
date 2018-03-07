import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import CommentsList from '../commentsList/commentsList';
import EditField from '../editField/editField';
import EditBox from '../editBox/editBox';

class ModalCard extends Component {
  state = {
    editField: false,
  };

  showEditField = () => {
    this.setState({
      editField: true,
    });
  };

  handleEditDescriptionEdit = (text) => {
   // console.log(this.props);
    this.props.onEditDescription(text, this.props.card);
    this.setState({
      editField: false,
    });
  };

  render() {
      //console.log(this.props.description, this.props.card )
    return (
      <Modal
        {...this.props}
        bsSize="large"
        aria-labelledby="contained-modal-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">
            {/*{this.props.colname}*/}
            <EditBox
              onHeaderChange={this.props.onColHeaderChange}
              heading={this.props.colname}
              clickable
              column={this.props.column}
            />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="header">
            <div className='user'>
              <i>created by <b>{this.props.user}</b></i>
            </div>
            <EditBox
              heading={this.props.title}
              onHeaderChange={this.props.onCardHeaderChange}
              clickable
              card={this.props.card}
            />
          </div>
          <div className="description-box">
            {!this.state.editField ? (
              <div className="group">
                <div className="description">{this.props.description}</div>
                <button className="btn-link btn-link_secondary" onClick={this.showEditField}>
                  Edit description
                </button>
              </div>
            ) : (
              <EditField currentText={this.props.description} onEditText={this.handleEditDescriptionEdit}/>
            )}
          </div>
          <CommentsList
            onAddComment={this.props.onAddComment}
            onRemoveComment={this.props.onRemoveComment}
            onEditComment={this.props.onEditComment}
            commentids={this.props.commentids}
            comments={this.props.comments}
            cardId={this.props.card}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ModalCard;
