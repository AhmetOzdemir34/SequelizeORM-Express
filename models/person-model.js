const { DataTypes } = require('sequelize');
const db = require('../database');
const nodemailer = require('nodemailer');

const Person = db.sequelize.define('Person',{
    fullname: {
        type: DataTypes.STRING(48),
        allowNull:false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    email: {
        type: DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    password: {
        type: DataTypes.STRING,
        allowNull:false
    }
},{
    createdAt:true,
    updatedAt:true,
    version:true,
    timestamps:true,
    charset:'UTF-8',
    modelName:'Person',
    tableName:'person'
});

/* Person.addHook('afterCreate', (model)=>{
    const transaction = nodemailer.createTransport({
        service: process.env.NM_SERVICE,
        auth:{
            user: process.env.NM_USER,
            pass: process.env.NM_PASS
        }
    });
    transaction.sendMail({
        to: this.email,
        from: process.env.NM_USER,
        html: `
        <div>
            <h2>Your account ready for new experiences</h2>
            <p>We have just created your account, you have to login the system. Join the teams!</p>
        </div>
        `
    },(err, res)=>{
        if(err) console.log('Error Message: '+ err.message);
        console.log('Mail was sent!');
    })
}) */

module.exports = Person;