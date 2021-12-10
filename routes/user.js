const router = require('express').Router();

const {login, register} = require('../controllers/user');

// router.post('/login', login);
// router.post('/register', register);

router.route('/login').post(login);
router.route('/register').post(register);


module.exports = router;
