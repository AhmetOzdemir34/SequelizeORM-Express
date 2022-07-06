const express = require('express');
const router = express.Router();
const userCTRL = require('../controllers/user-controller');

router.route('/register').post(userCTRL.register);
router.route('/login').post(userCTRL.login);
router.route('/loggedin').get(userCTRL.loggedin);
router.route('/logout').get(userCTRL.logout);

module.exports = router;