const router = require('express').Router();

const productControler = require('../controllers/homeControler/productControler');
const authControler = require('../controllers/authControler/authControler');
const userControler = require('../controllers/userControler/userControler');

router.get('/', (req, res)=>{
    res.redirect('/hotels');
})

router.use('/hotels',productControler);
router.use('/auth', authControler);
router.use('/user', userControler);


module.exports = router;