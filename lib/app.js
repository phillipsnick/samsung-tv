var SerialPort = require("serialport").SerialPort

/**
 * Create the connection to the TV
 *
 * @param   object  options
 */
function tv(options) {
  this.options = options;

  if (typeof options.port === "undefined") {
    throw "Please define a port such as /dev/ttyS0";
  }

  this.session = new SerialPort(options.port, {
    baudrate: 9600
  });
}

module.exports = tv;

/**
 * Power toggle the TV
 */
tv.prototype.powerToggle = function() {

};

/**
 * Power the TV on/off
 *
 * @param   bool    state
 */
tv.prototype.power = function(state) {

}

tv.prototype.volumeUp = function() {

}

tv.prototype.volumeDown = function() {

}

tv.prototype.volume = function(value) {

}

tv.prototype.volumeMute = function() {

}

tv.prototype.getSession = function() {

}

/**
 * Close the serial session
 */
tv.prototype.close = function() {
  this.session.close();
}