import React, { Component } from 'react';
import './App.css';
import uuid from 'uuid/v1';
import ColumnsList from './columnsList';
import ColumnsListItem from './columnsListItem';
import ModalRegistration from './modalRegistration';
import normalizeData from './data';

const savedData = JSON.parse(localStorage.getItem('todoList'));
const data = normalizeData();
const entities = savedData || data;

// console.log('tekushie', entities);
//console.log('sohranennie', savedData);
//console.log('na4alnie', data);

class App extends Component {
  state = {
    columnsIds: entities.result,
    columns: entities.entities.columns,
    cards: entities.entities.cards,
    comments: entities.entities.comments,
    users: entities.entities.users,
    input: ' ',
    modal: false,
    currentUser: ' ',
  };

  componentWillMount() {
    // this.updateColumns();
    // this.updateColHeader();
    // this.modalShowHandle();
    //console.log('on mount', this.state.cards);
    // console.log(this.state.columns);
    //console.log('was ', this.state.columns);
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
    // console.log('zakrito')
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

  onPickUser = name => {
    // this.setState({
    //   currentUser: name,
    // })
    console.log(name);
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

  handleCreateCard = (text, id) => {
    const newCardId = uuid();
    this.setState(
      {
        cards: {
          ...this.state.cards,
          [newCardId]: {
            id: newCardId,
            name: text,
            description: '',
            comments: [],
            user: uuid(),
          },
        },
        columns: {
          ...this.state.columns,
          [id]: {
            ...this.state.columns[id],
            cards: [...this.state.columns[id].cards, newCardId],
          },
        },
      },
      () => {
        //console.log('posle sozdaniya', this.state.cards, this.state.columns);
        this.saveChanges();
        this.updateChanges();
      },
    );
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
    //console.log(newHeader, id, this.state.columns[id])
    this.setState(
      {
        columns: {
          ...this.state.columns,
          [id]: {
            ...this.state.columns[id],
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

  render() {
    // console.log('pered renderom cart ', this.state.cards);
    //  console.log('pered renderom column ', this.state.columns);
    //console.log('pered renderom coments ', this.state.comments);
    return (
      <div className="dashboard">
        <ColumnsList
          columnsIds={this.state.columnsIds}
          columns={this.state.columns}
          cards={this.state.cards}
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
            />
          )}
        />
        <ModalRegistration
          modalProps={{
            show: this.state.modal,
            onHide: this.modalHideHandle,
          }}
          onCreateUser={this.onCreateUser}
          onPickUser={this.onPickUser}
          users={this.state.users}
        />
      </div>
    );
  }
}

export default App;
