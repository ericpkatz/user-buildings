const expect = require('chai').expect;
const db = require('./db');
const { User, Apartment, Building } = db.models;

const foo = 'foo';

describe('models', ()=> {
  it('foo === foo', ()=> {
    expect(foo).to.equal('foo');
  });
  describe('synced and seeded data', ()=> {
    beforeEach(()=> {
      return db.syncAndSeed();
    });
    let apartments;

    beforeEach(()=> {
      return User.findOne({ 
          where : { name: 'moe' },
          include: [
            {
              model: Apartment,
              include: [ Building ]
            }
          ]
      })
      .then( user => { 
        apartments = user.apartments;
      });
    });

    it('moe has an apartment at 400 cpw', ()=> {
      const buildings = apartments.map( apartment => apartment.building.name );
      expect(buildings).to.contain('400 cpw');
      expect(apartments[0].apartmentNumber).to.equal('PH');
    });
  });
});
