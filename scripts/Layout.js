'use strict';

import React from 'react';
import { RouteHandler } from 'react-router';
import Modal from 'react-modal';

import Navbar from './Navbar';
import Utils from './Utils';

export default class Layout extends React.Component {

  /**
   * Update the username temporary value
   */
  changeUsername (e) {
    this.setState({ username: e.target.value });
  }

  /**
   * Dispatch new username to the store and close the modal
   */
  saveUsername () {
    Utils.dispatcher().dispatch({
      eventType: 'saveUsername',
      username: this.state.username
    });

    this.setState({ usernameModal: false });
  }

  /**
   * Call save method on enter
   */
  saveOnEnter (e) {
    if (e.key === 'Enter') { this.saveUsername(); }
  }

  /**
   * Toggle the modal of the username change
   */
  toggleUsernameModal (e) {
    this.setState({
      usernameModal: e === true ? false : !this.state.usernameModal
    });
  }

  /**
   * Get the username to show it in the navbar and disable modal
   */
  componentWillMount () {
    this.setState({
      username: Utils.getUsername(),
      usernameModal: false
    });
  }

  /**
   * Listen for the toggle modal event of the dispatcher
   */
  componentDidMount () {

    var events = {
      toggleUsernameModal: this.toggleUsernameModal.bind(this)
    };

    Utils.dispatcher().register(payload => {
      if (!events[payload.eventType]) { return; }
      events[payload.eventType](payload);
    });
  }

  render () {

    return (
      <div>
        <Navbar/>
        <RouteHandler/>
        <Modal
          isOpen={ this.state.usernameModal }
          onRequestClose={ this.toggleUsernameModal.bind(this, true) }
        >
          <h1 className="marged-bottom">Change your username</h1>
          <input
            onKeyPress={ this.saveOnEnter.bind(this) }
            onChange={ this.changeUsername.bind(this) } type="text"
          />
          <button onClick={ this.saveUsername.bind(this) }>Save</button>
        </Modal>
      </div>
    );
  }

};
