# node-winkdex

A node.js library to consume the WinkDex API.


From the [WinkDex website](https://winkdex.com):

> Winklevoss Index (also known as WinkDex) is a pioneering effort 
> in the analysis and presentation of global bitcoin pricing and 
> currently uses data from the most active qualified U.S. dollar 
> denominated bitcoin exchanges.

## Installation


To install:

```
npm install node-winkdex
```

## Quick Start


```
var WinkDex = require('node-winkdex');
var winkdex = new WinkDex();

winkdex.price(function(err, price) {
  console.log(price); // prints current price
});
```

## API

### Initializing a winkdex

To get started, you first need to initialize a winkdex using:

```
var WinkDex = require('node-winkdex');
var winkdex = new WinkDex();
```

When creating the winkdex, you can pass in some options, shown below:

| Option        | Default Value | Description                                        |
| ------------- | ------------- | ---------------------------------------------------|
| apiVersion    | v0            | API version to use                                 |
| userAgent     | node-winkdex  | User Agent to send to API                          |
| gzip          | true          | Whether to use Gzip encoding or not (recommended)  |


For Example:

```
var winkdex = new WinkDex({
  apiVersion: 'v0',
  userAgent: 'your-app-name',
  gzip: true
});
```

### apiVersion()

This function fetches and returns the current version of the API from
the WinkDex API. Internally, it makes a call to the Winkdex /api
endpoint and parses the location HTTP header. 
See [API Versioning](http://docs.winkdex.com/#api-versioning)

Here is how you can use it:

```
var WinkDex = require('node-winkdex');
var winkdex = new WinkDex();
winkdex.apiVersion(function(err, version) {
  console.log(version); // version is a string e.g. v0
});
```

### price([time], callback)

This function fetches the current price. It takes one or two arguments.

If only one argument is passed, it assumes this argument is the callback
and fetch the price at the current time.

If two arguments are passed, the first one must be the time at which we
want price information for and a callback. This time should be a
Javascript Date Object.

The callback is called with two arguments: 
* the first argument is an error object (or null if no error occurs). 
* the second argument is the price

To fetch current price:

```
var WinkDex = require('node-winkdex');
var winkdex = new WinkDex();
winkdex.price(function(err, price) {
  console.log(price); // returns a number
});
```

To fetch the price at a specific time:

```
var WinkDex = require('node-winkdex');
var winkdex = new WinkDex();

var timestamp = new Date(2014,1,1); // January 1, 2014

winkdex.price(timestamp, function(err, price) {
  console.log(price); // returns a number
});
```

### series([start_time], [end_time], callback)

The series method allows you to get WinkDex time series data. You should
use this if you want to plot the data or run some data analysis.

The method accepts 3 arguments:
* a start time
  months
* an end time
* a callback function 

The callback is called with two arguments: 
* the first argument is an error object (or null if no error occurs). 
* the second argument is the time series array

Note: You can call the series method with only the callback argument. In
this case, it will default to returning the last 6 months of data.

To fetch the last 6 months of time-series data:

```
var WinkDex = require('node-winkdex');
var winkdex = new WinkDex();

winkdex.series(function(err, series) {
  console.log(series); // prints array of prices
});
```

To get the time series for the month of January:

```
var WinkDex = require('node-winkdex');
var winkdex = new WinkDex();

var start = new Date(2014,1,1);
var end = new Date(2014,2,1);

winkdex.series(start, end, function(err, series) {
  console.log(series);
});
```

## Development

You can submit bug reports or feature requests to
[https://github.com/dambalah/node-winkdex/issues](https://github.com/dambalah/node-winkdex/issues),
but what I would like even more is a well tested pull request :-)

To run the tests:

```
npm test
```

To check with jshint:

```
npm run-script jshint
```

## License

[MIT](LICENSE)
