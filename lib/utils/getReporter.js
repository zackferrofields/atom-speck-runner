'use babel';

import {allowUnsafeEval, allowUnsafeNewFunction} from 'loophole';
import through from 'through';

const tape = allowUnsafeNewFunction(() => require('tape'));

function write(msg) {
  if (msg.startsWith('ok')) atom.notifications.addSuccess(msg);
  if (msg.startsWith('not ok')) atom.notifications.addWarning(msg);
}

export default function() {
  return tape.createStream().pipe(through(write));
}
