'use babel';

import {createContext, runInContext} from 'vm';
import {allowUnsafeNewFunction} from 'loophole';
import {parse} from 'speckjs/src/parsing/parse-comments';
import {prepareTestsForAssembly} from 'speckjs/src/templates/template-utils';
import {notify} from './reporter';

const test = allowUnsafeNewFunction(() => require('tape'));

function spec(text, name, options={testFW: 'tape'}) {
  const tests = parse(text).tests;
  return prepareTestsForAssembly(tests, {name}, options);
}

export function run(text, path, reporter=notify) {
  test.createStream({ objectMode: true }).on('data', reporter);
  const file = allowUnsafeNewFunction(() => require(path));
  const context = createContext({file, test});
  spec(text, path).forEach(assertion => runInContext(assertion, context));
}

export function errors(input, filePath) {
  return input.reduce((acc, data) => {
    if (!data.error) return acc;
    acc.push({
      type: data.error.name,
      text: data.error.message,
      range: [[0,0], [0,1]],
      filePath
    });
    return acc;
  }, []);
}
