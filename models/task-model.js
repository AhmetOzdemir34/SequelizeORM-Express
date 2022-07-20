const { DataTypes } = require('sequelize');
const db = require('../database');

const Task = db.sequelize.define('Task',{
    title: {
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
    modelName:'Task',
    tableName:'task'
});

module.exports = Task;