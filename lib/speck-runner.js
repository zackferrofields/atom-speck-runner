'use babel';

import {CompositeDisposable} from 'atom';
import {allowUnsafeNewFunction} from 'loophole';
import {create} from './file';
import {build} from './spec';
import reporter from './reporter';
import vm from 'vm';

const test = allowUnsafeNewFunction(() => require('tape'));
const commands = {'speck-runner:run': run};

function run() {
  const content = create();
  const spec = build(content);
  const file = allowUnsafeNewFunction(() => require(content.name));
  const context = vm.createContext({ file, test, reporter });
  vm.runInContext(spec, context);
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
