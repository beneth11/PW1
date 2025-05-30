const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite', // cria um arquivo na raiz do projeto
});

module.exports = sequelize;