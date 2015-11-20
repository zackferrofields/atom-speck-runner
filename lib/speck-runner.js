'use babel';

import {CompositeDisposable} from 'atom';
import {build} from 'speckjs';

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
    console.log('SpeckRunner is running');
    const editor = atom.workspace.getActivePaneItem();
    const {read, path:name, cachedContents:content} = editor.buffer.file;
    const file = {name, content};
    const options = {testFW: 'tape'};
    atom.workspace.open()
      .then(editor => {
        editor.setGrammar( atom.grammars.grammarForScopeName('source.js') )
        editor.setText(build(file, options));
        atom.notifications.addSuccess("Boom! Your tape spec file is ready");
      });
  }
}

export default new SpeckRunner();
