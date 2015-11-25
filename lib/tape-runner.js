var test = require('tape');
var path = require('path');

test.createStream({ objectMode: true }).on('data', function (row) {
  process.stdout.write(JSON.stringify(row) + '\n');
});

process.argv.slice(2).forEach(function (file) {
  require(path.resolve(file));
});
