import React, {Component} from "react";
import { Button } from 'react-bootstrap';

class EditField extends Component {
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

  handleEdit = () => {
    // console.log(this.props.type)
    this.props.onEditText(this.state.input);
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
            <Button bsStyle="success" onClick={this.handleEdit}>
              Apply
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default EditField;