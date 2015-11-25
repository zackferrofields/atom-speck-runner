'use babel';

import {parse} from 'speckjs/src/parsing/parse-comments';
import {prepareTestsForAssembly} from 'speckjs/src/templates/template-utils';
import template from './templates/tape';

export function build(file, options={testFW: 'tape'}) {
  const tests = parse(file.content).tests;
  const content = prepareTestsForAssembly(tests, file, options);
  return template(file, content);
}
