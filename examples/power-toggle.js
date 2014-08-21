var samsungTv = require('../lib/app')
  , config = require('./config');

var tv = new samsungTv(config);

tv.getSession().on('open', function () {
  console.log('Successfully opened RS232 connection');

  tv.powerToggle(function (err) {
    if (err) {
      console.log(err.toString());
      return;
    }

    console.log('Successfully sent power toggle command');
  });

  tv.getSession().close();
  process.exit(0);
});