const expect = require('chai').expect;

const foo = 'foo';

describe('models', ()=> {
  it('foo === foo', ()=> {
    expect(foo).to.equal('foo');
  });
});
