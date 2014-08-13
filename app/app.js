var SerialPort = require("serialport").SerialPort

/**
 * Create the connection to the TV
 *
 * @param options
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

exports.tv = tv;

