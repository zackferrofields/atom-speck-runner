'use babel';

export default function() {
  const editor = atom.workspace.getActivePaneItem();
  const {read, path:name, cachedContents:content} = editor.buffer.file;
  return {name, content};
}
