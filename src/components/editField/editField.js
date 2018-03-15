import React, { Component } from 'react';
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
  };

  handleEdit = () => {
    this.props.onEditText(this.state.input);
  };

  handleKeyPress = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.handleEdit(this.state.input);
    }
  };

  handleFocus = e => {
    e.target.select();
  };

  componentDidMount() {
    this.description.focus();
  }

  render() {
    return (
      <div className="edit-panel">
        <div className="edit-box">
          <p className="edit-box_title">Ykajite Text</p>
          <div className="edit-box__group">
            <textarea
              value={this.state.input}
              className="textfield"
              onChange={this.handleText}
              onKeyPress={this.handleKeyPress}
              ref={textarea => {
                this.description = textarea;
              }}
              onFocus={this.handleFocus}
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
