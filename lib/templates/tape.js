'use babel';

export default ({name}, content) => `
  test.createStream({ objectMode: true }).on('data', reporter);

  ${content.join('\\n')}
`
