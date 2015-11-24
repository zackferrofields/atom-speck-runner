'use babel';

import {spawn} from 'child_process';
import {join, basename} from 'path';
import {writeFile, unlink} from 'fs';
import {CompositeDisposable} from 'atom';
// import {fromString} from './utils/getModule';
import getFile from './utils/getFile';
import getSpec from './utils/getSpec';
// import getReporter from './utils/getReporter';

const commands = {'speck-runner:run': run};
const tape = join(__dirname, '../', 'node_modules/tape/bin/tape');

function run() {
  const file = getFile();
  const spec = getSpec(file);
  // fromString(spec, file.name);
  const name = basename(file.name);
  const testFilePath = join(__dirname, '../', `tmp/${name}`);
  writeFile(testFilePath, spec, err => {
     if (err) throw err;
     const test = spawn(tape, [testFilePath]);
     test.stdout.on('data', data => console.log(data.toString()));
     test.stdout.on('close', code => unlink(testFilePath));
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
    this.reporter = null;
  }
  activate(state) {
    this.subscriptions = subscriptions();
    // this.reporter = getReporter();
  }
  deactivate() {
    this.subscriptions.dispose();
  }
}

export default new SpeckRunner();
