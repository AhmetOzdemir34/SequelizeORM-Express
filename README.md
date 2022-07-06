# Get Started

* Enter the directory, run 'npm install'. It will run locally.
* You must use Postgresql. If you use another database system, you can change options of sequelize in database/index.js.

---

## Models
Database have 2 models; People & Teams. There are many-to-many relationship between people and teams.

<img src="./src/diagram.png" alt="isolated" width='700'/>

## API
Let's examine API as two different titles. User Auth, Database Operations.

### *User Auth*
|   Functions	|  Auth Middleware 	|  Descriptions 	|
|:---	        |        :---:  	|              ---:	|
|   register	| ❌ |   Register in the system	|
|   login   	| ❌ |   Login. The System will create token & cookie for your security	|
|   loggedin	| ❌ |That method is for client-side. It return response value that if user is still in system or not|
|   logout	    | ❌ |   logout function clears token cookies.	|

### *Database Operations*
|   Functions	|  Auth Middleware 	|  Descriptions 	|
|:---	        |        :---:  	|              ---:	|
|   getTeam  	| ✅ |   You have to send user_id params with request. It will return the teams that belong to the user as response	|
|   delPerson  	| ✅ |   You have to send user_id params with request. Person will be deleted in person table	|
|   createTeam	| ✅ |   You have to send user_id params with request. You have to send all required values for a new team.    |
|   delTeam	    | ✅ |   You have to send user_id & team_id params with request. Delete the team in person_teams table and teams table.	|


