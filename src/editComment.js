import React, {Component} from "react";
import { Button, Glyphicon } from 'react-bootstrap';


class EditComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: props.currentText,
    };
  }

  handleText = e => {
    this.setState({ input: e.target.value });
  //  console.log(this.state.input)
  };

  handleEditComment = () => {
    // console.log(this.props.type)
    this.props.onEditComment(this.state.input);
  };

  render() {
    //console.log(this.props)
    return (
      <div className="edit-panel">
        <div className="edit-box">
          <p className="edit-box_title">Ykajite Text</p>
          <div className="edit-box__group">
              <textarea
                value={this.state.input}
                className="textfield"
                onChange={this.handleText}
              />
            <Button bsStyle="success" onClick={this.handleEditComment}>
              Apply
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default EditComment;