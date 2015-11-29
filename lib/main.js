'use babel';

import {CompositeDisposable} from 'atom';
import {run, analyse} from './worker';

const commands = {'speck-runner:run': runInContext };

function runInContext() {
  const editor = atom.workspace.getActivePaneItem();
  const path = editor.getPath();
  const text = editor.getText();
  run(text, path);
}

function lint(editor) {
  const path = editor.getPath();
  const text = editor.getText();
  let assertions = [];
  return new Promise(resolve => {
    try {
      run(text, path, data => assertions.push(data));
    } catch(e) {
      console.log(e);
    }
    setTimeout(() => resolve(analyse(assertions, text, path)), 0);
  });
}

function subscriptions() {
  const subscriptions = new CompositeDisposable;
  subscriptions.add(atom.commands.add('atom-workspace', commands));
  return subscriptions;
}

class SpeckRunner {
  constructor() {
    this.subscriptions = null;
  }
  activate(state) {
    this.subscriptions = subscriptions();
  }
  deactivate() {
    this.subscriptions.dispose();
  }
  provideLinter() {
    return {
      name: 'Speck Runner',
      grammarScopes: ['source.js'],
      scope: 'file',
      lintOnFly: false,
      lint
    };
  }
}

export default new SpeckRunner();
