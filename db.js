const Sequelize = require('sequelize');
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

const sync = ()=> {
  return conn.sync({ force: true });
};

const syncAndSeed = ()=> {
  return sync()
    .then( ()=> {

    });
};

module.exports = {
  syncAndSeed
};
