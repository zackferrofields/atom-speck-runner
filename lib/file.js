'use babel';

export function create() {
  const editor = atom.workspace.getActivePaneItem();
  const {path:name, cachedContents:content} = editor.buffer.file;
  return {name, content};
}
