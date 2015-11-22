'use babel';

import {CompositeDisposable} from 'atom';
import {allowUnsafeEval, allowUnsafeNewFunction} from 'loophole';
import comments from 'speckjs/src/parsing/parse-comments';
import tempUtils from 'speckjs/src/templates/template-utils';
import template from './templates/tape';

const speckjs = allowUnsafeNewFunction(() => require('speckjs'));

function requireFromString(string) {
  var m = new module.constructor();
  m.paths = module.paths;
  m._compile(string);
  return m.exports;
}

function spec(file, options) {
  const tests = comments.parse(file.content).tests;
  const content = tempUtils.prepareTestsForAssembly(tests, file, options);
  return template(file, content);
}

class SpeckRunner {
  constructor() {
    this.subscriptions = null;
  }
  activate(state) {
    const commands = atom.commands.add('atom-workspace', {'speck-runner:run': this.run});
    this.subscriptions = new CompositeDisposable;
    this.subscriptions.add(commands);
  }
  deactivate() {
    this.subscriptions.dispose();
  }
  run() {
    const editor = atom.workspace.getActivePaneItem();
    const {read, path:name, cachedContents:content} = editor.buffer.file;
    const file = {name, content};
    const options = {testFW: 'tape'};
    requireFromString(spec(file, options));
  }
}

export default new SpeckRunner();
