import React, { Component } from 'react';

class CardList extends Component {
  renderCards(cards) {
  //  console.log(cards)
    return cards.map((id, index) => {
      return React.cloneElement(
        this.props.cardRenderer(this.props.cards[id], index),
        {
          key: id,
          card: this.props.cards[id],
        },
      );
    });
  }
  render() {
    const cards = this.props.columnCards;
    return <div>{this.renderCards(cards)}</div>;
  }
}

export default CardList;
