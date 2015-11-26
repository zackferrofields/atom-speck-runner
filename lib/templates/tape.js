'use babel';

export default ({name}, content) => `
  var output = '';
  var log = function(x) {
    output += x + '\\n';
  }

  test.createStream({ objectMode: true }).on('data', function (row) {
      log(JSON.stringify(row))
  });

  ${content.join('\\n')}

  test('', function(t) {
    t.end();
    reporter(output);
  });
`
