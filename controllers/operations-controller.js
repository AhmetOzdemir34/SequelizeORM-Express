const Person = require('../models/person-model');
const Team = require('../models/team-model');
const Person_Team = require('../models/person-team-model');

Person.belongsToMany(Team,{through: Person_Team});
Team.belongsToMany(Person,{through: Person_Team});

const getTeams = async (req,res) => {
    try{
        const {userid} = req.params;
        const person = await Person.findOne({
            where:{
                id:userid
            },
            attributes: ['fullname', 'email','age'],
            include:[{
                model: Team,
                through: {
                    attributes: []
                }
            }]
        })
        if(!person) return res.status(400).json({message:'The person does not exist!'});
        
        return res.status(200).json(person);

    }catch(err){
        return res.status(500).json({statusCode:500, message:err.message});
    }
};

const createTeam = async (req,res) => {
    try{
        const {name, desc} = req.body;
        const {userid} = req.params;
        const person = await Person.findByPk(userid);
        const team = await Team.create({
            name, desc
        });
        await person.addTeam(team);
        return res.status(201).json(team);
    }catch(err){
        return res.status(500).json({statusCode:500, message:err.message});
    }
};

const delPerson = async (req,res) => {
    try{
        const {userid} = req.params;
        const person = await Person.findByPk(userid);
        if(!person) return res.status(400).json({message:'The person does not exist!'});

        await person.destroy({force:true});
        return res.status(200).json();
    }catch(err){
        return res.status(500).json({statusCode:500, message:err.message});
    }
};

const delTeam = async (req,res) => {
    try{
        const {userid, teamid} = req.params;
        const team = await Team.findByPk(teamid);
        const person = await Person.findByPk(userid);

        await person.removeTeam(team);
        await team.destroy({force:true}); // (if you want) when we break the relationship, you can delete team table data.
        
        return res.status(200).json();
    }catch(err){
        return res.status(500).json({statusCode:500, message:err.message});
    }
};

module.exports = {
    getTeams,
    delPerson,
    createTeam,
    delTeam
};