var assert = require('assert');

var samsungTv = require('../lib/app');
var tv = new samsungTv({port: '/dev/tty.usbserial'});

describe('tv', function() {
  describe('#calculateChecksum([0x08, 0x22, 0x00, 0x00, 0x00, 0x00])', function() {
    it('should return 2a', function() {
      assert.equal('2a', tv.calculateChecksum([0x08, 0x22, 0x00, 0x00, 0x00, 0x00]));
    });
  });
});

describe('tv', function() {
  describe('#calculateChecksum([0x11, 0xFF, 0x01, 0x01])', function() {
    it('should return 12', function() {
      assert.equal('12', tv.calculateChecksum([0x11, 0xFF, 0x01, 0x01]));
    });
  });
});