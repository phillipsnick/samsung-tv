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
 * Send a command via serial
 */
tv.prototype.send = function(array, callback) {
  if (array.length != 7) {
    callback(new Error('Array must be 7 long'));
    return;
  }

  var buff = new Buffer(array);

  this.session.write(buff, function(err, results) {
    if (err) {
      callback(err);
      return;
    }

    callback();
  });
}

/**
 * Power toggle the TV
 *
 * @param   function  callback
 */
tv.prototype.powerToggle = function(callback) {
  this.send([0x08, 0x22, 0x00, 0x00, 0x00, 0x00, 0xD6], callback);
};

/**
 * Power the TV on/off
 *
 * @param   bool      state
 * @param   function  callback
 */
tv.prototype.power = function(state, callback) {
  switch(state) {
    case true:
      this.send([0x08, 0x22, 0x00, 0x00, 0x00, 0x02, 0xD4], callback);
      break;

    case false:
      this.send([0x08, 0x22, 0x00, 0x00, 0x00, 0x01, 0xD5], callback);
      break;

    default:
      callback(new Error('Invalid power state'));
  }
}

/**
 * Increase volume up by 1
 *
 * @param   function  callback
 */
tv.prototype.volumeUp = function(callback) {
  this.send([0x08, 0x22, 0x01, 0x00, 0x01, 0x00, 0xD4], callback);
}

/**
 * Decrease volume up by 1
 *
 * @param   function  callback
 */
tv.prototype.volumeDown = function(callback) {
  this.send([0x08, 0x22, 0x01, 0x00, 0x02, 0x00, 0xD3], callback);
}

/**
 * Set the volume to a specific level
 *
 * @param   int       value       (0-100)
 * @param   function  callback
 */
tv.prototype.volume = function(value, callback) {
  var hex = value;

  this.send([0x08, 0x22, 0x01, 0x00, 0x00, hex, 0xA3], callback);
}

/**
 * Toggle volume mute
 *
 * @param   function  callback
 */
tv.prototype.volumeMute = function(callback) {
  this.send([0x08, 0x22, 0x02, 0x00, 0x00, 0x00, 0xD4], callback);
}

/**
 * Go to the next channel in the list
 *
 * @param   function  callback
 */
tv.prototype.channelUp = function(callback) {
  this.send([0x08, 0x22, 0x03, 0x00, 0x01, 0x00, 0xD2], callback);
}

/**
 * Go to the previous channel in the list
 *
 * @param   function  callback
 */
tv.prototype.channelDown = function(callback) {
  this.send([0x08, 0x22, 0x03, 0x00, 0x02, 0x00, 0xD1], callback);
}

/**
 * Go to the previous channel
 *
 * @param   function  callback
 */
tv.prototype.channelPrevious = function(callback) {
  this.send([0x08, 0x22, 0x0D, 0x00, 0x00, 0x13, 0xB6], callback);
}

/**
 * Go to a specific channel number
 *
 * @param   function  callback
 */
tv.prototype.channel = function(value, callback) {
  var hex = value;

  this.send([0x08, 0x22, 0x04, 0x00, 0x00, hex, 0xA5], callback);
}

/**
 * Set the source to the TV
 *
 * @param   function  callback
 */
tv.prototype.sourceTv = function(callback) {
  this.send([0x08, 0x22, 0x0A, 0x00, 0x00, 0x00, 0xCC], callback);
}

/**
 * Set the source to the AV input (1-3)
 *
 * @param   int       value
 * @param   function  callback
 */
tv.prototype.sourceAv = function(value, callback) {
  // probably a better way to calculate the 7th checksum bit, but for the sake of a few lines I'm just copy/pasting!
  switch(value) {
    case 1:
      this.send([0x08, 0x22, 0x0A, 0x00, 0x01, 0x00, 0xCB], callback);
      break;

    case 2:
      this.send([0x08, 0x22, 0x0A, 0x00, 0x01, 0x01, 0xCA], callback);
      break;

    case 3:
      this.send([0x08, 0x22, 0x0A, 0x00, 0x01, 0x02, 0xC9], callback);
      break;

    default:
      callback(new Error('Invalid AV input number, range is 1-3'));
  }
}

/**
 * Set the source to the component input (1-3)
 *
 * @param   int       value
 * @param   function  callback
 */
tv.prototype.sourceComponent = function(value, callback) {
  switch(value) {
    case 1:
      this.send([0x08, 0x22, 0x0A, 0x00, 0x03, 0x00, 0xC9], callback);
      break;

    case 2:
      this.send([0x08, 0x22, 0x0A, 0x00, 0x03, 0x01, 0xC8], callback);
      break;

    case 3:
      this.send([0x08, 0x22, 0x0A, 0x00, 0x03, 0x02, 0xC7], callback);
      break;

    default:
      callback(new Error('Invalid compontent input number, range is 1-3'));
  }
}

/**
 * Set the source to the PC input
 *
 * @param   function  callback
 */
tv.prototype.sourcePc = function(callback) {
  this.send([0x08, 0x22, 0x0A, 0x00, 0x04, 0x00, 0xC8], callback);
}

/**
 * Set the source to the HDMI input (1-4)
 *
 * @param   int       value
 * @param   function  callback
 */
tv.prototype.sourceHdmi = function(value, callback) {
  switch(value) {
    case 1:
      this.send([0x08, 0x22, 0x0A, 0x00, 0x05, 0x00, 0xC7], callback);
      break;

    case 2:
      this.send([0x08, 0x22, 0x0A, 0x00, 0x05, 0x01, 0xC6], callback);
      break;

    case 3:
      this.send([0x08, 0x22, 0x0A, 0x00, 0x05, 0x02, 0xC5], callback);
      break;

    case 3:
      this.send([0x08, 0x22, 0x0A, 0x00, 0x05, 0x04, 0xC4], callback);
      break;

    default:
      callback(new Error('Invalid compontent input number, range is 1-3'));
  }
}

/**
 * Set the source to the Samsung Smart Hub
 *
 * @param   function  callback
 */
tv.prototype.sourceSmartHub = function(callback) {
  this.send([0x08, 0x22, 0x0D, 0x00, 0x00, 0x8C, 0x3D], callback);
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
  this.send([0x], callback);
}

/**
 * Set the backlight level (0-20)
 *
 * @param   int       value
 * @param   function  callback
 */
tv.prototype.setBacklight = function(value, callback) {
  this.send([0x], callback);
}

/**
 * Set the contrast level (0-100)
 *
 * @param   int       value
 * @param   function  callback
 */
tv.prototype.setContrast = function(value, callback) {
  this.send([0x], callback);
}

/**
 * Set the brightness level (0-100)
 *
 * @param   int       value
 * @param   function  callback
 */
tv.prototype.setBrightness = function(value, callback) {
  this.send([0x], callback);
}

/**
 * Set the sharpness level (0-100)
 *
 * @param   int       value
 * @param   function  callback
 */
tv.prototype.setSharpness = function(value, callback) {
  this.send([0x], callback);
}

/**
 * Set the colour level (0-100)
 *
 * @param   int       value
 * @param   function  callback
 */
tv.prototype.setColour = function(value, callback) {
  this.send([0x], callback);
}

/**
 * Set the tint level (0-100)
 *
 * @param   int       value
 * @param   function  callback
 */
tv.prototype.setTint = function(value, callback) {
  this.send([0x], callback);
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
  this.send([0x], callback);
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
  this.send([0x], callback);
}

/**
 * Set the shadow detail level (-2 - 2)
 *
 * @param   int       value
 * @param   function  callback
 */
tv.prototype.pictureShadowDetail = function(value, callback) {
  this.send([0x], callback);
}

/**
 * Set the shadow detail level (-3 - 3)
 *
 * @param   int       value
 * @param   function  callback
 */
tv.prototype.picutreGamma = function(value, callback) {
  this.send([0x], callback);
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
  this.send([0x], callback);
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
  this.send([0x], callback);
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
  this.send([0x], callback);
}

/**
 * Send a digit key press (0-9)
 *
 * @param   int       value
 * @param   function  callback
 */
tv.prototype.sendKeyDigit = function(value, callback) {
  this.send([0x], callback);
}

/**
 * Send the ok/enter key press
 *
 * @param   function  callback
 */
tv.prototype.sendKeyOk = function(callback) {
  this.send([0x08, 0x22, 0x0D, 0x00, 0x00, 0x68, 0x61], callback);
}

/**
 * Send the exit key press
 *
 * @param   function  callback
 */
tv.prototype.sendKeyExit = function(callback) {
  this.send([0x08, 0x22, 0x0D, 0x00, 0x00, 0x2D, 0x9C], callback);
}

/**
 * Send the return key press
 *
 * @param   function  callback
 */
tv.prototype.sendKeyReturn = function(callback) {
  this.send([0x08, 0x22, 0x0D, 0x00, 0x00, 0x58, 0x71], callback);
}

/**
 * Send the more key press
 *
 * @param   function  callback
 */
tv.prototype.sendKeyMore = function(callback) {
  this.send([0x08, 0x22, 0x0D, 0x00, 0x00, 0x9C, 0x2D], callback);
}

/**
 * Send the tools key press
 *
 * @param   function  callback
 */
tv.prototype.sendKeyTools = function(callback) {
  this.send([0x08, 0x22, 0x0D, 0x00, 0x00, 0x4B, 0x7E], callback);
}

/**
 * Send the info key press
 *
 * @param   function  callback
 */
tv.prototype.sendKeyInfo = function(callback) {
  this.send([0x08, 0x22, 0x0D, 0x00, 0x00, 0x1F, 0xAA], callback);
}

/**
 * Send the guide key press
 *
 * @param   function  callback
 */
tv.prototype.sendKeyGuide = function(callback) {
  this.send([0x08, 0x22, 0x0D, 0x00, 0x00, 0x4F, 0x7A], callback);
}

/**
 * Send the menu key press
 *
 * @param   function  callback
 */
tv.prototype.sendKeyMenu = function(callback) {
  this.send([0x08, 0x22, 0x0D, 0x00, 0x00, 0x1A, 0xAF], callback);
}

/**
 * Send the up key press
 *
 * @param   function  callback
 */
tv.prototype.sendKeyUp = function(callback) {
  this.send([0x08, 0x22, 0x0D, 0x00, 0x00, 0x60, 0x69], callback);
}

/**
 * Send the down key press
 *
 * @param   function  callback
 */
tv.prototype.sendKeyDown = function(callback) {
  this.send([0x08, 0x22, 0x0D, 0x00, 0x00, 0x61, 0x68], callback);
}

/**
 * Send the left key press
 *
 * @param   function  callback
 */
tv.prototype.sendKeyLeft = function(callback) {
  this.send([0x08, 0x22, 0x0D, 0x00, 0x00, 0x65, 0x64], callback);
}

/**
 * Send the right key press
 *
 * @param   function  callback
 */
tv.prototype.sendKeyRight = function(callback) {
  this.send([0x08, 0x22, 0x0D, 0x00, 0x00, 0x62, 0x67], callback);
}

/**
 * Set the sleep mode
 *
 * @param   function  callback
 */
tv.prototype.sleepMode = function(callback) {
  this.send([0x08, 0x22, 0x0D, 0x00, 0x00, 0x03, 0xC6], callback);
}

/**
 * Send the red key press
 *
 * @param   function  callback
 */
tv.prototype.sendKeyRed = function(callback) {
  this.send([0x08, 0x22, 0x0D, 0x00, 0x00, 0x6C, 0x5D], callback);
}

/**
 * Send the green key press
 *
 * @param   function  callback
 */
tv.prototype.sendKeyGreen = function(callback) {
  this.send([0x08, 0x22, 0x0D, 0x00, 0x00, 0x14, 0xB5], callback);
}

/**
 * Send the yellow key press
 *
 * @param   function  callback
 */
tv.prototype.sendKeyYellow = function(callback) {
  this.send([0x08, 0x22, 0x0D, 0x00, 0x00, 0x15, 0xB4], callback);
}

/**
 * Send the blue key press
 *
 * @param   function  callback
 */
tv.prototype.sendKeyBlue = function(callback) {
  this.send([0x08, 0x22, 0x0D, 0x00, 0x00, 0x16, 0xB3], callback);
}

/**
 * Send the channel list key press
 *
 * @param   function  callback
 */
tv.prototype.channelList = function(callback) {
  this.send([0x08, 0x22, 0x0D, 0x00, 0x00, 0x6B, 0x5E], callback);
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