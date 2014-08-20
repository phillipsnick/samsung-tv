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

/**
 * Set the picture mode
 *  0 - Dynamic
 *  1 - Standard
 *  2 - Movie
 *  3 - Natural
 *  4 - Cal night
 *  5 - Cal day
 *  6 - BD Wise
 *
 * @param   int       mode
 * @param   function  callback
 */
tv.prototype.pictureMode = function(mode, callback) {

}

/**
 * Set the backlight level (0-20)
 *
 * @param   int       value
 * @param   function  callback
 */
tv.prototype.setBacklight = function(value, callback) {

}

/**
 * Set the contrast level (0-100)
 *
 * @param   int       value
 * @param   function  callback
 */
tv.prototype.setContrast = function(value, callback) {

}

/**
 * Set the brightness level (0-100)
 *
 * @param   int       value
 * @param   function  callback
 */
tv.prototype.setBrightness = function(value, callback) {

}

/**
 * Set the sharpness level (0-100)
 *
 * @param   int       value
 * @param   function  callback
 */
tv.prototype.setSharpness = function(value, callback) {

}

/**
 * Set the colour level (0-100)
 *
 * @param   int       value
 * @param   function  callback
 */
tv.prototype.setColour = function(value, callback) {

}

/**
 * Set the tint level (0-100)
 *
 * @param   int       value
 * @param   function  callback
 */
tv.prototype.setTint = function(value, callback) {

}

/**
 * Set the black picture tone
 *  0 - Off
 *  1 - Dark
 *  2 - Darker
 *  3 - Darkest
 *
 * @param   int       mode
 * @param   function  callback
 */
tv.prototype.pictureBlackTone = function(mode, callback) {

}

/**
 * Set the dynamic contrast mode
 *  0 - Off
 *  1 - Low
 *  2 - Medium
 *  3 - High
 *
 * @param   int       mode
 * @param   function  callback
 */
tv.prototype.pictureDynamicContrast = function(mode, callback) {

}

/**
 * Set the shadow detail level (-2 - 2)
 *
 * @param   int       value
 * @param   function  callback
 */
tv.prototype.pictureShadowDetail = function(value, callback) {

}

/**
 * Set the shadow detail level (-3 - 3)
 *
 * @param   int       value
 * @param   function  callback
 */
tv.prototype.picutreGamma = function(value, callback) {

}

/**
 * Set the picture size mode
 *  0 - 16:9
 *  1 - Zoom1
 *  2 - Zoom2
 *  3 - Wide fit
 *  4 - Screen fit
 *  5 - Smart view 1
 *  6 - Smart view 2
 *
 * @param   int       size
 * @param   function  callback
 */
tv.prototype.pictureSize = function(size, callback) {

}

/**
 * Set the 3D mode to use
 *  0 - Off
 *  1 - 2D -> 3D
 *  2 - Side by side
 *  3 - Top bottom
 *  4 - Line by line
 *  5 - Vertical line
 *  6 - Checker BD
 *  7 - Frame sequence
 *
 * @param   int       mode
 * @param   function  callback
 */
tv.prototype.set3DMode = function(mode, callback) {

}

/**
 * Set the sound mode
 *  0 - Standard
 *  1 - Music
 *  2 - Movie
 *  3 - Clear voice
 *  4 - Amplify
 *
 * @param   int       mode
 * @param   function  callback
 */
tv.prototype.setSoundMode = function(mode, callback) {

}

/**
 * Send a digit key press (0-9)
 *
 * @param   int       value
 * @param   function  callback
 */
tv.prototype.sendKeyDigit = function(value, callback) {

}

/**
 * Send the ok/enter key press
 *
 * @param   function  callback
 */
tv.prototype.sendKeyOk = function(callback) {

}

/**
 * Send the exit key press
 *
 * @param   function  callback
 */
tv.prototype.sendKeyExit = function(callback) {

}

/**
 * Send the return key press
 *
 * @param   function  callback
 */
tv.prototype.sendKeyReturn = function(callback) {

}

/**
 * Send the more key press
 *
 * @param   function  callback
 */
tv.prototype.sendKeyMore = function(callback) {

}

/**
 * Send the tools key press
 *
 * @param   function  callback
 */
tv.prototype.sendKeyTools = function(callback) {

}

/**
 * Send the info key press
 *
 * @param   function  callback
 */
tv.prototype.sendKeyInfo = function(callback) {

}

/**
 * Send the guide key press
 *
 * @param   function  callback
 */
tv.prototype.sendKeyGuide = function(callback) {

}

/**
 * Send the menu key press
 *
 * @param   function  callback
 */
tv.prototype.sendKeyMenu = function(callback) {

}

/**
 * Send the up key press
 *
 * @param   function  callback
 */
tv.prototype.sendKeyUp = function(callback) {

}

/**
 * Send the down key press
 *
 * @param   function  callback
 */
tv.prototype.sendKeyDown = function(callback) {

}

/**
 * Send the left key press
 *
 * @param   function  callback
 */
tv.prototype.sendKeyLeft = function(callback) {

}

/**
 * Send the right key press
 *
 * @param   function  callback
 */
tv.prototype.sendKeyRight = function(callback) {

}

/**
 * Set the sleep mode
 *
 * @param   function  callback
 */
tv.prototype.sleepMode = function(callback) {

}

/**
 * Send the red key press
 *
 * @param   function  callback
 */
tv.prototype.sendKeyRed = function(callback) {

}

/**
 * Send the green key press
 *
 * @param   function  callback
 */
tv.prototype.sendKeyGreen = function(callback) {

}

/**
 * Send the yellow key press
 *
 * @param   function  callback
 */
tv.prototype.sendKeyYellow = function(callback) {

}

/**
 * Send the blue key press
 *
 * @param   function  callback
 */
tv.prototype.sendKeyBlue = function(callback) {

}

/**
 * Send the channel list key press
 *
 * @param   function  callback
 */
tv.prototype.channelList = function(callback) {

}

/**
 * Get the current serialport session
 *
 * @return  object
 */
tv.prototype.getSession = function() {
  return this.session;
}

/**
 * Close the serial session
 */
tv.prototype.close = function() {
  this.session.close();
}