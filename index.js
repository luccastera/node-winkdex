/*globals require */

var request = require('request');

var WinkDex = function(options) {
  options = options || {};

  this.version = options.version || 'v0';
  this.userAgent = options.userAgent || 'node-winkdex';
  this.gzip = options.gzip || true;

  this.rootURL = 'https://winkdex.com/api';
};

WinkDex.prototype.apiVersion = function(callback) {
  request.get({
    uri: this.rootURL,
    followRedirect: false
  }, function(err, response, body) {
    var apiURL = response.headers.location;
    var parts = apiURL.split('/');
    var version = parts[parts.length - 1];
    return callback(null, version);
  });
};

WinkDex.prototype.price = function(timestamp, callback) {
  if (arguments.length === 1) {
    callback = timestamp;
    timestamp = null;
  }

  var url = this.rootURL + '/' + this.version + '/price';
  if (timestamp) {
    url += '?time=' + timestamp;
  }

  request.get({
    uri: url,
    json: true
  }, function(err, response, body) {
    if (err) {
      return callback(err);
    } else if (response.statusCode !== 200) {
      return callback(new Error(body));
    } else {
      return callback(null, body.price);
    }
  });
};

WinkDex.prototype.series = function(startTime, endTime, callback) {
  if (arguments.length === 1) {
    callback = startTime;
    startTime = null;
    endTime = null;
  } else if (arguments.length === 2) {
    callback = endTime;
    endTime = null;
  }

  var url = this.rootURL + '/' + this.version + '/series';
  if (startTime) {
    url += '?start_time=' + startTime.toISOString();
    if (endTime) {
      url += '&end_time=' + endTime.toISOString();
    }
  }

  request.get({
    uri: url,
    json: true
  }, function(err, response, body) {
    if (err) {
      return callback(err);
    } else if (response.statusCode !== 200) {
      return callback(new Error(body));
    } else {
      return callback(null, body.series[0]);
    }
  });

};

module.exports = WinkDex;
