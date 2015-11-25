'use babel';

export default ({name}, content) => `
  var loophole = require('loophole');
  var file = require('${name}');
  var test = require('tape');

  ${content.join('↵')}
`
