var samsungTv = require('../lib/app')
  , config = require('./config');

var tv = new samsungTv(config);

tv.getSession().on('open', function () {
  console.log('Successfully opened RS232 connection');

  tv.sendKeyDigit(1, function (err) {
    if (err) {
      console.log(err.toString());
      return;
    }

    console.log('Sent key digit 1');

    tv.sendKeyDigit(0, function(err) {
      if (err) {
        console.log(err.toString());
        return;
      }

      console.log('Sent key digit 0');

      tv.sendKeyDigit(1, function(err) {
        if (err) {
          console.log(err.toString());
          return;
        }

        console.log('Sent key digit 1');

        tv.sendKeyOk(function(err) {
          if (err) {
            console.log(err.toString());
            return;
          }

          console.log('Sent key ok');

          end();
        });
      });
    });
  });
});

function end() {
  tv.getSession().close();
  process.exit(0);
}