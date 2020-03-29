#!/usr/bin/env node

var tenPB = require('./tenpb.node');
var argv = require('minimist')(process.argv.slice(2), { alias: { percent: 'p', words: 'w', syllable: 's', debug: 'd' } });
var options = [];

if (argv.percent) {
  options.percent = argv.percent;
}

if (argv.words) {
  options.word_bases = argv.words.split(',');
}

if (argv.syllable) {
  options.syllable = true;
}

if (argv.debug) {
  options.debug = true;
}

if (process.stdin.isTTY) {
  // Called directly: tenpb 'Lorem ipsum dolor sit amet'
  data = new Buffer(process.argv[2] || '');
  process.stdout.write(tenPB(data, options) + "\n");
}
else {
  // Piped: fortune | tenpb | cowsay
  data = '';
 
  process.stdin.on('readable', function() {
    var chunk;
    while (chunk = process.stdin.read()) {
      data += chunk;
    }
  });
 
  process.stdin.on('end', function () {
    process.stdout.write(tenPB(data, options) + "\n");
  });
}