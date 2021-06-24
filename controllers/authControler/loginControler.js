const er = require('../../config/errors');

module.exports = {
    async openLogin(req, res) {
        res.render('user_pages/login', { title: 'Login' });
    },

    async loginUser(req, res) {
        let id;
        if (req.user){
            id = req.user._id;
        }
        try {
            await req.auth.login(req.body, id);
            res.redirect('/hotels')
        } catch (err) {
            const errorList = er(err);
            res.render('user_pages/login', {
                errors: errorList.split('\n'),
                data: req.body.username,
            })

        }

    }
}