'use babel';

export function fromString(content, filename) {
  var m = new module.constructor();
  m.paths = module.paths;
  m._compile(content, filename);
  return m.exports;
};
