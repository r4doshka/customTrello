import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import '../styles/App.css';
import uuid from 'uuid/v1';
import ColumnsList from '../components/columnsList';
import ColumnsListItem from '../components/columnsListItem';
import ModalRegistration from '../components/modalRegistration';
import {
  updateColumnHeader,
  createCard,
  removeCard,
  updateCardHeader,
  createComment,
  removeComment,
  editComment,
  editCardDescription,
  createUser,
  pickUser,
  logout,
} from '../reducers/actions';

import { currentUserSelector } from "../selectors";

const mapStateToProps = state => {
  return {
    columns: state.columns,
    columnsIds: state.columnsIds,
    cards: state.cards,
    comments: state.comments,
    users: state.users,
    currentUser: currentUserSelector(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        updateColumnHeader,
        createCard,
        removeCard,
        updateCardHeader,
        createComment,
        removeComment,
        editComment,
        editCardDescription,
        createUser,
        pickUser,
        logout
      },
      dispatch,
    ),
  };
};

class App extends Component {
  state = {
    input: ' ',
  };

  onCreateUser = ({ fullName, id }) => {
    this.props.actions.createUser({ fullName, id });
  };

  handlePickUser = id => {
    this.props.actions.pickUser({id});
  };

  handleInput = e => {
    this.setState({ input: e.target.value });
  };

  handleCreateCard = (text, columnId, userId) => {
    const CardId = uuid();
    this.props.actions.createCard({ text, columnId, CardId, userId });
  };

  handleRemoveCard = (cardId, columnId) => {
    this.props.actions.removeCard({ cardId, columnId });
  };

  handleColHeaderChange = (newHeader, id) => {
    this.props.actions.updateColumnHeader({ newHeader, id });
  };

  handleCardHeaderChange = (newHeader, id) => {
    this.props.actions.updateCardHeader({ newHeader, id });
  };

  handleCommentAdd = (text, cardId, userId) => {
    const newCommentId = uuid();
    this.props.actions.createComment({ text, cardId, newCommentId, userId });
  };

  handleCommentRemove = (commentId, cardId) => {
    this.props.actions.removeComment({ commentId, cardId });
  };

  handleCommentEdit = (text, commentId) => {
    this.props.actions.editComment({ text, commentId });
  };

  handleDescriptionEdit = (text, id) => {
    this.props.actions.editCardDescription({ text, id });
  };

  handleExit = () =>{
    this.props.actions.logout();
  };

  render() {
    return (
      <div className="dashboard">
        <button className="btn btn-action" onClick={this.handleExit}>Log OUT</button>
        {!!this.props.currentUser && <ColumnsList
          columnsIds={this.props.columnsIds}
          columns={this.props.columns}
          cards={this.props.cards}
          columnRenderer={(column, index) => (
            <ColumnsListItem
              columnCurrent={column}
              users={this.props.users}
              currentUser={this.props.currentUser}
              key={index}
              comments={this.props.comments}
              onRemoveCard={this.handleRemoveCard}
              onCreateCard={this.handleCreateCard}
              onEnter={this.handleInput}
              onColHeaderClick={text =>
                this.handleColHeaderChange(text, column)
              }
              onCardHeaderChange={this.handleCardHeaderChange}
              onAddComment={this.handleCommentAdd}
              onRemoveComment={this.handleCommentRemove}
              onEditComment={this.handleCommentEdit}
              onEditDescription={this.handleDescriptionEdit}
            />
          )}
        />}
        <ModalRegistration
          modalProps={{
            show: !this.props.currentUser,
            onHide: this.modalHideHandle,
          }}
          onCreateUser={this.onCreateUser}
          onPickUser={this.handlePickUser}
          users={this.props.users}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
