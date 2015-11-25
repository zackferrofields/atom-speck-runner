'use babel';

import {spawn} from 'child_process';
import {join, basename} from 'path';
import {writeFile, unlink} from 'fs';
import {CompositeDisposable} from 'atom';
import through from 'through';
import getFile from './utils/getFile';
import getSpec from './utils/getSpec';

const commands = {'speck-runner:run': run};
const runner = join(__dirname, 'tape-runner.js');
const logger = new through(data => {
  const str = data.toString().split('\n').filter(str => str !== '');
  const messages = str.map(str => JSON.parse(str));
  messages.forEach(({type, ok, name}) => {
    if (type === 'assert') atom.notifications[ok ? 'addSuccess' : 'addWarning'](name);
  });
});

function run() {
  const file = getFile();
  const spec = getSpec(file);
  const name = basename(file.name);
  const testFilePath = join(__dirname, '../', `tmp/${name}`);
  writeFile(testFilePath, spec, err => {
     if (err) throw err;
     const test = spawn('node', [runner, testFilePath]);
     test.stdout.pipe(logger);
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
  }
  deactivate() {
    this.subscriptions.dispose();
  }
}

export default new SpeckRunner();
