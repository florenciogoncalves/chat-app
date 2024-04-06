const Sequelize = require('sequelize');

const connection = new Sequelize({
    username: 'root',
    password: '',
    database: 'chatapp',
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection