import React from 'react';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';

import { shallow } from 'enzyme';

import HelloWorld from '../src/HelloWorld';

describe('Hello World', () => {
  chai.use(chaiEnzyme());

  it('should render a greeting', () => {
    const helloWorld = shallow(<HelloWorld />);

    expect(helloWorld).to.contain('Hello World!');
  });
});
