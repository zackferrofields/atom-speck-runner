'use babel';

import {CompositeDisposable} from 'atom';
import {run} from './worker';

const commands = {'speck-runner:run': runInContext };

function runInContext() {
  const editor = atom.workspace.getActivePaneItem();
  const path = editor.getPath();
  const text = editor.getText();
  run(text, path);
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
}

export default new SpeckRunner();
