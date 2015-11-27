'use babel';

import {createContext, runInContext} from 'vm';
import {allowUnsafeNewFunction} from 'loophole';
import {parse} from 'speckjs/src/parsing/parse-comments';
import {prepareTestsForAssembly} from 'speckjs/src/templates/template-utils';
import {notify} from './reporter';

function spec(text, name, options={testFW: 'tape'}) {
  const tests = parse(text).tests;
  return prepareTestsForAssembly(tests, {name}, options);
}

export function run(text, path, reporter=notify) {
  const file = allowUnsafeNewFunction(() => require(path));
  const test = allowUnsafeNewFunction(() => require('tape'));
  test.createStream({ objectMode: true }).on('data', reporter);
  const context = createContext({file, test});
  spec(text, path).forEach(assertion => runInContext(assertion, context));
}
