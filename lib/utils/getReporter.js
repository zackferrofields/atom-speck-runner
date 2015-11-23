'use babel';

import {allowUnsafeEval, allowUnsafeNewFunction} from 'loophole';
import through from 'through';

const tape = allowUnsafeNewFunction(() => require('tape'));

function write({type, ok, name}) {
  if (type !== 'assert') return;
  if (ok) atom.notifications.addSuccess(name);
  if (!ok) atom.notifications.addWarning(name);
}

export default function() {
  return tape.createStream({objectMode: true}).pipe(through(write));
}
