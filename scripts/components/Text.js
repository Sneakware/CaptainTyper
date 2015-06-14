'use strict';

import React from 'react';
import moment from 'moment';

import Utils from '../Utils';

var socket = io('localhost:3000');

export default class Text extends React.Component {

  getWpm () {
    var time = moment().diff(this.state.startedAt, 's');
    var keyCount = this.state.text.slice(0, this.state.currentIndex).length;
    return Math.round((keyCount / 5) / (time / 60));
  }

  clear () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  createCursor () {
    this.ctx.fillStyle = (this.state.position === 0) ? Utils.colors('blue') : Utils.colors('green');
    var word = this.state.text.split(' ')[this.state.currentWord];
    var width = this.ctx.measureText(word.slice(0, this.state.position ? this.state.position : 1)).width;
    this.ctx.fillRect(30, this.canvas.height / 2 + 10, width, 5);
  }

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

  componentDidMount () {

    this.canvas = this.refs.textbox.getDOMNode();
    this.ctx = this.canvas.getContext('2d');

    this.canvas.width = window.innerWidth;
    this.canvas.height = 200;

    Utils.doRequest('http://restock.io/api/S').then(function (res) {
      this.setState({
        text: res,
        currentIndex: 0,
        currentWord: 0,
        position: 0,
        errorCount: 0
      });
    }.bind(this));

    window.addEventListener('keypress', this.keyPress.bind(this), false);
  }

  render () {

    if (this.state && this.state.text) { this.draw(); }

    return (
      <canvas ref="textbox" className="textbox"></canvas>
    )
  }

}
