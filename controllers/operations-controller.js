const Person = require('../models/person-model');
const Team = require('../models/team-model');
const Person_Team = require('../models/person-team-model');
const Task = require('../models/task-model');

Person.belongsToMany(Team,{through: Person_Team});
Team.belongsToMany(Person,{through: Person_Team});

Team.hasMany(Task);
Task.belongsTo(Team, {onDelete:'CASCADE'});

const getTeams = async (req,res) => {
    try{
        const user = req.user;
        const person = await Person.findOne({
            where:{
                id:user.id
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
        const {id} = req.user;
        const person = await Person.findByPk(id);
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
        const userid = req.user.id;
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

const createTask = async (req,res)=> {
    try{
        const {title, desc, teamid} = req.body;
        const team = await Team.findByPk(teamid);
        const task = await Task.create({
            title, desc
        });
        await team.addTask(task);
        return res.json(task);
    }catch(err){
        return res.json({statusCode:500, message:err.message});
    }
}

const getTasks = async (req,res)=> {
    try{
        const {teamid} = req.body;
        const team = await Team.findByPk(teamid);
        const result = await team.getTasks();
        return res.json(result);
    }catch(err){
        return res.json({statusCode:500, message:err.message});
    }
}

const delTask = async (req,res)=> {
    try{
        const {taskid, teamid} = req.params;
        const team = await Team.findByPk(teamid);
        const task = await Task.findByPk(taskid);
        await team.removeTask(task);
        return res.json(task);
    }catch(err){
        return res.json({statusCode:500, message:err.message});
    }
}

const updateTask = async (req,res)=> {
    try{
        const {title, desc} = req.body;
        const {teamid, taskid} = req.params;
        const user = req.user;

        const task = await Task.findByPk(taskid);
        const updated = await task.update({
            title:title, desc:desc
        }, {logging:true});

        return res.json(updated);

    }catch(err){
        return res.json({statusCode:500, message:err.message});
    }
}

module.exports = {
    getTeams,
    delPerson,
    createTeam,
    delTeam,
    createTask,
    getTasks,
    delTask,
    updateTask
};