import React, {Component} from "react";
import { Grid, Row } from 'react-bootstrap';
import QueueAnim from 'rc-queue-anim';

class ColumnsList extends Component {
  renderColumns(columnsIds) {
    return columnsIds.map((id, index) => {
      return React.cloneElement(this.props.columnRenderer(id, index), {
        key: id,
        cards: this.props.cards,
        columns: this.props.columns,
        columnIds:columnsIds,
        columnCurrent: id
      });
    });
  }

  render() {
    const columnsIds = this.props.columnsIds;
    return (
      <Grid>
        <Row>
          <QueueAnim type='right' interval={500} delay={100} duration={500}>{this.renderColumns(columnsIds)}</QueueAnim>
        </Row>
      </Grid>
    );
  }
}


export default ColumnsList;