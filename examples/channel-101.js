var samsungTv = require('../lib/app')
  , config = require('./config');

var tv = new samsungTv(config);

tv.getSession().on('open', function () {
  console.log('Successfully opened RS232 connection');

  tv.setChannel(101, function (err) {
    if (err) {
      console.log(err.toString());
      return;
    }

    console.log('Successfully sent channel 101 request');

    tv.getSession().close();
    process.exit(0);
  });
});