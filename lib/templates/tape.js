'use babel';

export default ({name}, content) => `
  test.createStream({ objectMode: true }).on('data', function (row) {
      reporter(row)
  });

  ${content.join('\\n')}
`
