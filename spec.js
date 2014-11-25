/*globals describe, require */

var WinkDex = require('./index'),
    assert  = require('assert');

var fixtures = {};

describe('WinkDex', function() {

  describe('apiVersion', function() {
    it('should return current version number');
  });

  describe('price', function() {
    it('should return an error if the server does so');
    it('should return current price by default');
    it('should return the price at a specific timestamp');
  });

  describe('series', function() {
    it('should return an error if the server does so');
    it('should require error if called with only 2 arguments');
    it('should return the time series for the last 6 months by default');
    it('should return the time series for the time specified');
  });

});
