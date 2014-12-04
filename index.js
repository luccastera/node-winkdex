/*globals require */

var WinkDex = function(options) {
  options = options || {};

  this.apiVersion = options.apiVersion || 'v0';
  this.userAgent = options.userAgent || 'node-winkdex';
  this.gzip = options.gzip || true;

  this.rootURL = 'https://winkdex.com/api/' + this.apiVersion
};

WinkDex.prototype.apiVersion = function(callback) {
};

WinkDex.prototype.price = function(timestamp, callback) {
};

WinkDex.prototype.series = function(timestamp, callback) {
};

module.exports = WinkDex;
