const { DataTypes } = require('sequelize');
const db = require('../database');

const Person_Team = db.sequelize.define('Person_Team',{
},{
    createdAt:true,
    updatedAt:true,
    version:true,
    timestamps:true,
    charset:'UTF-8',
    modelName:'Person_Team',
    tableName:'person_team'
});

module.exports = Person_Team;