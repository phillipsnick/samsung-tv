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
 * @param   bool      state
 * @param   function  callback
 */
tv.prototype.power = function(state, callback) {

}

/**
 * Increase volume up by 1
 *
 * @param   function  callback
 */
tv.prototype.volumeUp = function(callback) {

}

/**
 * Decrease volume up by 1
 *
 * @param   function  callback
 */
tv.prototype.volumeDown = function(callback) {

}

/**
 * Set the volume to a specific level
 *
 * @param   int       value       (0-100)
 * @param   function  callback
 */
tv.prototype.volume = function(value, callback) {

}

/**
 * Toggle volume mute
 *
 * @param   function  callback
 */
tv.prototype.volumeMute = function(callback) {

}

/**
 * Go to the next channel in the list
 *
 * @param   function  callback
 */
tv.prototype.channelUp = function(callback) {

}

/**
 * Go to the previous channel in the list
 *
 * @param   function  callback
 */
tv.prototype.channelDown = function(callback) {

}

/**
 * Go to the previous channel
 *
 * @param   function  callback
 */
tv.prototype.channelPrevious = function(callback) {

}

/**
 * Go to a specific channel number
 *
 * @param   function  callback
 */
tv.prototype.channel = function(value, callback) {

}

/**
 * Set the source to the TV
 *
 * @param   function  callback
 */
tv.prototype.sourceTv = function(callback) {

}

/**
 * Set the source to the AV input (1-3)
 *
 * @param   int       value
 * @param   function  callback
 */
tv.prototype.sourceAv = function(value, callback) {

}

/**
 * Set the source to the component input (1-3)
 *
 * @param   int       value
 * @param   function  callback
 */
tv.prototype.sourceComponent = function(value, callback) {

}

/**
 * Set the source to the PC input
 *
 * @param   function  callback
 */
tv.prototype.sourcePc = function(callback) {

}

/**
 * Set the source to the HDMI input (1-4)
 *
 * @param   int       value
 * @param   function  callback
 */
tv.prototype.sourceHdmi = function(value, callback) {

}

/**
 * Set the source to the Samsung Smart Hub
 *
 * @param   function  callback
 */
tv.prototype.sourceSmartHub = function(callback) {

}

tv.prototype.pictureMode = function(mode, callback) {

}

tv.prototype.setBacklight = function(value, callback) {

}

tv.prototype.setContrast = function(value, callback) {

}

tv.prototype.setBrightness = function(value, callback) {

}

tv.prototype.setSharpness = function(value, callback) {

}

tv.prototype.setColour = function(value, callback) {

}

tv.prototype.setTint = function(value, callback) {

}

tv.prototype.pictureBlackTone = function(mode, callback) {

}

tv.prototype.pictureDynamicContrast = function(mode, callback) {

}

tv.prototype.pictureShadowDetail = function(value, callback) {

}

tv.prototype.picutreGamma = function(value, callback) {

}

tv.prototype.pictureSize = function(size, callback) {

}

tv.prototype.set3DMode = function(mode, callback) {

}

tv.prototype.setSoundMode = function(mode, callback) {

}

tv.prototype.sendKeyDigit = function(value, callback) {

}

tv.prototype.sendKeyOk = function(callback) {

}

tv.prototype.sendKeyExit = function(callback) {

}

tv.prototype.sendKeyReturn = function(callback) {

}

tv.prototype.sendKeyMore = function(callback) {

}

tv.prototype.sendKeyTools = function(callback) {

}

tv.prototype.sendKeyInfo = function(callback) {

}

tv.prototype.sendKeyGuide = function(callback) {

}

tv.prototype.sendKeyMenu = function(callback) {

}

tv.prototype.sendKeyUp = function(callback) {

}

tv.prototype.sendKeyDown = function(callback) {

}

tv.prototype.sendKeyLeft = function(callback) {

}

tv.prototype.sendKeyRight = function(callback) {

}

tv.prototype.sleepMode = function(callback) {

}

tv.prototype.sendKeyRed = function(callback) {

}

tv.prototype.sendKeyGreen = function(callback) {

}

tv.prototype.sendKeyYellow = function(callback) {

}

tv.prototype.sendKeyBlue = function(callback) {

}

tv.prototype.channelList = function(callback) {

}

tv.prototype.getSession = function() {

}

/**
 * Close the serial session
 */
tv.prototype.close = function() {
  this.session.close();
}