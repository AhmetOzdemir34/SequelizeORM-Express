const {Sequelize} = require('sequelize');
require('dotenv').config();
const {Client} = require('pg');
let db = {};

/* PG */
const client = new Client({
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: "postgres",
  });
  
const PG_DB = async ()=> {
  await client.connect();
  
  await client.query(`CREATE DATABASE "${process.env.DB_NAME}"`, (err, res) => {
    if(err) return console.log('ERROR MESSAGE: '+ err.message);
    console.log("DB was created.");
    client.end();
  });
}  

const sequelize = new Sequelize(process.env.DB_NAME,process.env.DB_USERNAME,process.env.DB_PASSWORD,{
    host: process.env.DB_HOST,
    dialect:'postgres',
    retry:3,
    pool:40,
    Logging:true
});

const CONNECT_DB = async () => {
    await sequelize.authenticate({logging:true, retry:3}).then((err)=>{
        if(err) console.log('Error Message: '+ err.message);
        console.log("Postgres Bağlantısı Kuruldu!");
    })
};

const REFRESH_DB = async () => {
    //imports models
    const Person = require('../models/person-model');
    const Team = require('../models/team-model');
    const Person_Team = require('../models/person-team-model');
    const Task = require('../models/task-model');
    // Relation 1 - Many-to-Many
    Person.belongsToMany(Team,{through: Person_Team});
    Team.belongsToMany(Person,{through: Person_Team});
    // Relation 2 - One-to-Many
    Team.hasMany(Task);
    Task.belongsTo(Team, {onDelete:'CASCADE'});
    
    await sequelize.sync({force:true});
}

db.CONNECT_DB = CONNECT_DB;
db.sequelize = sequelize;
db.REFRESH_DB = REFRESH_DB;
db.PG_DB = PG_DB;

module.exports = db;