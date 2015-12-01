'use babel';

import {createContext, runInContext} from 'vm';
import {allowUnsafeNewFunction} from 'loophole';
import esprima from 'esprima';
import {parse} from 'speckjs/src/parsing/parse-comments';
import {prepareTestsForAssembly} from 'speckjs/src/templates/template-utils';
import {notify} from './reporter';

const test = allowUnsafeNewFunction(() => require('tape'));

function traverse({comments}) {
  return comments.filter(({value}) => value.trim().startsWith('#'));
}

function spec(text, name, options={testFW: 'tape'}) {
  const tests = parse(text).tests;
  return prepareTestsForAssembly(tests, {name}, options);
}

export function run(text, path, reporter=notify) {
  test.createStream({ objectMode: true }).on('data', reporter);
  delete require.cache[require.resolve(path)];
  const file = allowUnsafeNewFunction(() => require(path));
  const context = createContext({file, test});
  spec(text, path).forEach(assertion => runInContext(assertion, context));
}

export function analyse(assertions, text, filePath) {
  const comments = (traverse(esprima.parse(text, {loc: true, comment: true})));
  return assertions
    .filter(({type}) => type === 'assert')
    .reduce((acc, data, index) => {
      if (!data.error) return acc;
      const {start, end} = comments[index].loc;
      acc.push({
        type: data.error.name,
        text: data.error.message,
        range: [[start.line -1, start.column], [end.line -1, end.column]],
        filePath
      });
      return acc;
    }, []);
}
