const router = require('express').Router();
const User = require('../../model/User');

router.get('/', async (req, res) => {
    const isLog = req.user !== undefined;
    const user = await User.findById(req.user._id).populate('bookdHotels').lean();


    res.render('user_pages/profile', {
        title: req.user.userName,
        isLog,
        hotels: { name: req.user.userName },
        user
    })
})

module.exports = router;