'use babel';

import through from 'through';

export default new through(data => {
  const str = data.toString().split('\n').filter(str => str !== '');
  const messages = str.map(str => JSON.parse(str));
  messages.forEach(({type, ok, name}) => {
    if (type === 'assert') atom.notifications[ok ? 'addSuccess' : 'addWarning'](name);
  });
});
