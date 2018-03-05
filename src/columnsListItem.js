import React, { Component } from 'react';
import { Col, Button } from 'react-bootstrap';
import CardList from './cardList';
import CardListItem from './cardListItem';
import EditBox from './editBox';

class ColumnsListItem extends Component {
  state = {
    text: '',
  };

  inputHandle = e => {
    this.setState({
      text: e.target.value,
    });
  };

  onAddClick = id => {
   //  console.log( id);
   this.props.onCreateCard(this.state.text, id);
   this.setState({ text: '' });
  };

  render() {
    const remark = 'vvedite nazvanie kolonki';
    const todoList = this.props;
    const { columns, user, cards } = todoList;
    const columnCurrent = columns[this.props.columnCurrent];

  // console.log(columnCurrent);
    return (
      <Col md={3} key={columnCurrent}>
        <div className="col">
          <EditBox
            onHeaderChange={this.props.onColHeaderChange}
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
                onCardHeaderChange={this.props.onCardHeaderChange}
                user={user}
                column={this.props.columnCurrent}
                onRemoveCard={this.props.onRemoveCard}
                colname={columnCurrent.name}
                comments={this.props.comments}
                addCommentHandle={this.props.addCommentHandle}
              />
            )}
          />
          <input
            type="text"
            value={this.state.text}
            onChange={this.inputHandle}
          />
          <Button bsStyle="success" onClick={() => this.onAddClick(this.props.columnCurrent)}>
            Add Card
          </Button>
        </div>
      </Col>
    );
  }
}

export default ColumnsListItem;
