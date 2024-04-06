const Sequelize = require('sequelize');
const database = require('../database/database');

const User = database.define('users', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    photo: {
        type: Sequelize.STRING
    }
})

User.sync({ force: false })

module.exports = User