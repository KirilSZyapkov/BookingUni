const er = require('../../config/errors');

module.exports = {
    async openRegister(req, res) {
        res.render('user_pages/register', { title: 'Registration' });
    },

    async newRegister(req, res) {
        try {
            await req.auth.register(req.body);
            res.redirect('/hotels');
        } catch (err) {
            const errorList = er(err);
            const data = req.body;
            res.render('user_pages/register', {
                title: 'Registration',
                errors: errorList.split('\n'),
                data
            })
        }
    }
}