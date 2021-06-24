const er = require('../../config/errors');

module.exports = {
    openCreat(req, res) {
        const isLog = req.user !== undefined
        res.render('booking_pages/create', {
            title: 'Creat',
            hotels: {name: req.user.userName},
            isLog
        })
    },

    async creatNew(req, res) {

        try {
            await req.storage.creatHotel(req.body, req.user._id);
            res.redirect('/hotels');
        } catch (err) {
            const errorList = er(err);
            const data = req.body
            const isLog = req.user !== undefined
            res.render('booking_pages/create', {
                title: 'Creat',
                data,
                errors: errorList.split('\n'),
                isLog,
                hotels: {name: req.user.userName},
            })
        }

    }
}