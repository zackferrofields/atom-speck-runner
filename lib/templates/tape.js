'use babel';

export default ({name}, content) => `
  var loophole = require('loophole');
  var file = require('${name}');
  var test = loophole.allowUnsafeNewFunction(function() {
    return require('tape');
  });

  ${content.join('↵')}
`
