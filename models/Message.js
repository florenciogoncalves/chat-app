const Sequelize = require('sequelize');
const database = require('../database/database');
const User = require('./User');


const Message = database.define('messages', {
    sender_id: {
        type: Sequelize.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },
    receiver_id: {
        type: Sequelize.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },
    message: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})

Message.belongsTo(User, { as: 'sender' })
Message.belongsTo(User, { as: 'receiver' })

Message.sync({ force: false })


module.exports = Message