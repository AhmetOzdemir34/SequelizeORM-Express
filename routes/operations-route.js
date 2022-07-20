const express = require('express');
const router = express.Router();
const operationsCTRL = require('../controllers/operations-controller');
const mw = require('../middlewares/auth');

router.route('/team').post(mw.auth, operationsCTRL.createTeam);
router.route('/teams').get(mw.auth, operationsCTRL.getTeams);
router.route('/del-person').delete(mw.auth, operationsCTRL.delPerson); 
router.route('/del-team/:userid/:teamid').delete(mw.auth, operationsCTRL.delTeam);

router.route("/task").post(mw.auth, operationsCTRL.createTask);
router.route("/tasks").get(mw.auth, operationsCTRL.getTasks);
router.route("/task/:teamid/:taskid").delete(mw.auth, operationsCTRL.delTask);
router.route("/task/:teamid/:taskid").put(mw.auth, operationsCTRL.updateTask);

module.exports = router;