'use babel';

import {createContext, runInContext} from 'vm';
import {CompositeDisposable} from 'atom';
import {allowUnsafeNewFunction} from 'loophole';
import {create} from './file';
import {build} from './spec';
import {notify} from './reporter';

const test = allowUnsafeNewFunction(() => require('tape'));
const commands = {'speck-runner:run': run};

function run() {
  const content = create();
  const spec = build(content);
  const file = allowUnsafeNewFunction(() => require(content.name));
  const context = createContext({ file, test, reporter:notify });
  runInContext(spec, context);
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
