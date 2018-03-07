import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import '../styles/App.css';
import uuid from 'uuid/v1';
import ColumnsList from '../components/columnsList';
import ColumnsListItem from '../components/columnsListItem';
import ModalRegistration from '../components/modalRegistration';
import normalizeData from '../data';
import {updateColumnHeader, createCard} from '../reducers/actions';

const savedData = JSON.parse(localStorage.getItem('todoList'));
const data = normalizeData();
const entities = savedData || data;
const currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

//console.log(data)

const mapStateToProps = state => {
  return {
    columns: state.columns,
    columnsIds: state.columnsIds,
    cards: state.cards,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        updateColumnHeader,
        createCard
      },
      dispatch,
    ),
  };
};


class App extends Component {
  state = {
    //columnsIds: entities.result,
  //  columns: entities.entities.columns,
   // cards: entities.entities.cards,
    comments: entities.entities.comments,
    users: entities.entities.users,
    input: ' ',
    modal: false,
    currentUser: currentUser,
  };

  componentWillMount() {
    if(!currentUser){
      this.modalShowHandle();
    }
  }

  modalShowHandle = () => {
    this.setState({
      modal: true,
    });
  };

  modalHideHandle = () => {
    this.setState({
      modal: false,
    });
  };

  onCreateUser = ({ fullName, id }) => {
    this.setState(
      {
        users: {
          ...this.state.users,
          [id]: {
            id,
            fullName,
            avatarUrl: '',
          },
        },
        currentUser: fullName,
      },
      () => {
        this.saveChanges();
        this.updateChanges();
      },
    );
  };

  handlePickUser = id => {
    const currentUser = this.state.users[id].fullName;
    this.setState(
      {
        currentUser: currentUser,
        modal: false,
      },
      localStorage.setItem(
        'currentUser',
        JSON.stringify(this.state.currentUser),
      ),
    );
  };

  updateChanges() {
    const cachedColumns = JSON.parse(localStorage.getItem('todoList'));
    //   console.log(cachedColumns, this.state);
    if (cachedColumns) {
      this.setState({ entities: cachedColumns.entities });
    }
    // console.log('update ', this.state)
  }

  saveChanges() {
    // console.log('save ',this.state)
    localStorage.setItem(
      'todoList',
      JSON.stringify({
        result: this.state.columnsIds,
        entities: {
          columns: this.state.columns,
          cards: this.state.cards,
          comments: this.state.comments,
          users: this.state.users,
        },
      }),
    );
  }

  handleInput = e => {
    this.setState({ input: e.target.value });
  };

  handleCreateCard = (text, columnId) => {
    const CardId = uuid();
    this.props.actions.createCard({text, columnId, CardId});

    // this.setState(
    //   {
    //     cards: {
    //       ...this.state.cards,
    //       [newCardId]: {
    //         id: newCardId,
    //         name: text,
    //         description: '',
    //         comments: [],
    //         user: uuid(),
    //       },
    //     },
    //     columns: {
    //       ...this.state.columns,
    //       [id]: {
    //         ...this.state.columns[id],
    //         cards: [...this.state.columns[id].cards, newCardId],
    //       },
    //     },
    //   },
    //   () => {
    //     //console.log('posle sozdaniya', this.state.cards, this.state.columns);
    //     this.saveChanges();
    //     this.updateChanges();
    //   },
    // );
  };

  handleRemoveCard = (cardId, columnId) => {
    const cards = { ...this.state.cards };
    delete cards[cardId];

    this.setState(
      {
        cards,
        columns: {
          ...this.state.columns,
          [columnId]: {
            ...this.state.columns[columnId],
            cards: [
              ...this.state.columns[columnId].cards.filter(card => {
                //console.log( this.state.columns[columnId].cards)
                return card !== cardId;
              }),
            ],
          },
        },
      },
      () => {
        // console.log('posle udaleniya ', this.state);
        this.saveChanges();
        this.updateChanges();
      },
    );
  };

  handleColHeaderChange = (newHeader, id) => {
    this.props.actions.updateColumnHeader({newHeader, id});
  };

  handleCardHeaderChange = (newHeader, id) => {
    //console.log(newHeader, id, this.state.cards[id] );
    this.setState(
      {
        cards: {
          ...this.state.cards,
          [id]: {
            ...this.state.cards[id],
            name: newHeader,
          },
        },
      },
      () => {
        this.saveChanges();
        this.updateChanges();
      },
    );
  };

  handleCommentAdd = (text, id) => {
    //   console.log(this.state.comments);
    const newCommentId = uuid();
    this.setState(
      {
        comments: {
          ...this.state.comments,
          [newCommentId]: {
            id: newCommentId,
            text: text,
            user: uuid(),
          },
        },
        cards: {
          ...this.state.cards,
          [id]: {
            ...this.state.cards[id],
            comments: [...this.state.cards[id].comments, newCommentId],
          },
        },
      },
      () => {
        this.saveChanges();
        this.updateChanges();
      },
    );
  };

  handleCommentRemove = (commentId, cardId) => {
    const comments = { ...this.state.comments };
    // console.log(comments, comments[commentId]);
    delete comments[commentId];
    this.setState(
      {
        comments,
        cards: {
          ...this.state.cards,
          [cardId]: {
            ...this.state.cards[cardId],
            comments: [
              ...this.state.cards[cardId].comments.filter(comment => {
                return comment !== commentId;
              }),
            ],
          },
        },
      },
      () => {
        //    console.log('posle udaleniya comenta', this.state.comments);
        this.saveChanges();
        this.updateChanges();
      },
    );
  };

  handleCommentEdit = (text, commentId) => {
    //  console.log(this.state);
    this.setState(
      {
        comments: {
          ...this.state.comments,
          [commentId]: {
            ...this.state.comments[commentId],
            text: text,
          },
        },
      },
      () => {
        this.saveChanges();
        this.updateChanges();
      },
    );
  };

  handleDescriptionEdit = (text, id) => {
    //console.log(text, id)
    this.setState(
      {
        cards: {
          ...this.state.cards,
          [id]: {
            ...this.state.cards[id],
            description: text,
          },
        },
      },
      () => {
        this.saveChanges();
        this.updateChanges();
      },
    );
  };

  render() {
    console.log('pered renderom cart ', this.props.cards);
     // console.log('pered renderom column ', this.props.columns);
   // console.log('pered renderom coments ', this.state.comments);
    // console.log('tekyshii user', this.state.currentUser);

    return (
      <div className="dashboard">
        <ColumnsList
          columnsIds={this.props.columnsIds}
          columns={this.props.columns}
          cards={this.props.cards}
          columnRenderer={(column, index) => (
            <ColumnsListItem
              columnCurrent={column}
              user={this.state.currentUser}
              key={index}
              comments={this.state.comments}
              onRemoveCard={this.handleRemoveCard}
              onCreateCard={this.handleCreateCard}
              onEnter={this.handleInput}
              onColHeaderChange={text =>
                this.handleColHeaderChange(text, column)
              }
              onCardHeaderChange={this.handleCardHeaderChange}
              onAddComment={this.handleCommentAdd}
              onRemoveComment={this.handleCommentRemove}
              onEditComment={this.handleCommentEdit}
              onEditDescription={this.handleDescriptionEdit}
            />
          )}
        />
        <ModalRegistration
          modalProps={{
            show: this.state.modal,
            onHide: this.modalHideHandle,
          }}
          onCreateUser={this.onCreateUser}
          onPickUser={this.handlePickUser}
          users={this.state.users}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
