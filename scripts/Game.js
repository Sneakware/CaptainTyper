'use strict';

import React from 'react';

import Utils from './Utils';
import Text from './components/Text';
import View from './components/View';

var socket = io('localhost:3000');

export default class Game extends React.Component {

  componentWillMount () {

    this.setState({
      logged: false,
      serverName: '',
      servers: {}
    });

    // Initialize request for servers list
    socket.emit('list');

    // We got the response of the server list
    socket.on('list', (servers) => {
      this.setState({ servers: servers });
    });

    // Here we got the socket response, dispatch it
    socket.on('launch', data => {
      Utils.dispatcher().dispatch({
        eventType: 'launch',
        text: data.text
      });
    });

  }

  launchServer () {
    socket.emit('launch');
  }

  createServer () {
    if (!this.state.serverName.length) { return ; }

    socket.emit('create', {
      room: this.state.serverName,
      username: Utils.getUsername()
    });

    this.setState({ logged: true, serverName: '' });
  }

  changeServerName (e) {
    this.setState({ serverName: e.target.value });
  }

  switchServer (room) {

    socket.emit('join', {
      room: room,
      username: Utils.getUsername()
    });

    this.setState({ logged: true });
  }

  componentWillUnmount () {
    socket.emit('leave');
  }

  render () {
    if (this.state.logged) {
      return (
        <div>
          <button onClick={ this.launchServer.bind(this) }>TESTING</button>
          <View/>
          <Text/>
        </div>
      );
    }
    else {
      return (
        <div className="server-list--block flex-centered">
          <div>
            <h3 className="marged-bottom">Choose a server, or create one</h3>
            <ul className="marged-bottom">
              {
                Object.keys(this.state.servers).map(name => (
                  <li onClick={ this.switchServer.bind(this, name) }>{ name }</li>
                ))
              }
            </ul>
            <input
              onChange={ this.changeServerName.bind(this) }
              className="marged-right-sm"
              type="text"
            />
            <button onClick={ this.createServer.bind(this) }>Create</button>
          </div>
        </div>
      );
    }
  }

}
