const jwt = require('jsonwebtoken');
const Person = require("../models/person-model");
const Team = require('../models/team-model');
const Person_Team = require('../models/person-team-model');

Person.belongsToMany(Team,{through: Person_Team});
Team.belongsToMany(Person,{through: Person_Team});

require('dotenv').config();

const register = async (req,res) => {
    try{
        const {fullname, age, email, password} = req.body;
        /*
        You can do some validation operation here!
        */
        const person = await Person.create({
            fullname, age, email, password
        }).then((p) => {
            return res.status(201).json(p);
        })

    }catch(err){
        return res.status(500).json({statusCode: 500, message:err.message})
    }
}

const login = async (req,res)=>{
    try{
        const  {email, password} = req.body;
        const person = await Person.findOne({where: {email:email, password: password}});
        
        if(!person) return res.status(400).json({statusCode: 400, message:"The Account does not exist!"});
        
        const token = jwt.sign({key:person.id},process.env.PG, {expiresIn:'1d'});
        return res.cookie('token',token,{
            httpOnly: true}).status(201).json({message:"Login Successful!"});
    }catch(err){
        return res.status(500).json({statusCode: 500, message:err.message})
    }
}

const loggedin = async (req,res)=>{
    try{
        const token = req.cookies.token;
        if(!token) res.status(400).json({statusCode: 400, access:false});
        const result = await jwt.verify(token, process.env.PG);
        
        const person = await Person.findByPk(result.key);
        
        return res.status(200).json({access:true, user: person});
    }catch(err){
        return res.status(500).json({statusCode: 500, message:err.message})
    }
}

const logout = async (req,res)=>{
    try{
        return res.cookie('token','').status(200).json();
    }catch(err){
        return res.status(500).json({statusCode: 500, message:err.message})
    }
}

module.exports = {
    register,
    login,
    loggedin,
    logout
}