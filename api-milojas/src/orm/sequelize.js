const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('db_milojas', 'postgres', 'gularte', {
    host: 'localhost',
    dialect: 'postgres'
});

sequelize.sync().then(() => {
    console.log('Os modelos foram sincronizados com o banco de dados');
});

module.exports = sequelize;
