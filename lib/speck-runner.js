'use babel';

import {CompositeDisposable} from 'atom';
import {fromString} from './utils/getModule';
import getFile from './utils/getFile';
import getSpec from './utils/getSpec';
import getReporter from './utils/getReporter';

const commands = {'speck-runner:run': run};

function run() {
  const file = getFile();
  const spec = getSpec(file);
  fromString(spec, file.name);
}

function subscriptions() {
  const subscriptions = new CompositeDisposable;
  subscriptions.add(atom.commands.add('atom-workspace', commands));
  return subscriptions;
}

class SpeckRunner {
  constructor() {
    this.subscriptions = null;
    this.reporter = null;
  }
  activate(state) {
    this.subscriptions = subscriptions();
    this.reporter = getReporter();
  }
  deactivate() {
    this.subscriptions.dispose();
  }
}

export default new SpeckRunner();
