import React, { Component } from 'react';
import { Col, Button } from 'react-bootstrap';
import CardList from '../cardList/cardList';
import CardListItem from '../cardListItem/cardListItem';
import EditBox from '../editBox/editBox';

class ColumnsListItem extends Component {
  state = {
    text: '',
  };

  inputHandle = e => {
    this.setState({
      text: e.target.value,
    });
  };

  onAddClick = (columnId, userId )=> {
    if(this.state.text){
      this.props.onCreateCard(this.state.text, columnId, userId);
      this.setState({ text: '' });
    } else {
      return false
    }
  };

  handleKeyPress = (e) => {
    if(e.key === 'Enter'){
      this.onAddClick( this.props.columnCurrent, this.props.currentUser.id);
      this.setState({ text: '' });
    }
  };

  render() {
    const remark = 'vvedite nazvanie kolonki';
    const todoList = this.props;
    const { columns, currentUser, cards } = todoList;
    const columnCurrent = columns[this.props.columnCurrent];
    return (
      <Col md={3} key={columnCurrent}>
        <div className="col">
          <EditBox
            onHeaderChange={this.props.onColHeaderClick}
            heading={columnCurrent.name}
            remark={remark}
            clickable
            column={columnCurrent}
          />
          <CardList
            columnCurrent={columnCurrent}
            columnCards={columnCurrent.cards}
            cards={cards}
            cardRenderer={card => (
              <CardListItem
                key={columnCurrent}
                onColHeaderClick={this.props.onColHeaderClick}
                onCardHeaderChange={this.props.onCardHeaderChange}
                currentUser={currentUser}
                users={this.props.users}
                column={this.props.columnCurrent}
                onRemoveCard={this.props.onRemoveCard}
                colname={columnCurrent.name}
                comments={this.props.comments}
                onAddComment={this.props.onAddComment}
                onRemoveComment={this.props.onRemoveComment}
                onEditComment={this.props.onEditComment}
                onEditDescription={this.props.onEditDescription}
              />
            )}
          />
          <input
            type="text"
            value={this.state.text}
            onChange={this.inputHandle}
            onKeyPress={this.handleKeyPress}
          />
          <Button bsStyle="success" onClick={() => this.onAddClick(this.props.columnCurrent, currentUser.id)}>
            Add Card
          </Button>
        </div>
      </Col>
    );
  }
}

export default ColumnsListItem;
