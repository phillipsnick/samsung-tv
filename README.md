# Samsung TV Remote

Module for controlling Samsung TVs via RS232


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
  port: ''
});
```

### Methods

Work in progress, see either lib/app.js or examples directory.


## Notes

Unfortunately due to the non existent documentation and poor implementation of the API by Samsung there is no two way communication supported.

Managed to source a number of RS232 codes off various forum posts, specifically the download available [here](http://www.remotecentral.com/cgi-bin/mboard/rs232-ip/thread.cgi?603).

Some considerations and limitations:
* The RS232 port may need enabling via the [service menu](http://www.factory-reset.com/wiki/Samsung_Service_Menu)
* Not all TVs can be powered up via RS232
* Some TVs may not work at all (my 2007 LE40M87 prints output via serial but no ability to control it)
* No two way communication


## Licence

[The MIT License (MIT)](https://github.com/phillipsnick/samsung-tv/blob/master/LICENSE)
