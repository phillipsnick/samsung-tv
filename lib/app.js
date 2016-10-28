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
  }).on('error', function(err){
    console.log(err);
  });
}

module.exports = tv;

/**
 * Calculate the checksum based on the existying bytes in the array
 *
 * @param   array   array
 * @returns string
 */
tv.prototype.calculateChecksum = function(array) {
  var sum = 0;

  array.forEach(function(element, index) {
    sum+= element;
  });

  return (256 - sum).toString(16);
}

/**
 * Send a command via serial
 *
 * @param   array     array
 * @param   function  callback
 */
tv.prototype.send = function(array, callback) {
  if (array.length != 6) {
    callback(new Error('Array must be 6 long'));
    return;
  }

  array.push('0x' + this.calculateChecksum(array));

  var buff = new Buffer(array);

  this.session.write(buff, function(err) {
    if(typeof callback !== 'function') {
      return;
    }

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
tv.prototype.sendPowerToggle = function(callback) {
  this.send([0x08, 0x22, 0x00, 0x00, 0x00, 0x00], callback);
};

/**
 * Power the TV on/off
 *
 * @param   bool      state
 * @param   function  callback
 */
tv.prototype.setPower = function(state, callback) {
  switch(state) {
    case true:
      this.send([0x08, 0x22, 0x00, 0x00, 0x00, 0x02], callback);
      break;

    case false:
      this.send([0x08, 0x22, 0x00, 0x00, 0x00, 0x01], callback);
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
tv.prototype.sendVolumeUp = function(callback) {
  this.send([0x08, 0x22, 0x01, 0x00, 0x01, 0x00], callback);
}

/**
 * Decrease volume up by 1
 *
 * @param   function  callback
 */
tv.prototype.sendVolumeDown = function(callback) {
  this.send([0x08, 0x22, 0x01, 0x00, 0x02, 0x00], callback);
}

/**
 * Set the volume to a specific level
 *
 * @param   int       value       (0-100)
 * @param   function  callback
 */
tv.prototype.setVolume = function(value, callback) {
  if (value < 0 || value > 100) {
    callback(new Error('Invalid volume level, range is 0-100'));
    return;
  }

  this.send([0x08, 0x22, 0x01, 0x00, 0x00, value], callback);
}

/**
 * Toggle volume mute
 *
 * @param   function  callback
 */
tv.prototype.sendVolumeMuteToggle = function(callback) {
  this.send([0x08, 0x22, 0x02, 0x00, 0x00, 0x00], callback);
}

/**
 * Go to the next channel in the channel list
 *
 * @param   function  callback
 */
tv.prototype.sendChannelUp = function(callback) {
  this.send([0x08, 0x22, 0x03, 0x00, 0x01, 0x00], callback);
}

/**
 * Go to the previous channel in the channel list
 *
 * @param   function  callback
 */
tv.prototype.sendChannelDown = function(callback) {
  this.send([0x08, 0x22, 0x03, 0x00, 0x02, 0x00], callback);
}

/**
 * Go to the previous channel
 *
 * @param   function  callback
 */
tv.prototype.sendChannelPrevious = function(callback) {
  this.send([0x08, 0x22, 0x0D, 0x00, 0x00, 0x13], callback);
}

/**
 * Go to a specific channel number
 *
 * @param   function  callback
 */
tv.prototype.setChannel = function(value, callback) {
  if (value < 1 || value > 999) {
    callback(new Error('Invalid channel, range is 1-999'));
    return;
  }

  this.send([0x08, 0x22, 0x04, 0x00, 0x00, value], callback);
}

/**
 * Set the source to the TV
 *
 * @param   function  callback
 */
tv.prototype.setSourceTv = function(callback) {
  this.send([0x08, 0x22, 0x0A, 0x00, 0x00, 0x00], callback);
}

/**
 * Set the source to the AV input (1-3)
 *
 * @param   int       value
 * @param   function  callback
 */
tv.prototype.setSourceAv = function(value, callback) {
  if (value < 1 || value > 3) {
    callback(new Error('Invalid AV input number, range is 1-3'));
    return;
  }

  // reduce the value by 1 as input 1 is 0x00
  value--;

  this.send([0x08, 0x22, 0x0A, 0x00, 0x01, value], callback);
}

/**
 * Set the source to the component input (1-3)
 *
 * @param   int       value
 * @param   function  callback
 */
tv.prototype.setSourceComponent = function(value, callback) {
  if (value < 1 || value > 3) {
    callback(new Error('Invalid component input number, range is 1-3'));
    return;
  }

  // reduce the value by 1 as input 1 is 0x00
  value--;

  this.send([0x08, 0x22, 0x0A, 0x00, 0x03, value], callback);
}

/**
 * Set the source to the PC input
 *
 * @param   function  callback
 */
tv.prototype.setSourcePc = function(callback) {
  this.send([0x08, 0x22, 0x0A, 0x00, 0x04, 0x00], callback);
}

/**
 * Set the source to the HDMI input (1-4)
 *
 * @param   int       value
 * @param   function  callback
 */
tv.prototype.setSourceHdmi = function(value, callback) {
  if (value < 1 || value > 3) {
    callback(new Error('Invalid AV input number, range is 1-3'));
    return;
  }

  // reduce the value by 1 as input 1 is 0x00
  value--;

  this.send([0x08, 0x22, 0x0A, 0x00, 0x05, value], callback);
}

/**
 * Set the source to the Samsung Smart Hub
 *
 * @param   function  callback
 */
tv.prototype.setSourceSmartHub = function(callback) {
  this.send([0x08, 0x22, 0x0D, 0x00, 0x00, 0x8C], callback);
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
tv.prototype.setPictureMode = function(mode, callback) {
  if (mode < 0 || mode > 6) {
    callback(new Error('Invalid picture mode, valid range is 0-6'));
    return;
  }

  this.send([0x08, 0x22, 0x0B, 0x00, 0x00, mode], callback);
}

/**
 * Set the backlight level (0-20)
 *
 * @param   int       value
 * @param   function  callback
 */
tv.prototype.setBacklight = function(value, callback) {
  if (value < 0 || value > 20) {
    callback(new Error('Invalid backlight level, valid range is 0-20'));
    return;
  }

  this.send([0x08, 0x22, 0x0B, 0x01, 0x00, value], callback);
}

/**
 * Set the contrast level (0-100)
 *
 * @param   int       value
 * @param   function  callback
 */
tv.prototype.setContrast = function(value, callback) {
  if (value < 0 || value > 100) {
    callback(new Error('Invalid contrast level, valid range is 0-100'));
    return;
  }

  this.send([0x08, 0x22, 0x0B, 0x02, 0x00, value], callback);
}

/**
 * Set the brightness level (0-100)
 *
 * @param   int       value
 * @param   function  callback
 */
tv.prototype.setBrightness = function(value, callback) {
  if (value < 0 || value > 100) {
    callback(new Error('Invalid brightness level, valid range is 0-100'));
    return;
  }

  this.send([0x08, 0x22, 0x0B, 0x03, 0x00, value], callback);
}

/**
 * Set the sharpness level (0-100)
 *
 * @param   int       value
 * @param   function  callback
 */
tv.prototype.setSharpness = function(value, callback) {
  if (value < 0 || value > 100) {
    callback(new Error('Invalid sharpness level, valid range is 0-100'));
    return;
  }

  this.send([0x08, 0x22, 0x0B, 0x04, 0x00, value], callback);
}

/**
 * Set the colour level (0-100)
 *
 * @param   int       value
 * @param   function  callback
 */
tv.prototype.setColour = function(value, callback) {
  if (value < 0 || value > 100) {
    callback(new Error('Invalid brightness level, valid range is 0-100'));
    return;
  }

  this.send([0x08, 0x22, 0x0B, 0x05, 0x00, value], callback);
}

/**
 * Set the tint level (0-100)
 *
 * @param   int       value
 * @param   function  callback
 */
tv.prototype.setTint = function(value, callback) {
  if (value < 0 || value > 100) {
    callback(new Error('Invalid brightness level, valid range is 0-100'));
    return;
  }

  this.send([0x08, 0x22, 0x0B, 0x06, 0x00, value], callback);
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
tv.prototype.setPictureBlackTone = function(mode, callback) {
  if (mode < 0 || mode > 3) {
    callback(new Error('Invalid black tone mode, valid range is 0-3'));
    return;
  }

  this.send([0x08, 0x22, 0x0B, 0x07, 0x00, mode], callback);
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
tv.prototype.setPictureDynamicContrast = function(mode, callback) {
  if (mode < 0 || mode > 3) {
    callback(new Error('Invalid dynamic contrast mode, valid range is 0-3'));
    return;
  }

  this.send([0x08, 0x22, 0x0B, 0x07, 0x01, mode], callback);
}

/**
 * Set the shadow detail level (-2 - 2)
 *
 * @param   int       value
 * @param   function  callback
 */
tv.prototype.setPictureShadowDetail = function(value, callback) {
  if (value < -2 || value > 2) {
    callback(new Error('Invalid shadow detail level, valid range is -2 - 2'));
    return;
  }

  this.send([0x08, 0x22, 0x0B, 0x07, 0x02, value], callback);
}

/**
 * Set the gamma level (-3 - 3)
 *
 * @param   int       value
 * @param   function  callback
 */
tv.prototype.setPictureGamma = function(value, callback) {
  if (value < -3 || value > 3) {
    callback(new Error('Invalid picture gamma level, valid range is -3 - 3'));
    return;
  }

  this.send([0x08, 0x22, 0x0B, 0x07, 0x03, value], callback);
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
tv.prototype.setPictureSize = function(size, callback) {
  if (size < 0 || size > 6) {
    callback(new Error('Invalid picture size mode, valid range is 0-6'));
    return;
  }

  this.send([0x08, 0x22, 0x0B, 0x0B, 0x01, size], callback);
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
  if (mode < 0 || mode > 7) {
    callback(new Error('Invalid 3D mode, valid range is 0-7'));
    return;
  }

  this.send([0x08, 0x22, 0x0B, 0x0C, 0x00, mode], callback);
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
  if (mode < 0 || mode > 4) {
    callback(new Error('Invalid sound mode, valid range is 0-4'));
    return;
  }

  this.send([0x08, 0x22, 0x0C, 0x00, 0x00, mode], callback);
}

/**
 * Send a digit key press (0-9)
 *
 * @param   int       value
 * @param   function  callback
 */
tv.prototype.sendKeyDigit = function(value, callback) {
  if (value < 0 || value > 9) {
    callback(new Error('Invalid digit key, valid range is 0-9'));
    return;
  }

  // as per spreadsheet, the 6th byte for 1 is 0x04 increasing by 1 through to 9
  // then 0 is 0x11

  if (value === 0) {
    value = '0x0B';
  } else {
    value += 3;
  }



  this.send([0x08, 0x22, 0x0D, 0x00, 0x00, value], callback);
}

/**
 * Send the ok/enter key press
 *
 * @param   function  callback
 */
tv.prototype.sendKeyOk = function(callback) {
  this.send([0x08, 0x22, 0x0D, 0x00, 0x00, 0x68], callback);
}

/**
 * Send the exit key press
 *
 * @param   function  callback
 */
tv.prototype.sendKeyExit = function(callback) {
  this.send([0x08, 0x22, 0x0D, 0x00, 0x00, 0x2D], callback);
}

/**
 * Send the return key press
 *
 * @param   function  callback
 */
tv.prototype.sendKeyReturn = function(callback) {
  this.send([0x08, 0x22, 0x0D, 0x00, 0x00, 0x58], callback);
}

/**
 * Send the more key press
 *
 * @param   function  callback
 */
tv.prototype.sendKeyMore = function(callback) {
  this.send([0x08, 0x22, 0x0D, 0x00, 0x00, 0x9C], callback);
}

/**
 * Send the tools key press
 *
 * @param   function  callback
 */
tv.prototype.sendKeyTools = function(callback) {
  this.send([0x08, 0x22, 0x0D, 0x00, 0x00, 0x4B], callback);
}

/**
 * Send the info key press
 *
 * @param   function  callback
 */
tv.prototype.sendKeyInfo = function(callback) {
  this.send([0x08, 0x22, 0x0D, 0x00, 0x00, 0x1F], callback);
}

/**
 * Send the guide key press
 *
 * @param   function  callback
 */
tv.prototype.sendKeyGuide = function(callback) {
  this.send([0x08, 0x22, 0x0D, 0x00, 0x00, 0x4F], callback);
}

/**
 * Send the menu key press
 *
 * @param   function  callback
 */
tv.prototype.sendKeyMenu = function(callback) {
  this.send([0x08, 0x22, 0x0D, 0x00, 0x00, 0x1A], callback);
}

/**
 * Send the up key press
 *
 * @param   function  callback
 */
tv.prototype.sendKeyUp = function(callback) {
  this.send([0x08, 0x22, 0x0D, 0x00, 0x00, 0x60], callback);
}

/**
 * Send the down key press
 *
 * @param   function  callback
 */
tv.prototype.sendKeyDown = function(callback) {
  this.send([0x08, 0x22, 0x0D, 0x00, 0x00, 0x61], callback);
}

/**
 * Send the left key press
 *
 * @param   function  callback
 */
tv.prototype.sendKeyLeft = function(callback) {
  this.send([0x08, 0x22, 0x0D, 0x00, 0x00, 0x65], callback);
}

/**
 * Send the right key press
 *
 * @param   function  callback
 */
tv.prototype.sendKeyRight = function(callback) {
  this.send([0x08, 0x22, 0x0D, 0x00, 0x00, 0x62], callback);
}

/**
 * Set the sleep mode
 *
 * @param   function  callback
 */
tv.prototype.sendKeySleepMode = function(callback) {
  this.send([0x08, 0x22, 0x0D, 0x00, 0x00, 0x03], callback);
}

/**
 * Send the red key press
 *
 * @param   function  callback
 */
tv.prototype.sendKeyRed = function(callback) {
  this.send([0x08, 0x22, 0x0D, 0x00, 0x00, 0x6C], callback);
}

/**
 * Send the green key press
 *
 * @param   function  callback
 */
tv.prototype.sendKeyGreen = function(callback) {
  this.send([0x08, 0x22, 0x0D, 0x00, 0x00, 0x14], callback);
}

/**
 * Send the yellow key press
 *
 * @param   function  callback
 */
tv.prototype.sendKeyYellow = function(callback) {
  this.send([0x08, 0x22, 0x0D, 0x00, 0x00, 0x15], callback);
}

/**
 * Send the blue key press
 *
 * @param   function  callback
 */
tv.prototype.sendKeyBlue = function(callback) {
  this.send([0x08, 0x22, 0x0D, 0x00, 0x00, 0x16], callback);
}

/**
 * Send the channel list key press
 *
 * @param   function  callback
 */
tv.prototype.sendKeyChannelList = function(callback) {
  this.send([0x08, 0x22, 0x0D, 0x00, 0x00, 0x6B], callback);
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
