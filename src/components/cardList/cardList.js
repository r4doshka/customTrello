import React, { Component } from 'react';
import QueueAnim from 'rc-queue-anim';

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
    return <QueueAnim type='top' interval={300} delay={100} duration={500}>{this.renderCards(cards)}</QueueAnim>;
  }
}

export default CardList;
