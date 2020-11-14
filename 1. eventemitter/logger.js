const EventEmitter = require('events');

let url = 'http://mylogger.io/log';

class Logger extends EventEmitter {
  log(message) {
    // send an http request
    console.log(message);

    // raise an event
    this.emit('messageLogged', {
      id: 1,
      url
    })
  }
};

module.exports = Logger;