const express = require('express');
const router = express.Router();
const operationsCTRL = require('../controllers/operations-controller');
const mw = require('../middlewares/auth');

router.route('/get-teams/:userid').get(mw.auth, operationsCTRL.getTeams);
router.route('/del-person/:userid').delete(mw.auth, operationsCTRL.delPerson);
router.route('/create-team/:userid').post(mw.auth, operationsCTRL.createTeam);
router.route('/del-team/:userid/:teamid').delete(mw.auth, operationsCTRL.delTeam);

module.exports = router;