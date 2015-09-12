'use strict';

import React from 'react';
import moment from 'moment';
import classnames from 'classnames';

import Utils from '../Utils';

export default class Text extends React.Component {

  /**
   * Get word per minute score (little buggy)
   */
  getWpm () {
    var time = moment().diff(this.state.startedAt, 's');
    var keyCount = this.state.text.slice(0, this.state.currentIndex).length;
    return Math.round((keyCount / 5) / (time / 60));
  }

  /**
   * Clear all the canvas context
   */
  clear () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * The cursor under the current word status
   */
  createCursor () {
    this.ctx.fillStyle = (this.state.position === 0) ? Utils.colors('blue') : Utils.colors('green');
    var word = this.state.text.split(' ')[this.state.currentWord];
    var width = this.ctx.measureText(word.slice(0, this.state.position ? this.state.position : 1)).width;
    this.ctx.fillRect(30, this.canvas.height / 2 + 10, width, 5);
  }

  /**
   * The keypress event
   *
   * @param e {Event}
   */
  keyPress (e) {
    var c = String.fromCharCode(e.keyCode);
    if (c === this.state.text[this.state.currentIndex]) {
      var word = this.state.text.split(' ')[this.state.currentWord];

      this.setState({
        currentIndex: this.state.currentIndex + 1,
        currentWord: c === ' ' ? this.state.currentWord + 1 : this.state.currentWord,
        position: c === ' ' ? 0 : this.state.position + 1
      });

      if (c === ' ') {
        Utils.dispatcher().dispatch({
          type: 'wordTyped',
          damage: word.length
        });
      }
    } else {
      this.setState({ errorCount: this.state.errorCount + 1 });
    }

    if (!this.state.startedAt) {
      this.setState({ startedAt: moment() });
    }
  }

  /**
   * The text draw
   */
  draw () {
    this.clear();

    var pad = 30;
    var boxHeight = this.canvas.height - 20;
    var typed = this.state.text.split(' ').splice(0, this.state.currentWord).join(' ') + (this.state.currentWord ? ' ' : '');
    var width = this.ctx.measureText(typed).width;

    this.ctx.fillStyle = Utils.colors('back');
    this.ctx.fillRect(10, 10, this.canvas.width - 20, boxHeight);

    this.ctx.globalCompositeOperation = 'source-atop';
    this.ctx.fillStyle = 'white';

    this.ctx.font = '30px monospace';
    this.ctx.fillText(this.state.text, pad - width, boxHeight / 2 + 10);

    this.ctx.fillStyle = Utils.colors('back');
    this.ctx.fillRect(this.canvas.width - pad, 0, pad, this.canvas.height);

    this.ctx.globalCompositeOperation = 'source-over';
    this.createCursor();
  }

  /**
   * Occurs on launch response
   */
  launch (payload) {

    this.setState({ launched: true });

    this.canvas.width = window.innerWidth;
    this.canvas.height = 200;

    // Init basic values
    this.setState({
      text: payload.text,
      currentIndex: 0,
      currentWord: 0,
      position: 0,
      errorCount: 0
    });

  }

  componentWillMount () {
    this.setState({ launched: false });
  }

  componentDidMount () {

    // Events to bind to
    var events = {
      launch: this.launch.bind(this)
    };

    // Register the dispatcher events
    Utils.dispatcher().register(payload => {
      if (!events[payload.eventType]) { return; }
      events[payload.eventType](payload);
    });

    this.canvas = this.refs.textbox.getDOMNode();
    this.ctx = this.canvas.getContext('2d');

    window.addEventListener('keypress', this.keyPress.bind(this), false);
  }

  /**
   * Clear event listerner on destroy
   */
  componentWillUnmount () {
    window.removeEventListener('keypress', this.keyPress);
  }

  render () {

    if (this.state.text) { this.draw(); }

    var canvasClasses = classnames({
      textbox: true,
      hide: this.state.launched === false
    });

    return (
      <div>
        <div className={ this.state.launched ? 'hide' : '' }>Waiting for game launch</div>
        <canvas ref="textbox" className={ canvasClasses }></canvas>
      </div>
    );
  }

}
