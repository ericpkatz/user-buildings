const expect = require('chai').expect;
const db = require('./db');

const foo = 'foo';

describe('models', ()=> {
  it('foo === foo', ()=> {
    expect(foo).to.equal('foo');
  });
  describe('synced and seeded data', ()=> {
    beforeEach(()=> {
      return db.syncAndSeed();
    });
    let buildings;
    beforeEach(()=> {
      buildings = ['400 cpw'];
    });
    it('moe has an apartment at 400 cpw', ()=> {
      expect(buildings).to.contain('400 cpw');
    });
  });
});
