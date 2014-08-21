var samsungTv = require('../lib/app')
  , config = require('./config');

var tv = new samsungTv(config);

tv.getSession().on('open', function () {
  console.log('Successfully opened RS232 connection');

  tv.sourceHdmi(1, function (err) {
    if (err) {
      console.log(err.toString());
    } else {
      console.log('Successfully sent source HDMI 1 command');
    }

    tv.getSession().close();
    process.exit(0);
  });
});