'use babel';

import {spawn} from 'child_process';
import {join, basename} from 'path';
import {writeFile, unlink} from 'fs';
import {CompositeDisposable} from 'atom';
import {create} from './file';
import {build} from './spec';
import reporter from './reporter';

const commands = {'speck-runner:run': run};
const runner = join(__dirname, 'tape-runner.js');

function run() {
  const file = create();
  const spec = build(file);
  const name = basename(file.name);
  const testFilePath = join(__dirname, '../', `tmp/${name}`);
  writeFile(testFilePath, spec, err => {
    if (err) throw err;
    const test = spawn('node', [runner, testFilePath]);
    test.stdout.pipe(reporter);
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
  }
  activate(state) {
    this.subscriptions = subscriptions();
  }
  deactivate() {
    this.subscriptions.dispose();
  }
}

export default new SpeckRunner();
