const router = require('express').Router();

const { openLogin, loginUser } = require('./loginControler');
const { openRegister, newRegister } = require('./registerControler');
const logoutControler = require('./logoutControler');

router.get('/login', openLogin);
router.get('/register',openRegister);
router.get('/logout', logoutControler);

router.post('/register', newRegister);
router.post('/login', loginUser);

module.exports = router;