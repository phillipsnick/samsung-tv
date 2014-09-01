# Samsung TV Remote

Module for controlling Samsung TVs via RS232.


## RS232 Interface

Many Samsung TVs don't seem to have a standard 9 pin serial port, they usually have a service port of some kind which is either a 3.5mm stereo jack or the PC VGA connector.

For more information on how to create an interface see this post over at [SamyGo](http://wiki.samygo.tv/index.php5/Ex-Link_Cable_for_C/D/E_Series_and_BD_players)

__I accept no responsibility for any damage done to your computer or TV__


## Installation

```bash
npm install samsung-tv
```


## Usage

```javascript
var samsungTv = require('samsung-tv');

var tv = new samsungTv({
  port: '' // eg. /dev/ttyS0
});

tv.getSession.on('open', function() {
  // now connected
  // all commands to be placed here
});
```

## Methods

A number of examples can be found within the [examples directory](https://github.com/phillipsnick/samsung-tv/tree/master/examples).

### General

#### calculateChecksum(array)

Calculate the 7th checksum byte when sending a command to the TV.
 
__Arguments__

* `array` - Array of 6 bytes

__Example__

```js
var checksum = tv.calculateChecksum([0x08, 0x22, 0x00, 0x00, 0x00, 0x00]);
```


#### send(array, callback)

Send a command via the serial connection.

__Arguments__

* `array` - Array of 6 bytes
* `callback(err) - Called once write has been completed
 
__Example__

```js
tv.send([0x08, 0x22, 0x00, 0x00, 0x00, 0x00], function(err) {
  if (err) {
    console.log(err);
    return;
  }
  
  console.log('Sent!');
);
```


#### getSession()

Get the current `serialport` session.


#### close()

Close the current `serialport` session.


### TV Specific

Note all of the below examples have had their error handling examples removed as they are all identical to:

```js
tv.methodName(function(err) {
  if (err) {
      console.log(err);
      return;
    }
    
    console.log('Sent!');
});
```

#### sendPowerToggle(callback)

Toggle the TVs power.

__Arguments__

* `callback(err) - Optional callback called once write has been completed

__Example__

```js
tv.sendPowerToggle(function(err) {
  console.log('Sent!');
});
```

#### setPower(state, callback)

Set the TVs power to on/off.

__Arguments__

* `state` - bool
* `callback(err) - Optional callback called once write has been completed

__Example__

Power the TV on

```js
tv.setPower(true, function(err) {
  console.log('Sent!');
});
```

#### sendVolumeUp(callback)

Increase the volume by 1.

__Arguments__

* `callback(err) - Optional callback called once write has been completed

__Example__

```js
tv.sendVolumeUp(true, function(err) {
  console.log('Sent!');
});
```


#### sendVolumeDown(callback)

Decrease the volume by 1.

__Arguments__

* `callback(err) - Optional callback called once write has been completed

__Example__

```js
tv.sendVolumeDown(true, function(err) {
  console.log('Sent!');
});
```


#### setVolume(volume, callback)

Set the volume to a specific level.

__Arguments__

* `volume` - Integer between 0 and 100
* `callback(err) - Optional callback called once write has been completed

__Example__

Set the volume to 15

```js
tv.setVolume(15, function(err) {
  console.log('Sent!');
});
```


#### sendVolumeMuteToggle(callback)

Toggle mute.

__Arguments__

* `callback(err) - Optional callback called once write has been completed

__Example__

```js
tv.sendVolumeMuteToggle(function(err) {
  console.log('Sent!');
});
```


#### sendChannelUp(callback)

Go to the next channel in the channel list.

__Arguments__

* `callback(err) - Optional callback called once write has been completed

__Example__

```js
tv.sendChannelUp(function(err) {
  console.log('Sent!');
});
```


#### sendChannelDown(callback)

Go to the previous channel in the channel list.

__Arguments__

* `callback(err) - Optional callback called once write has been completed

__Example__

```js
tv.sendChannelDown(function(err) {
  console.log('Sent!');
});
```


#### sendChannelPrevious(callback)

Go to the previous channel.

__Arguments__

* `callback(err) - Optional callback called once write has been completed

__Example__

```js
tv.sendChannelPrevious(function(err) {
  console.log('Sent!');
});
```


#### setChannel(channel, callback)

Go to a specific channel.

__Arguments__

* `channel` - Channel number (eg 101)
* `callback(err) - Optional callback called once write has been completed

__Example__

Example to change to BBC HD (in the case of my current channel listing)

```js
tv.setChannel(101, function(err) {
  console.log('Sent!');
});
```


#### setSourceTv(callback)

Set the source to TV.

__Arguments__

* `callback(err) - Optional callback called once write has been completed

__Example__

```js
tv.setSourceTv(101, function(err) {
  console.log('Sent!');
});
```


#### setSourceAv(value, callback)

Set the source to AV (1-3).

__Arguments__

* `value` - Which AV channel to use (1-3)
* `callback(err) - Optional callback called once write has been completed

__Example__

Set the source to AV 1

```js
tv.setSourceAv(1, function(err) {
  console.log('Sent!');
});
```


#### setSourceComponent(value, callback)

Set the source to component (1-3).

__Arguments__

* `value` - Which component channel to use (1-3)
* `callback(err) - Optional callback called once write has been completed

__Example__

Set the source to component 1

```js
tv.setSourceComponent(1, function(err) {
  console.log('Sent!');
});
```


#### setSourcePc(callback)

Set the source to PC.

__Arguments__

* `callback(err) - Optional callback called once write has been completed

__Example__

```js
tv.setSourcePc(101, function(err) {
  console.log('Sent!');
});
```


#### setSourceHdmi(value, callback)

Set the source to HDMI (1-4).

__Arguments__

* `value` - Which HDMI channel to use (1-3)
* `callback(err) - Optional callback called once write has been completed

__Example__

Set the source to HDMI 1

```js
tv.setSourceHdmi(1, function(err) {
  console.log('Sent!');
});
```


#### setSourceSmartHub(callback)

Set the source to the Samsung Smart Hub.

__Arguments__

* `callback(err) - Optional callback called once write has been completed

__Example__

```js
tv.setSourceSmartHub(101, function(err) {
  console.log('Sent!');
});
```


#### setPictureMode(value, callback)

Set the picture mode.

|Value|Mode|
|-----|----|
|0|Dynamic|
|1|Standard|
|2|Movie|
|3|Natural|
|4|Cal night|
|5|Cal day|
|6|BD Wise|

__Arguments__

* `value` - Picture mode as per table above
* `callback(err) - Optional callback called once write has been completed

__Example__

Set the picture mode to dynamic

```js
tv.setPictureMode(0, function(err) {
  console.log('Sent!');
});
```


#### setBacklight(value, callback)

Set the backlight level (0-20).

__Arguments__

* `value` - Backlight level 0-20
* `callback(err) - Optional callback called once write has been completed

__Example__

Set the backlight to maximum

```js
tv.setBacklight(20, function(err) {
  console.log('Sent!');
});
```


#### setContrast(value, callback)

Set the contrast level (0-100).

__Arguments__

* `value` - Contrast level 0-100
* `callback(err) - Optional callback called once write has been completed

__Example__

Set the contrast to maximum

```js
tv.setContrast(100, function(err) {
  console.log('Sent!');
});
```


#### setBrightness(value, callback)

Set the brightness level (0-100).

__Arguments__

* `value` - Brightness level 0-100
* `callback(err) - Optional callback called once write has been completed

__Example__

Set the brightness to maximum

```js
tv.setBrightness(100, function(err) {
  console.log('Sent!');
});
```


#### setSharpness(value, callback)

Set the sharpness level (0-100).

__Arguments__

* `value` - Sharpness level 0-100
* `callback(err) - Optional callback called once write has been completed

__Example__

Set the sharpness to maximum

```js
tv.setSharpness(100, function(err) {
  console.log('Sent!');
});
```


#### setColour(value, callback)

Set the colour level (0-100).

__Arguments__

* `value` - Colour level 0-100
* `callback(err) - Optional callback called once write has been completed

__Example__

Set the Colour to maximum

```js
tv.setColour(100, function(err) {
  console.log('Sent!');
});
```


#### setTint(value, callback)

Set the tint level (0-100).

__Arguments__

* `value` - Tint level 0-100
* `callback(err) - Optional callback called once write has been completed

__Example__

Set the tint to maximum

```js
tv.setTint(100, function(err) {
  console.log('Sent!');
});
```


#### setPictureBlackTone(mode, callback)

Set the picture black tone.

|Value|Mode|
|-----|----|
|0|Off|
|1|Dark|
|2|Darker|
|3|Darkest|

__Arguments__

* `mode` - Picture black tone as per table above
* `callback(err) - Optional callback called once write has been completed

__Example__

Set the picture black tone to off

```js
tv.setPictureBlackTone(0, function(err) {
  console.log('Sent!');
});
```


#### setPictureDynamicContrast(mode, callback)

Set the dynamic contrast mode

|Value|Mode|
|-----|----|
|0|Off|
|1|Low|
|2|Medium|
|3|High|

__Arguments__

* `mode` - Dynamic contrast mode as per table above
* `callback(err) - Optional callback called once write has been completed

__Example__

Set the dynamic contrast mode to off

```js
tv.setPictureDynamicContrast(0, function(err) {
  console.log('Sent!');
});
```


#### setPictureShadowDetail(value, callback)

Set the shadow detail level between -2 and 2

__Arguments__

* `value` - Shawdow detail level between -2 and 2
* `callback(err) - Optional callback called once write has been completed

__Example__

Set the shadow detail level to 0

```js
tv.setPictureShadowDetail(0, function(err) {
  console.log('Sent!');
});
```


#### setPictureGamma(value, callback)

Set the picture gamma level between -3 and 3

__Arguments__

* `value` - Picture gamma level between -3 and 3
* `callback(err) - Optional callback called once write has been completed

__Example__

Set the picture gamma level to 0

```js
tv.setPictureGamma(0, function(err) {
  console.log('Sent!');
});
```


#### setPictureSize(size, callback)

Set the picture size mode

|Value|Mode|
|-----|----|
|0|16:9|
|1|Zoom1|
|2|Zoom2|
|3|Wide fit|
|4|Screen fit|
|5|Smart view 1|
|6|Smart view 2|

__Arguments__

* `size` - Picture size mode as per table above
* `callback(err) - Optional callback called once write has been completed

__Example__

Set the picture size to 16:9

```js
tv.setPictureSize(0, function(err) {
  console.log('Sent!');
});
```


#### set3DMode(mode, callback)

Set the 3D mode

|Value|Mode|
|-----|----|
|0|Off|
|1|2D -> 3D|
|2|Side by side|
|3|Top bottom|
|4|Line by line|
|5|Vertical line|
|6|Checker BD|
|7|Frame sequence|

__Arguments__

* `mode` - 3D mode as per table above
* `callback(err) - Optional callback called once write has been completed

__Example__

Set the 3D mode to off

```js
tv.set3DMode(0, function(err) {
  console.log('Sent!');
});
```


#### setSoundMode(mode, callback)

Set the sound mode

|Value|Mode|
|-----|----|
|0|Standard|
|1|Music|
|2|Movie|
|3|Clear voice|
|4|Amplify|

__Arguments__

* `mode` - Sound mode as per table above
* `callback(err) - Optional callback called once write has been completed

__Example__

Set the sound mode to standard

```js
tv.setSoundMode(0, function(err) {
  console.log('Sent!');
});
```


#### sendKeyDigit(key, callback)

Send a digit key press (0-9)

__Arguments__

* `key` - Key to send 0-9
* `callback(err) - Optional callback called once write has been completed

__Example__

Send key 5

```js
tv.sendKeyDigit(5, function(err) {
  console.log('Sent!');
});
```


#### sendKeyOk(callback)

Send the ok/enter key press

__Arguments__

* `callback(err) - Optional callback called once write has been completed

__Example__

```js
tv.sendKeyOk(function(err) {
  console.log('Sent!');
});
```


#### sendKeyExit(callback)

Send the exit key press

__Arguments__

* `callback(err) - Optional callback called once write has been completed

__Example__

```js
tv.sendKeyExit(function(err) {
  console.log('Sent!');
});
```


#### sendKeyReturn(callback)

Send the return key press

__Arguments__

* `callback(err) - Optional callback called once write has been completed

__Example__

```js
tv.sendKeyReturn(function(err) {
  console.log('Sent!');
});
```


#### sendKeyMore(callback)

Send the more key press

__Arguments__

* `callback(err) - Optional callback called once write has been completed

__Example__

```js
tv.sendKeyMore(function(err) {
  console.log('Sent!');
});
```


#### sendKeyTools(callback)

Send the tools key press

__Arguments__

* `callback(err) - Optional callback called once write has been completed

__Example__

```js
tv.sendKeyTools(function(err) {
  console.log('Sent!');
});
```


#### sendKeyInfo(callback)

Send the info key press

__Arguments__

* `callback(err) - Optional callback called once write has been completed

__Example__

```js
tv.sendKeyInfo(function(err) {
  console.log('Sent!');
});
```


#### sendKeyGuide(callback)

Send the guide key press

__Arguments__

* `callback(err) - Optional callback called once write has been completed

__Example__

```js
tv.sendKeyGuide(function(err) {
  console.log('Sent!');
});
```


#### sendKeyMenu(callback)

Send the menu key press

__Arguments__

* `callback(err) - Optional callback called once write has been completed

__Example__

```js
tv.sendKeyMenu(function(err) {
  console.log('Sent!');
});
```


#### sendKeyUp(callback)

Send the up key press

__Arguments__

* `callback(err) - Optional callback called once write has been completed

__Example__

```js
tv.sendKeyUp(function(err) {
  console.log('Sent!');
});
```


#### sendKeyDown(callback)

Send the down key press

__Arguments__

* `callback(err) - Optional callback called once write has been completed

__Example__

```js
tv.sendKeyDown(function(err) {
  console.log('Sent!');
});
```


#### sendKeyLeft(callback)

Send the left key press

__Arguments__

* `callback(err) - Optional callback called once write has been completed

__Example__

```js
tv.sendKeyLeft(function(err) {
  console.log('Sent!');
});
```


#### sendKeyRight(callback)

Send the right key press

__Arguments__

* `callback(err) - Optional callback called once write has been completed

__Example__

```js
tv.sendKeyRight(function(err) {
  console.log('Sent!');
});
```


#### sendKeySleepMode(callback)

Send the sleep mode key press

__Arguments__

* `callback(err) - Optional callback called once write has been completed

__Example__

```js
tv.sendKeySleepMode(function(err) {
  console.log('Sent!');
});
```


#### sendKeyRed(callback)

Send the red button key press

__Arguments__

* `callback(err) - Optional callback called once write has been completed

__Example__

```js
tv.sendKeyRed(function(err) {
  console.log('Sent!');
});
```


#### sendKeyGreen(callback)

Send the green button key press

__Arguments__

* `callback(err) - Optional callback called once write has been completed

__Example__

```js
tv.sendKeyGreen(function(err) {
  console.log('Sent!');
});
```


#### sendKeyYellow(callback)

Send the yellow button key press

__Arguments__

* `callback(err) - Optional callback called once write has been completed

__Example__

```js
tv.sendKeyYellow(function(err) {
  console.log('Sent!');
});
```


#### sendKeyBlue(callback)

Send the blue button key press

__Arguments__

* `callback(err) - Optional callback called once write has been completed

__Example__

```js
tv.sendKeyBlue(function(err) {
  console.log('Sent!');
});
```


#### sendKeyChannelList(callback)

Send the channel list key press

__Arguments__

* `callback(err) - Optional callback called once write has been completed

__Example__

```js
tv.sendKeyChannelList(function(err) {
  console.log('Sent!');
});
```


## Notes

Unfortunately due to the non existent documentation and poor implementation of the API by Samsung there is no two way communication supported.

Managed to source a number of RS232 codes off various forum posts, specifically the download available [here](http://www.remotecentral.com/cgi-bin/mboard/rs232-ip/thread.cgi?603).

Some considerations and limitations:
* The RS232 port may need enabling via the [service menu](http://www.factory-reset.com/wiki/Samsung_Service_Menu)
* Not all TVs can be powered on via RS232
* Some TVs may not work at all (my 2007 LE40M87 prints output via serial but no control)
* No two way communication


## Licence

[The MIT License (MIT)](https://github.com/phillipsnick/samsung-tv/blob/master/LICENSE)
