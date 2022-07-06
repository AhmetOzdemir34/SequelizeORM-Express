const { DataTypes } = require('sequelize');
const db = require('../database');

const Team = db.sequelize.define('Team',{
    name: {
        type: DataTypes.STRING(48),
        allowNull:false
    },
    desc: {
        type: DataTypes.STRING,
        allowNull:false
    }
},{
    createdAt:true,
    updatedAt:true,
    version:true,
    timestamps:true,
    charset:'UTF-8',
    modelName:'Team',
    tableName:'team'
});

module.exports = Team;