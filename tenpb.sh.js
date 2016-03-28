#!/usr/bin/env node

var tenpb = require('./tenpb.js');

if (process.stdin.isTTY) {
  // Even though executed by name, the first argument is still "node",
  // the second the script name. The third is the string we want.
  data = new Buffer(process.argv[2] || '');
  if (data) process.stdout.write(tenpb.initPlainText(data) + "\n");
}
 
// ------------------------------------------------------------
// Accepting piped content. E.g.:
// echo "pass in this string as input" | ./example-script
// ------------------------------------------------------------
 
else {
  data = '';
 
  process.stdin.on('readable', function() {
    var chunk;
    while (chunk = process.stdin.read()) {
      data += chunk;
    }
  });
 
  process.stdin.on('end', function () {
    if (data) process.stdout.write(tenpb.initPlainText(data));
  });
}