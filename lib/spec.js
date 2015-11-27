'use babel';

import {parse} from 'speckjs/src/parsing/parse-comments';
import {prepareTestsForAssembly} from 'speckjs/src/templates/template-utils';

export function build(file, options={testFW: 'tape'}) {
  const tests = parse(file.content).tests;
  const contents = prepareTestsForAssembly(tests, file, options);
  return contents.join('\n');
}
