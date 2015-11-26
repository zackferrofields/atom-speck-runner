'use babel';

export function notify({type, ok, name}) {
  if (type === 'assert') atom.notifications[ok ? 'addSuccess' : 'addWarning'](name);
}
