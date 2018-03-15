import React, { Component } from 'react';
import { Button, Glyphicon } from 'react-bootstrap';

class EditBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: props.heading,
    };
  }

  showInput = e => {
    e.stopPropagation();
    this.setState({
      input: this.props.heading,
      headingEdit: true,
    });
  };

  handleHeader = e => {
    this.setState({ input: e.target.value });
  };

  applyHeader = () => {
    if (this.state.input) {
      if (!this.props.card) {
        this.props.onHeaderChange(this.state.input, this.props.column);
      } else {
        this.props.onHeaderChange(this.state.input, this.props.card);
      }
      this.setState({
        headingEdit: false,
        input: '',
      });
    } else {
      if (!this.props.card) {
        this.props.onHeaderChange(this.props.heading, this.props.column);
      } else {
        this.props.onHeaderChange(this.state.input, this.props.card);
      }
      this.setState({
        headingEdit: false,
        input: '',
      });
    }
  };

  handleKeyPress = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.applyHeader();
    }
  };

  handleFocus = e => {
    e.target.select();
  };

  render() {
    return (
      <div className="header-group">
        {!this.state.headingEdit ? (
          <div
            className="heading"
            onClick={
              this.props.clickable
                ? this.showInput
                : e => {
                    e.preventDefault();
                  }
            }
          >
            {this.props.heading}
          </div>
        ) : (
          <div
            className="edit-box"
            onClick={e => {
              e.stopPropagation();
            }}
          >
            <p className="edit-box_title">{this.props.remark}</p>
            <div className="edit-box__group">
              <input
                type="text"
                value={this.state.input}
                className="edit-box__field"
                onChange={this.handleHeader}
                onKeyPress={this.handleKeyPress}
                ref={input => input && input.focus()}
                onFocus={this.handleFocus}
              />
              <Button bsStyle="success" onClick={this.applyHeader}>
                <Glyphicon glyph="ok" />
              </Button>
            </div>
          </div>
        )}
        {!this.props.clickable ? (
          <button
            className="btn-custom btn-custom_edit "
            onClick={this.showInput}
          >
            <Glyphicon glyph="edit" />
          </button>
        ) : (
          ''
        )}
      </div>
    );
  }
}

export default EditBox;
