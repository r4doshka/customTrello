import React, {Component} from "react";
import { Grid, Row } from 'react-bootstrap';

class ColumnsList extends Component {
  renderColumns(columnsIds) {
   // console.log(columnsIds)
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
        <Row>{this.renderColumns(columnsIds)}</Row>
      </Grid>
    );
  }
}


export default ColumnsList;