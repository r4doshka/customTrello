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

  handleEditDescription = text => {
    this.props.onEditDescription(text, this.props.card);
    this.setState({
      editField: false,
    });
  };

  handleKeyPress = e => {
    if (e.keyCode === 27) {
      this.props.onHide();
    }
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress, false);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress, false);
  }

  render() {
    return (
      <Modal
        show={this.props.show}
        onClick={this.props.onShow}
        bsSize="large"
        aria-labelledby="contained-modal-title-lg"
        onKeyPress={this.handleKeyPress}
      >
        <Modal.Header>
          <button className="close" onClick={this.props.onHide}>
            x
          </button>
          <Modal.Title id="contained-modal-title-lg">
            <EditBox
              onHeaderChange={this.props.onColHeaderClick}
              heading={this.props.colname}
              clickable
              column={this.props.column}
            />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="header">
            <div className="user">
              <i>
                created by <b>{this.props.author.fullName}</b>
              </i>
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
                <button
                  className="btn-link btn-link_secondary"
                  onClick={this.showEditField}
                >
                  Edit description
                </button>
              </div>
            ) : (
              <EditField
                currentText={this.props.description}
                onEditText={this.handleEditDescription}
              />
            )}
          </div>
          <CommentsList
            onAddComment={this.props.onAddComment}
            onRemoveComment={this.props.onRemoveComment}
            onEditComment={this.props.onEditComment}
            commentids={this.props.commentids}
            comments={this.props.comments}
            cardId={this.props.card}
            users={this.props.users}
            author={this.props.author}
            currentUser={this.props.currentUser}
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
