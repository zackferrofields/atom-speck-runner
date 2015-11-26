'use babel';

import {join} from 'path';
import {CompositeDisposable} from 'atom';
import {create} from './file';
import {build} from './spec';
import reporter from './reporter';
import vm from 'vm';

import {allowUnsafeNewFunction} from 'loophole';
let test;
allowUnsafeNewFunction(function() {
  test = require('tape');
});

const commands = {'speck-runner:run': run};

function run() {
  let file;
  let specFile = create();
  let spec = build(specFile);
  allowUnsafeNewFunction(function() {
    file = require(specFile.name);
  });
  let sandbox = { file, test, reporter };
  let context = vm.createContext(sandbox);
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
