'use babel';

export default ({name}, content) => `
  var file = require('${name}');
  var test = require('tape');

  ${content.join('↵')}
`
