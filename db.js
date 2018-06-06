const Sequelize = require('sequelize');
console.log('ready');
console.log(process.env);
console.log(process.env.DATABASE_URL);
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/my_db');

const User = conn.define('user', {
  name: Sequelize.STRING
});

const Building = conn.define('building', {
  name: Sequelize.STRING
});

const Apartment = conn.define('apartment', {
  apartmentNumber: Sequelize.STRING
});

Apartment.belongsTo(User);
Apartment.belongsTo(Building);
User.hasMany(Apartment);

const sync = ()=> {
  return conn.sync({ force: true });
};

const syncAndSeed = ()=> {
  return sync()
    .then( ()=> {
      return Promise.all([
        User.create({ name: 'moe' }),
        Building.create({ name: '400 cpw' })
      ])
      .then(([ moe, cpw])=> {
        return Apartment.create({ apartmentNumber: 'PH', userId: moe.id, buildingId: cpw.id });
      });

    });
};

module.exports = {
  syncAndSeed,
  models: {
    User,
    Building,
    Apartment
  }
};
