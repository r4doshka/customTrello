import React, { Component } from 'react';
import { Modal, Button, Col, Row } from 'react-bootstrap';
import uuid from 'uuid/v1';

class ModalRegistration extends Component {
  state = {
    input: '',
    currentUser: ''
  };

  handleInput = e => {
    this.setState({ input: e.target.value });
    //   localStorage.setItem('User', JSON.stringify( e.target.value ));
  };

  renderUsers() {
    const users = this.props.users;
    if(users){
      return Object.keys(users).map(key => {
        const user = users[key];
        if(user.fullName){
          return <li key={key} onClick={() => this.pickUser(user.id)}>{user.fullName}</li>;
        }
      });
    }
  }

  createUser = () => {
    const id = uuid();
    this.props.onCreateUser({fullName: this.state.input, id});
    this.setState({
      input: ''
    })
  };

  pickUser = (id) =>{
    this.props.onPickUser(id);
    //console.log(id);
  };

  render() {
    return (
      <Modal {...this.props.modalProps} aria-labelledby="contained-modal-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">
            Welcome to Trello
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <h4>Sozdai</h4>
              <input
                type="text"
                ref={input => input && input.focus()}
                value={this.state.input}
                onChange={this.handleInput}
              />
              <br/>
              <br/>
              <Button onClick={this.createUser}>Create</Button>
              {/*onClick={this.props.onHide}*/}
            </Col>
            <Col md={6}>
              <h4>Viberi</h4>
              <ul className='list'>
                {this.renderUsers()}
              </ul>

            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    );
  }
}

export default ModalRegistration;
