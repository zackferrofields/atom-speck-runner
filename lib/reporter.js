'use babel';

const reporter = ({type, ok, name}) => {
  if (type === 'assert') atom.notifications[ok ? 'addSuccess' : 'addWarning'](name);
};

export default reporter;
